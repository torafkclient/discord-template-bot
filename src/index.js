require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { connectDatabase } = require('./utils/db');
const { registerEvents } = require('./handlers/eventHandler');
const { logger } = require('./utils/logger');

// Global error handlers for 24/7 crash protection in production
process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception thrown: ${error.stack || error}`);
});

// Initialize discord.js Client with required Intents and Partials
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.User
  ]
});

async function bootstrap() {
  logger.info('Initializing Discord Template Bot...');

  // 1. Establish database connection
  await connectDatabase();

  // 2. Load events & dynamic slash commands router
  registerEvents(client);

  // 3. Login to Discord gateway
  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    logger.error('CRITICAL: DISCORD_TOKEN is missing in .env file! Exiting process.');
    process.exit(1);
  }

  await client.login(token);
}

bootstrap().catch((err) => {
  logger.error('Failed to bootstrap bot application:', err);
  process.exit(1);
});
