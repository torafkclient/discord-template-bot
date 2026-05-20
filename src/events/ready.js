const { Events, ActivityType } = require('discord.js');
const { deployCommands } = require('../handlers/commandHandler');
const { logger } = require('../utils/logger');
const { templates } = require('../templates/index');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    logger.info(`Logged in as ${client.user.tag}!`);

    // Dynamic Rich Presence showing the exact number of templates
    client.user.setPresence({
      activities: [
        {
          name: `/template apply | ${templates.length} Sunucu Şablonu!`,
          type: ActivityType.Watching,
        },
      ],
      status: 'online',
    });

    // Automatically register/update slash commands globally
    await deployCommands();
  },
};
