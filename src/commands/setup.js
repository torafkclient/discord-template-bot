const { 
  SlashCommandBuilder, 
  EmbedBuilder, 
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType
} = require('discord.js');
const { templates } = require('../templates');
const { applyTemplate, clearGuildStructure } = require('../utils/templateEngine');
const { GuildConfig } = require('../models/GuildConfig');
const { logger } = require('../utils/logger');

const setupCommand = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Sunucuyu hızlıca yapılandırma komutları')
    .addSubcommand((sub) =>
      sub
        .setName('quick')
        .setDescription('En popüler şablonu (Genel Topluluk) hızlı bir şekilde sunucuya uygular')
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

    // Must be Administrator
    const member = await guild.members.fetch(interaction.user.id);
    if (!member.permissions.has(PermissionFlagsBits.Administrator)) {
      await interaction.reply({
        content: '❌ Bu işlemi gerçekleştirmek için **Yönetici** yetkisine sahip olmalısınız.',
        ephemeral: true,
      });
      return;
    }

    if (subcommand === 'quick') {
      const defaultTemplate = templates.find((t) => t.name === 'public-community');

      const confirmEmbed = new EmbedBuilder()
        .setTitle('⚡ Hızlı Kurulum (Quick Setup) Başlatılıyor')
        .setDescription(
          `**"${defaultTemplate.displayName}"** şablonunu hızlıca kurmak üzeresiniz.\n\n` +
          `🚨 **UYARI:** Bu işlem sunucudaki **tüm mevcut kanalları, kategorileri ve silinebilir özel rolleri temizleyecektir!**\n\n` +
          `Devam etmek istiyor musunuz?`
        )
        .setColor('#F1C40F')
        .setFooter({ text: 'Onaylama süresi 60 saniyedir.' })
        .setTimestamp();

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('confirm_quick')
          .setLabel('Evet, Sıfırla ve Kur')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('cancel_quick')
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

        if (btnInt.customId === 'cancel_quick') {
          await btnInt.update({
            content: '❌ Hızlı kurulum iptal edildi.',
            embeds: [],
            components: [],
          });
          collector.stop('cancelled');
          return;
        }

        if (btnInt.customId === 'confirm_quick') {
          await btnInt.update({
            content: `⏳ **Hızlı Kurulum Başlatıldı...** Sunucu temizleniyor ve **Genel Topluluk** şablonu uygulanıyor. Lütfen bekleyin...`,
            embeds: [],
            components: [],
          });

          collector.stop('confirmed');

          try {
            // Wiping & setting up
            await clearGuildStructure(guild);
            await applyTemplate(guild, defaultTemplate);

            // Log it
            await GuildConfig.findOneAndUpdate(
              { guildId: guild.id },
              { 
                $push: { 
                  logs: { 
                    templateName: defaultTemplate.name, 
                    appliedBy: interaction.user.id,
                    appliedAt: new Date()
                  } 
                } 
              },
              { upsert: true }
            );

            try {
              await interaction.user.send(
                `⚡ **${guild.name}** sunucunuza **Hızlı Kurulum (Genel Topluluk)** başarıyla tamamlandı!`
              );
            } catch {
              // ignore if DM is closed
            }
          } catch (error) {
            logger.error('Failed to complete quick setup:', error);
            try {
              await interaction.user.send(
                `❌ **${guild.name}** sunucusunda hızlı kurulum yaparken hata oluştu: ${error.message}`
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
  },
};

module.exports = { setupCommand };
