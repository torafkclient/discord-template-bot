const { 
  SlashCommandBuilder, 
  EmbedBuilder, 
  PermissionFlagsBits 
} = require('discord.js');
const { GuildConfig } = require('../models/GuildConfig');
const { logger } = require('../utils/logger');

const premiumCommand = {
  data: new SlashCommandBuilder()
    .setName('premium')
    .setDescription('Premium abonelik durumunu yönetir ve sorgular')
    .addSubcommand((sub) =>
      sub
        .setName('status')
        .setDescription('Sunucunun Premium abonelik durumunu ve kullanım geçmişini gösterir')
    )
    .addSubcommand((sub) =>
      sub
        .setName('grant')
        .setDescription('Global Admin: Bir sunucuya Premium abonelik verir veya iptal eder')
        .addStringOption((opt) =>
          opt
            .setName('sunucu_id')
            .setDescription('Premium verilecek sunucunun ID\'si')
            .setRequired(true)
        )
        .addBooleanOption((opt) =>
          opt
            .setName('aktif')
            .setDescription('Premium durumunu aktif/pasif yapar')
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const guild = interaction.guild;

    if (!guild && subcommand === 'status') {
      await interaction.reply({
        content: '❌ Bu komut sadece sunucularda kullanılabilir.',
        ephemeral: true,
      });
      return;
    }

    try {
      if (subcommand === 'status') {
        await handleStatus(interaction);
      } else if (subcommand === 'grant') {
        await handleGrant(interaction);
      }
    } catch (err) {
      logger.error(`Error in /premium ${subcommand}:`, err);
      await interaction.reply({
        content: `❌ Bir hata oluştu: ${err.message}`,
        ephemeral: true,
      });
    }
  },
};

/**
 * Show premium status and usage logs
 */
async function handleStatus(interaction) {
  const guild = interaction.guild;
  const guildId = guild.id;

  await interaction.deferReply();

  let config = await GuildConfig.findOne({ guildId });
  if (!config) {
    config = await GuildConfig.create({ guildId });
  }

  const embed = new EmbedBuilder()
    .setTitle(`💎 ${guild.name} - Premium Durumu`)
    .setColor(config.isPremium ? '#F1C40F' : '#95A5A6')
    .setThumbnail(guild.iconURL())
    .addFields(
      {
        name: 'Abonelik Durumu',
        value: config.isPremium 
          ? '🟢 **PREMIUM AKTİF**\nTüm gelişmiş şablonlar, özel emojiler ve gelişmiş izinler kullanılabilir.' 
          : '⚪ **Standart (Ücretsiz)**\nPremium şablonları kullanmak için lütfen kurucu ile iletişime geçin.',
      }
    )
    .setTimestamp();

  // Add applying logs
  if (config.logs && config.logs.length > 0) {
    const logList = config.logs
      .slice(-5) // show last 5 applications
      .map((log) => {
        const dateStr = log.appliedAt.toLocaleDateString('tr-TR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
        return `• \`${log.templateName}\` - <@${log.appliedBy}> tarafından uygulandı. (${dateStr})`;
      })
      .join('\n');

    embed.addFields({
      name: '📜 Son 5 Şablon Kurulum Geçmişi',
      value: logList,
    });
  } else {
    embed.addFields({
      name: '📜 Şablon Kurulum Geçmişi',
      value: '*Bu sunucuda henüz bir şablon kurulum kaydı bulunmuyor.*',
    });
  }

  await interaction.editReply({ embeds: [embed] });
}

/**
 * Global Admin only: Grant or revoke premium
 */
async function handleGrant(interaction) {
  const ownerId = process.env.OWNER_ID;

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '❌ Bu komutu yalnızca botun **Global Sahibi (Developer)** kullanabilir.',
      ephemeral: true,
    });
    return;
  }

  const targetGuildId = interaction.options.getString('sunucu_id', true).trim();
  const activeStatus = interaction.options.getBoolean('aktif', true);

  await interaction.deferReply({ ephemeral: true });

  const updatedConfig = await GuildConfig.findOneAndUpdate(
    { guildId: targetGuildId },
    { 
      isPremium: activeStatus,
      premiumGrantedBy: interaction.user.id,
      premiumExpiresAt: activeStatus ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : undefined // 1 year if active
    },
    { upsert: true, new: true }
  );

  logger.info(`Guild ${targetGuildId} premium state updated to ${activeStatus} by Owner.`);

  await interaction.editReply({
    content: `✅ **Başarılı!** \`${targetGuildId}\` ID'li sunucunun premium durumu **${
      activeStatus ? 'AKTİF (1 Yıl)' : 'PASİF'
    }** olarak güncellendi.`,
  });
}

module.exports = { premiumCommand };
