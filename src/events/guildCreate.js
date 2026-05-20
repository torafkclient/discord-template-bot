const { Events, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { logger } = require('../utils/logger');

module.exports = {
  name: Events.GuildCreate,
  once: false,
  async execute(guild) {
    logger.info(`Joined new guild: ${guild.name} (${guild.id}). Checking bot permissions...`);

    try {
      const botMember = await guild.members.fetchMe();

      // Check if bot has Administrator permission
      if (!botMember.permissions.has(PermissionFlagsBits.Administrator)) {
        logger.warn(`Missing Administrator permission in guild ${guild.name} (${guild.id}). Auto-leaving server...`);

        // Send a warning DM to the server owner explaining why the bot is leaving
        const owner = await guild.fetchOwner();
        if (owner) {
          const warningEmbed = new EmbedBuilder()
            .setTitle('🚨 Güvenlik Uyarısı ve Otomatik Ayrılma')
            .setDescription(
              `Merhaba **${owner.user.username}**,\n\n` +
              `**${guild.name}** sunucunuza şablon botumu eklediğiniz için teşekkür ederiz. Ancak botun düzgün çalışabilmesi, kanalları/rolleri silebilmesi ve şablonları kurabilmesi için **"Yönetici" (Administrator)** yetkisine ihtiyacı vardır.\n\n` +
              `Bot, sunucunuza eklenirken bu yetkiyi alamadığı için güvenlik nedeniyle **otomatik olarak sunucudan ayrılmıştır**.\n\n` +
              `**Nasıl Çözülür?**\n` +
              `Lütfen botu sunucunuza tekrar ekleyin ve davet linkinde **"Yönetici"** yetkisinin seçili olduğundan emin olun.`
            )
            .setColor('#E74C3C')
            .setTimestamp();

          try {
            await owner.send({ embeds: [warningEmbed] });
          } catch {
            logger.warn(`Could not send auto-leave DM to guild owner of ${guild.name}`);
          }
        }

        // Leave the guild
        await guild.leave();
      } else {
        logger.info(`Permissions verified successfully in guild: ${guild.name}. Bot has Administrator.`);
      }
    } catch (err) {
      logger.error(`Error in guildCreate handler for ${guild.name}:`, err);
    }
  },
};
