const { 
  ChannelType, 
  PermissionFlagsBits, 
  EmbedBuilder 
} = require('discord.js');
const { logger } = require('./logger');

// Helper to pause execution to prevent hitting Discord rate limits aggressively
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Maps string-based channel type to discord.js ChannelType enum
 */
function getChannelType(type, guild) {
  switch (type) {
    case 'text':
      return ChannelType.GuildText;
    case 'voice':
      return ChannelType.GuildVoice;
    case 'announcement':
      // Fallback to GuildText if server does not have COMMUNITY feature enabled
      if (guild && !guild.features.includes('COMMUNITY')) {
        return ChannelType.GuildText;
      }
      return ChannelType.GuildAnnouncement;
    case 'stage':
      // Fallback to GuildVoice if server does not have COMMUNITY feature enabled
      if (guild && !guild.features.includes('COMMUNITY')) {
        return ChannelType.GuildVoice;
      }
      return ChannelType.GuildStageVoice;
    default:
      return ChannelType.GuildText;
  }
}

/**
 * Maps permission strings to BigInt values from PermissionFlagsBits
 */
function mapPermissions(permissionStrings) {
  if (!permissionStrings) return [];
  return permissionStrings
    .map((perm) => PermissionFlagsBits[perm])
    .filter((perm) => perm !== undefined);
}

/**
 * Maps custom template permission overwrites to Discord API format
 */
function mapPermissionOverwrites(overwrites, roleMap, everyoneRole) {
  if (!overwrites) return [];

  return overwrites.map((overwrite) => {
    let targetId = everyoneRole.id;

    if (overwrite.roleName !== '@everyone') {
      const matchedRole = roleMap.get(overwrite.roleName);
      if (matchedRole) {
        targetId = matchedRole.id;
      } else {
        return null;
      }
    }

    const allowBits = mapPermissions(overwrite.allow);
    const denyBits = mapPermissions(overwrite.deny);

    return {
      id: targetId,
      allow: allowBits,
      deny: denyBits,
    };
  }).filter(Boolean);
}

/**
 * Clears a guild's channels and delete non-system roles before applying a new template
 */
async function clearGuildStructure(guild) {
  logger.info(`Starting cleanup for guild: ${guild.name} (${guild.id})`);

  // 1. Delete all channels
  const channels = await guild.channels.fetch();
  for (const [_, channel] of channels) {
    if (channel) {
      try {
        await channel.delete('Template deployment cleanup');
        await delay(250); // prevent aggressive rate limits
      } catch (err) {
        logger.warn(`Could not delete channel ${channel.name}: ${err.message}`);
      }
    }
  }

  // 2. Fetch and delete custom roles
  const roles = await guild.roles.fetch();
  const botMember = await guild.members.fetchMe();
  const botHighestRole = botMember.roles.highest;

  for (const [_, role] of roles) {
    // Skip @everyone and managed integration roles
    if (role.id === guild.id || role.managed) {
      continue;
    }

    try {
      await role.delete('Template deployment cleanup');
      await delay(200);
    } catch (err) {
      logger.warn(`Could not delete role ${role.name}: ${err.message}`);
    }
  }

  logger.info(`Cleanup completed for guild: ${guild.name}`);
}

/**
 * Core engine to build the template structure in a Guild
 */
async function applyTemplate(guild, template) {
  logger.info(`Applying template "${template.displayName}" to guild "${guild.name}" (${guild.id})`);

  const everyoneRole = guild.roles.everyone;
  const roleMap = new Map();

  // 1. Create Roles
  for (const roleData of template.roles) {
    try {
      const bitwisePermissions = mapPermissions(roleData.permissions);
      const createdRole = await guild.roles.create({
        name: roleData.name,
        color: roleData.color,
        hoist: roleData.hoist,
        mentionable: roleData.mentionable,
        permissions: bitwisePermissions,
        reason: 'Template setup - Role creation',
      });
      roleMap.set(roleData.name, createdRole);
      logger.debug(`Created role: ${roleData.name}`);
      await delay(300);
    } catch (err) {
      logger.error(`Error creating role "${roleData.name}":`, err);
    }
  }

  const createdChannelsMap = new Map();

  // 2. Create Categories & Channels
  for (const categoryData of template.categories) {
    let categoryChannel;
    try {
      // Build permission overwrites for the category
      const categoryOverwrites = mapPermissionOverwrites(
        categoryData.permissionOverwrites,
        roleMap,
        everyoneRole
      );

      categoryChannel = await guild.channels.create({
        name: categoryData.name,
        type: ChannelType.GuildCategory,
        permissionOverwrites: categoryOverwrites,
        reason: 'Template setup - Category creation',
      });

      logger.debug(`Created category: ${categoryData.name}`);
      await delay(300);
    } catch (err) {
      logger.error(`Error creating category "${categoryData.name}":`, err);
      continue;
    }

    // Create channels inside this category
    for (const channelData of categoryData.channels) {
      try {
        const channelType = getChannelType(channelData.type, guild);
        const channelOverwrites = mapPermissionOverwrites(
          channelData.permissionOverwrites,
          roleMap,
          everyoneRole
        );

        const createdChannel = await guild.channels.create({
          name: channelData.name,
          type: channelType,
          parent: categoryChannel.id,
          topic: channelData.topic || '',
          nsfw: channelData.nsfw || false,
          permissionOverwrites: channelOverwrites,
          reason: 'Template setup - Channel creation',
        });

        logger.debug(`Created channel: ${channelData.name}`);

        if (createdChannel.type === ChannelType.GuildText || createdChannel.type === ChannelType.GuildAnnouncement) {
          createdChannelsMap.set(channelData.name, createdChannel);
        }

        await delay(300);
      } catch (err) {
        logger.error(`Error creating channel "${channelData.name}" in category "${categoryData.name}":`, err);
      }
    }
  }

  // 3. Send Welcome Message (if configured)
  if (template.welcomeMessage) {
    const welcomeChan = createdChannelsMap.get(template.welcomeMessage.channelName);
    if (welcomeChan) {
      try {
        const welcomeEmbed = new EmbedBuilder()
          .setTitle(template.welcomeMessage.title)
          .setDescription(template.welcomeMessage.description)
          .setColor(template.welcomeMessage.color)
          .setTimestamp();

        if (template.welcomeMessage.fields) {
          welcomeEmbed.addFields(template.welcomeMessage.fields);
        }
        if (template.welcomeMessage.image) {
          welcomeEmbed.setImage(template.welcomeMessage.image);
        }

        await welcomeChan.send({ embeds: [welcomeEmbed] });
        logger.info(`Sent welcome embed to ${template.welcomeMessage.channelName}`);
      } catch (err) {
        logger.error('Error sending welcome message:', err);
      }
    }
  }

  // 4. Send Rules Message (if configured)
  if (template.rulesMessage) {
    const rulesChan = createdChannelsMap.get(template.rulesMessage.channelName);
    if (rulesChan) {
      try {
        const rulesList = template.rulesMessage.rules
          .map((rule, idx) => `**${idx + 1}.** ${rule}`)
          .join('\n\n');

        const rulesEmbed = new EmbedBuilder()
          .setTitle(template.rulesMessage.title)
          .setDescription(`${template.rulesMessage.description}\n\n${rulesList}`)
          .setColor(template.rulesMessage.color)
          .setFooter({ text: 'Sunucu Yönetimi' })
          .setTimestamp();

        await rulesChan.send({ embeds: [rulesEmbed] });
        logger.info(`Sent rules embed to ${template.rulesMessage.channelName}`);
      } catch (err) {
        logger.error('Error sending rules message:', err);
      }
    }
  }

  logger.info(`Template application completed: ${template.displayName}`);
}

module.exports = {
  clearGuildStructure,
  applyTemplate
};
