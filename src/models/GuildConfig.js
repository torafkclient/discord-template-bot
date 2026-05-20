const { readDb, writeDb } = require('../utils/db');

const GuildConfig = {
  async findOne({ guildId }) {
    const db = readDb();
    const config = db.guilds[guildId];
    if (!config) return null;
    return {
      ...config,
      logs: config.logs ? config.logs.map(l => ({ ...l, appliedAt: new Date(l.appliedAt) })) : [],
    };
  },

  async create({ guildId }) {
    const db = readDb();
    const config = {
      guildId,
      isPremium: false,
      logs: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    db.guilds[guildId] = config;
    writeDb(db);
    return config;
  },

  async findOneAndUpdate({ guildId }, update, options = {}) {
    const db = readDb();
    let config = db.guilds[guildId];

    if (!config) {
      if (options.upsert) {
        config = {
          guildId,
          isPremium: false,
          logs: [],
          createdAt: new Date()
        };
      } else {
        return null;
      }
    }

    config.updatedAt = new Date();

    // 1. Handle mongoose $push operator
    if (update.$push) {
      for (const [field, val] of Object.entries(update.$push)) {
        config[field] = config[field] || [];
        config[field].push({
          ...val,
          appliedAt: new Date()
        });
      }
    }

    // 2. Handle flat values and standard updates
    for (const [key, val] of Object.entries(update)) {
      if (key !== '$push' && key !== '$pull' && key !== '$set') {
        config[key] = val;
      } else if (key === '$set') {
        for (const [subKey, subVal] of Object.entries(val)) {
          config[subKey] = subVal;
        }
      }
    }

    db.guilds[guildId] = config;
    writeDb(db);

    return {
      ...config,
      logs: config.logs ? config.logs.map(l => ({ ...l, appliedAt: new Date(l.appliedAt) })) : [],
    };
  }
};

module.exports = { GuildConfig };
