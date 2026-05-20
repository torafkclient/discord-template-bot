const readyEvent = require('../events/ready');
const interactionCreateEvent = require('../events/interactionCreate');
const guildCreateEvent = require('../events/guildCreate');
const { logger } = require('../utils/logger');

function registerEvents(client) {
  const events = [
    readyEvent,
    interactionCreateEvent,
    guildCreateEvent
  ];

  for (const event of events) {
    try {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
      logger.info(`Event loaded: ${event.name} (${event.once ? 'once' : 'on'})`);
    } catch (err) {
      logger.error(`Failed to register event "${event.name}":`, err);
    }
  }
}

module.exports = { registerEvents };
