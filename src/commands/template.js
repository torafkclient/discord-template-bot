const { 
  SlashCommandBuilder, 
  EmbedBuilder, 
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  AttachmentBuilder,
  ChannelType
} = require('discord.js');
const { templates } = require('../templates');
const { applyTemplate, clearGuildStructure } = require('../utils/templateEngine');
const { GuildConfig } = require('../models/GuildConfig');
const { CustomTemplate } = require('../models/CustomTemplate');
const { logger } = require('../utils/logger');

const templateCommand = {
  data: new SlashCommandBuilder()
    .setName('template')
    .setDescription('Sunucu şablonları yönetimi ve uygulaması')
    .addSubcommand((sub) =>
      sub
        .setName('list')
        .setDescription('Kullanılabilir tüm sunucu şablonlarını listeler')
    )
    .addSubcommand((sub) =>
      sub
        .setName('apply')
        .setDescription('Bir şablonu sunucuya uygular (DİKKAT: Mevcut sunucu yapısını temizler!)')
        .addStringOption((opt) =>
          opt
            .setName('isim')
            .setDescription('Uygulanacak şablonun adı (örn: public-community)')
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName('export')
        .setDescription('Mevcut sunucu yapısını JSON formatında şablon olarak dışa aktarır')
        .addStringOption((opt) =>
          opt
            .setName('isim')
            .setDescription('Oluşturulacak şablonun benzersiz adı (örn: kisisel-sunucum)')
            .setRequired(true)
        )
        .addStringOption((opt) =>
          opt
            .setName('aciklama')
            .setDescription('Şablonun açıklaması')
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName('import')
        .setDescription('JSON dosyasını yükleyerek yeni bir şablon ekler')
        .addAttachmentOption((opt) =>
          opt
            .setName('dosya')
            .setDescription('JSON şablon dosyası')
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const guild = interaction.guild;

    if (!guild) {
      await interaction.reply({
        content: '❌ Bu komut sadece sunucularda kullanılabilir.',
        ephemeral: true,
      });
      return;
    }

    // List is accessible to everyone or moderators, but apply, export, import must be Admin only
    if (subcommand !== 'list') {
      const member = await guild.members.fetch(interaction.user.id);
      if (!member.permissions.has(PermissionFlagsBits.Administrator)) {
        await interaction.reply({
          content: '❌ Bu işlemi gerçekleştirmek için **Yönetici** yetkisine sahip olmalısınız.',
          ephemeral: true,
        });
        return;
      }
    }

    try {
      if (subcommand === 'list') {
        await handleList(interaction);
      } else if (subcommand === 'apply') {
        await handleApply(interaction);
      } else if (subcommand === 'export') {
        await handleExport(interaction);
      } else if (subcommand === 'import') {
        await handleImport(interaction);
      }
    } catch (err) {
      logger.error(`Error in /template ${subcommand}:`, err);
      const errMsg = err.message;
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: `❌ Bir hata oluştu: ${errMsg}`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: `❌ Bir hata oluştu: ${errMsg}`,
          ephemeral: true,
        });
      }
    }
  },
};

/**
 * Handle listing all templates (builtin + custom)
 */
async function handleList(interaction) {
  await interaction.deferReply();
  const guildId = interaction.guildId;

  const customTemplates = await CustomTemplate.find({
    $or: [{ guildId }, { createdBy: interaction.user.id }],
  });

  const embed = new EmbedBuilder()
    .setTitle('📋 Sunucu Şablonları Listesi')
    .setDescription(
      `\`/template apply <şablon_adı>\` yazarak istediğiniz şablonu sunucunuza uygulayabilirsiniz.\n\n*Not: Şablon uygulama işlemi sunucudaki tüm eski kanal ve rolleri temizler.*`
    )
    .setColor('#3498DB')
    .setTimestamp();

  // Helper to split lists to avoid Discord's 1024-character field limit
  const addFieldsSplit = (title, list) => {
    let value = '';
    let page = 1;

    for (const t of list) {
      const line = `• \`${t.name}\` - **${t.displayName}**\n*${t.description}*\n\n`;
      if (value.length + line.length > 1000) {
        embed.addFields({
          name: page === 1 ? title : `${title} (Devamı)`,
          value: value.trim(),
        });
        value = line;
        page++;
      } else {
        value += line;
      }
    }

    if (value.length > 0) {
      embed.addFields({
        name: page === 1 ? title : `${title} (Devamı)`,
        value: value.trim(),
      });
    }
  };

  // Predefined Templates
  addFieldsSplit('✨ Kullanılabilir Sunucu Şablonları', templates);

  if (customTemplates.length > 0) {
    addFieldsSplit('🛠️ Özel Şablonlarınız (Imported/Custom)', customTemplates);
  } else {
    embed.addFields({
      name: '🛠️ Özel Şablonlar',
      value: '*Henüz özel bir şablon içe aktarılmadı.*',
    });
  }

  await interaction.editReply({ embeds: [embed] });
}

/**
 * Handle template application with a button confirmation step
 */
async function handleApply(interaction) {
  const guild = interaction.guild;
  const guildId = guild.id;
  const templateName = interaction.options.getString('isim', true).trim();

  // Find target template
  let selectedTemplate = templates.find((t) => t.name === templateName) || null;

  // Check custom database templates if not found in builtins
  if (!selectedTemplate) {
    const custom = await CustomTemplate.findOne({ name: templateName });
    if (custom) {
      selectedTemplate = {
        name: custom.name,
        displayName: custom.displayName,
        description: custom.description,
        isPremium: false,
        emojiPackageSuggestion: custom.emojiPackageSuggestion || '💬',
        roles: custom.roles,
        categories: custom.categories,
        welcomeMessage: custom.welcomeMessage,
        rulesMessage: custom.rulesMessage,
      };
    }
  }

  if (!selectedTemplate) {
    await interaction.reply({
      content: `❌ \`${templateName}\` adında bir şablon bulunamadı. Mevcut şablonları görmek için \`/template list\` komutunu kullanabilirsiniz.`,
      ephemeral: true,
    });
    return;
  }

  // Create interaction confirmation buttons
  const confirmEmbed = new EmbedBuilder()
    .setTitle('⚠ KRİTİK UYARI: Sunucu Değişikliği')
    .setDescription(
      `**"${selectedTemplate.displayName}"** şablonunu uygulamak üzeresiniz.\n\n` +
      `🚨 **BU İŞLEM GERİ ALINAMAZ!** Sunucudaki **TÜM mevcut kanallar, kategoriler ve silinebilir özel roller** silinecek ve yerlerine şablonun yapısı kurulacaktır.\n\n` +
      `Devam etmek istiyor musunuz?`
    )
    .setColor('#E74C3C')
    .setFooter({ text: 'Onaylama süresi 60 saniyedir.' })
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('confirm_apply')
      .setLabel('Evet, Sunucumu Sıfırla ve Kur')
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId('cancel_apply')
      .setLabel('İptal Et')
      .setStyle(ButtonStyle.Secondary)
  );

  const reply = await interaction.reply({
    embeds: [confirmEmbed],
    components: [row],
    ephemeral: true,
  });

  const collector = reply.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 60000,
  });

  collector.on('collect', async (btnInt) => {
    if (btnInt.user.id !== interaction.user.id) {
      await btnInt.reply({
        content: '❌ Bu butonu sadece komutu başlatan kişi kullanabilir.',
        ephemeral: true,
      });
      return;
    }

    if (btnInt.customId === 'cancel_apply') {
      await btnInt.update({
        content: '❌ Sunucu şablonu uygulaması iptal edildi.',
        embeds: [],
        components: [],
      });
      collector.stop('cancelled');
      return;
    }

    if (btnInt.customId === 'confirm_apply') {
      // Disable buttons and inform application has started
      await btnInt.update({
        content: `⏳ **Şablon uygulanıyor...** Sunucudaki kanallar siliniyor ve şablon kuruluyor. Bu işlem sunucu büyüklüğüne göre 30 saniye kadar sürebilir. Lütfen bekleyin...`,
        embeds: [],
        components: [],
      });

      collector.stop('confirmed');

      try {
        // Clear all
        await clearGuildStructure(guild);

        // Apply new
        await applyTemplate(guild, selectedTemplate);

        // Save log to GuildConfig
        await GuildConfig.findOneAndUpdate(
          { guildId },
          { 
            $push: { 
              logs: { 
                templateName: selectedTemplate.name, 
                appliedBy: interaction.user.id,
                appliedAt: new Date()
              } 
            } 
          },
          { upsert: true }
        );

        // DM the executor that it is finished since channels were wiped
        try {
          await interaction.user.send(
            `✅ **${selectedTemplate.displayName}** şablonu **${guild.name}** sunucunuza başarıyla kuruldu!`
          );
        } catch {
          // ignore if user has DMs disabled
        }
      } catch (error) {
        logger.error('Failed to apply template:', error);
        try {
          await interaction.user.send(
            `❌ **${guild.name}** sunucusuna şablon uygulanırken bir hata oluştu: ${error.message}`
          );
        } catch {
          // ignore
        }
      }
    }
  });

  collector.on('end', (_, reason) => {
    if (reason === 'time') {
      interaction.editReply({
        content: '⏱ Onaylama süresi doldu. İşlem iptal edildi.',
        embeds: [],
        components: [],
      }).catch(() => {});
    }
  });
}

/**
 * Handle exporting the current server structure to JSON
 */
async function handleExport(interaction) {
  await interaction.deferReply({ ephemeral: true });

  const guild = interaction.guild;
  const nameInput = interaction.options.getString('isim', true)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-');
  const descriptionInput = interaction.options.getString('aciklama', true);

  // Check if name is already occupied by a builtin template
  if (templates.some((t) => t.name === nameInput)) {
    await interaction.editReply({
      content: `❌ \`${nameInput}\` adı varsayılan (built-in) şablonlardan birine ait. Farklı bir isim belirleyin.`,
    });
    return;
  }

  // Fetch roles
  const roles = await guild.roles.fetch();
  const exportedRoles = [];
  const botMember = await guild.members.fetchMe();
  const botHighestRole = botMember.roles.highest;

  for (const [_, role] of roles) {
    if (
      role.id === guild.id || 
      role.managed || 
      role.comparePositionTo(botHighestRole) >= 0
    ) {
      continue;
    }

    // Convert permissions to string names
    const permissionsArray = [];
    for (const [permName, permBit] of Object.entries(PermissionFlagsBits)) {
      if (role.permissions.has(permBit)) {
        permissionsArray.push(permName);
      }
    }

    exportedRoles.push({
      name: role.name,
      color: role.hexColor,
      hoist: role.hoist,
      mentionable: role.mentionable,
      permissions: permissionsArray,
    });
  }

  // Fetch channels & categories
  const channels = await guild.channels.fetch();
  const categoriesMap = new Map();
  const uncategorizedChannels = [];

  // Group channels by category
  for (const [_, channel] of channels) {
    if (!channel) continue;

    if (
      channel.type !== ChannelType.GuildCategory &&
      channel.type !== ChannelType.GuildText &&
      channel.type !== ChannelType.GuildVoice &&
      channel.type !== ChannelType.GuildAnnouncement &&
      channel.type !== ChannelType.GuildStageVoice
    ) {
      continue;
    }

    if (channel.type === ChannelType.GuildCategory) {
      if (!categoriesMap.has(channel.id)) {
        categoriesMap.set(channel.id, {
          name: channel.name,
          channels: [],
          permissionOverwrites: [],
        });
      }
    }
  }

  // Now process child channels
  for (const [_, channel] of channels) {
    if (!channel || channel.type === ChannelType.GuildCategory) continue;

    let typeStr = 'text';
    if (channel.type === ChannelType.GuildVoice) typeStr = 'voice';
    else if (channel.type === ChannelType.GuildAnnouncement) typeStr = 'announcement';
    else if (channel.type === ChannelType.GuildStageVoice) typeStr = 'stage';

    const chanData = {
      name: channel.name,
      type: typeStr,
      topic: channel.topic || undefined,
      nsfw: channel.nsfw || undefined,
    };

    if (channel.parentId && categoriesMap.has(channel.parentId)) {
      categoriesMap.get(channel.parentId).channels.push(chanData);
    } else if (
      channel.type === ChannelType.GuildText || 
      channel.type === ChannelType.GuildVoice || 
      channel.type === ChannelType.GuildAnnouncement
    ) {
      uncategorizedChannels.push(chanData);
    }
  }

  const finalCategories = Array.from(categoriesMap.values()).filter(
    (c) => c.channels.length > 0
  );

  // If there are uncategorized channels, create a default category for them
  if (uncategorizedChannels.length > 0) {
    finalCategories.push({
      name: 'Sohbet Odaları',
      channels: uncategorizedChannels,
    });
  }

  const templateJSON = {
    name: nameInput,
    displayName: nameInput.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: descriptionInput,
    isPremium: false,
    emojiPackageSuggestion: '💬, 📢',
    roles: exportedRoles,
    categories: finalCategories,
  };

  const buffer = Buffer.from(JSON.stringify(templateJSON, null, 2), 'utf-8');
  const attachment = new AttachmentBuilder(buffer, { name: `${nameInput}-template.json` });

  await CustomTemplate.findOneAndUpdate(
    { name: nameInput },
    {
      name: nameInput,
      displayName: templateJSON.displayName,
      description: descriptionInput,
      category: 'Custom',
      isPremium: false,
      createdBy: interaction.user.id,
      guildId: guild.id,
      roles: exportedRoles,
      categories: finalCategories,
    },
    { upsert: true, new: true }
  );

  await interaction.editReply({
    content: `✅ Sunucu şablonu başarıyla **"${nameInput}"** adıyla kaydedildi ve veritabanına aktarıldı!\n\n` +
      `Aşağıdaki JSON dosyasını başka sunucularda içe aktarmak için saklayabilirsiniz.`,
    files: [attachment],
  });
}

/**
 * Handle importing a JSON template file
 */
async function handleImport(interaction) {
  await interaction.deferReply({ ephemeral: true });

  const attachment = interaction.options.getAttachment('dosya', true);

  if (!attachment.name.endsWith('.json')) {
    await interaction.editReply({
      content: '❌ Lütfen geçerli bir `.json` uzantılı dosya yükleyin.',
    });
    return;
  }

  try {
    const response = await fetch(attachment.url);
    if (!response.ok) throw new Error('Dosya indirilemedi.');

    const fileContent = await response.text();
    const data = JSON.parse(fileContent);

    // Basic structure verification
    if (!data.name || !data.roles || !data.categories) {
      await interaction.editReply({
        content: '❌ Hatalı şablon yapısı! JSON dosyası `name`, `roles` ve `categories` alanlarını içermelidir.',
      });
      return;
    }

    const nameInput = data.name.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');

    if (templates.some((t) => t.name === nameInput)) {
      await interaction.editReply({
        content: `❌ \`${nameInput}\` adı varsayılan şablonlarla çakışıyor. Lütfen JSON dosyasındaki \`name\` alanını değiştirin.`,
      });
      return;
    }

    const imported = await CustomTemplate.findOneAndUpdate(
      { name: nameInput },
      {
        name: nameInput,
        displayName: data.displayName || nameInput.toUpperCase(),
        description: data.description || 'Imported custom template',
        category: 'Custom',
        isPremium: !!data.isPremium,
        createdBy: interaction.user.id,
        guildId: interaction.guildId || undefined,
        roles: data.roles,
        categories: data.categories,
        welcomeMessage: data.welcomeMessage,
        rulesMessage: data.rulesMessage,
      },
      { upsert: true, new: true }
    );

    await interaction.editReply({
      content: `✅ **"${imported.displayName}"** (\`${imported.name}\`) şablonu başarıyla içe aktarıldı!\nŞablon listesinde görebilir ve uygulayabilirsiniz.`,
    });
  } catch (err) {
    logger.error('Error importing template:', err);
    await interaction.editReply({
      content: `❌ Şablon içe aktarılamadı: ${err.message}`,
    });
  }
}

module.exports = { templateCommand };
