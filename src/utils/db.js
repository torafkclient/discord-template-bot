const fs = require('fs');
const path = require('path');
const { logger } = require('./logger');

const DB_DIR = path.join(__dirname, '../../data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Ensure DB file exists and directory is created
function initDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ guilds: {}, templates: {} }, null, 2), 'utf-8');
  }
}

function readDb() {
  initDb();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    logger.error('Failed to read database file:', err);
    return { guilds: {}, templates: {} };
  }
}

function writeDb(data) {
  initDb();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    logger.error('Failed to write database file:', err);
  }
}

async function connectDatabase() {
  try {
    initDb();
    logger.info('Successfully initialized local file-based JSON database at ./data/db.json.');
  } catch (error) {
    logger.error('Failed to initialize local JSON database:', error);
    process.exit(1);
  }
}

module.exports = {
  connectDatabase,
  readDb,
  writeDb
};
