const { 
  REST, 
  Routes, 
  Collection 
} = require('discord.js');
const { templateCommand } = require('../commands/template');
const { setupCommand } = require('../commands/setup');
const { logger } = require('../utils/logger');

// List of all commands in the system
const commandList = [
  templateCommand,
  setupCommand
];

// In-memory collection of loaded commands
const commands = new Collection();
const cooldowns = new Collection();

// Populate the command collection
for (const cmd of commandList) {
  commands.set(cmd.data.name, cmd);
}

/**
 * Deploys slash commands to Discord globally
 */
async function deployCommands() {
  const token = process.env.DISCORD_TOKEN;
  const clientId = process.env.CLIENT_ID;

  if (!token || !clientId) {
    logger.error('Missing DISCORD_TOKEN or CLIENT_ID in environment. Commands registration skipped.');
    return;
  }

  const rest = new REST({ version: '10' }).setToken(token);
  const body = commandList.map((cmd) => cmd.data.toJSON());

  try {
    logger.info(`Started refreshing ${body.length} application (/) commands...`);

    await rest.put(
      Routes.applicationCommands(clientId),
      { body }
    );

    logger.info(`Successfully reloaded application (/) commands globally.`);
  } catch (error) {
    logger.error('Failed to deploy application commands:', error);
  }
}

/**
 * Central router/handler for slash command executions
 */
async function handleCommandInteraction(interaction) {
  const command = commands.get(interaction.commandName);

  if (!command) {
    logger.warn(`Received interaction for unregistered command: ${interaction.commandName}`);
    return;
  }

  // Handle Rate Limiting / Cooldowns
  if (!cooldowns.has(command.data.name)) {
    cooldowns.set(command.data.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.data.name);
  const cooldownAmount = (command.cooldown || 3) * 1000; // default 3s cooldown

  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
      await interaction.reply({
        content: `⏱ Lütfen bu komutu tekrar kullanmadan önce **${timeLeft}** saniye bekleyin.`,
        ephemeral: true,
      });
      return;
    }
  }

  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

  // Execute
  try {
    logger.info(`User ${interaction.user.tag} (${interaction.user.id}) ran /${interaction.commandName} in ${interaction.guild?.name || 'DM'}`);
    await command.execute(interaction);
  } catch (error) {
    logger.error(`Error executing command /${interaction.commandName}:`, error);

    const replyPayload = {
      content: '❌ Bu komut çalıştırılırken beklenmedik bir hata oluştu!',
      ephemeral: true,
    };

    if (interaction.deferred || interaction.replied) {
      await interaction.followUp(replyPayload);
    } else {
      await interaction.reply(replyPayload);
    }
  }
}

module.exports = {
  commandList,
  commands,
  deployCommands,
  handleCommandInteraction
};
