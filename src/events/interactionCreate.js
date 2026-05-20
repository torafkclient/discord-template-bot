const { Events } = require('discord.js');
const { handleCommandInteraction } = require('../handlers/commandHandler');
const { templates } = require('../templates');
const { CustomTemplate } = require('../models/CustomTemplate');
const { logger } = require('../utils/logger');

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    // 1. Handle Slash Command executions
    if (interaction.isChatInputCommand()) {
      await handleCommandInteraction(interaction);
      return;
    }

    // 2. Handle Autocomplete lists for /template apply
    if (interaction.isAutocomplete()) {
      if (interaction.commandName === 'template') {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        
        try {
          // Fetch custom templates for autocomplete
          const customTemplates = await CustomTemplate.find({
            $or: [
              { guildId: interaction.guildId },
              { createdBy: interaction.user.id }
            ]
          });

          // Built-in list
          const builtInOptions = templates.map((t) => ({
            name: `${t.displayName} (${t.isPremium ? '💎 Premium' : '🆓 Standart'})`,
            value: t.name,
          }));

          // Custom list
          const customOptions = customTemplates.map((t) => ({
            name: `🛠️ ${t.displayName} (Özel)`,
            value: t.name,
          }));

          const allOptions = [...builtInOptions, ...customOptions];

          // Filter matches
          const filtered = allOptions
            .filter((opt) => opt.name.toLowerCase().includes(focusedValue))
            .slice(0, 25); // Discord supports up to 25 items

          await interaction.respond(filtered);
        } catch (err) {
          logger.error('Autocomplete filtering failed:', err);
          await interaction.respond([]);
        }
      }
    }
  },
};
