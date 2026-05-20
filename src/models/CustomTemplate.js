const { readDb, writeDb } = require('../utils/db');

const CustomTemplate = {
  async find(query = {}) {
    const db = readDb();
    const list = Object.values(db.templates);
    if (query.$or) {
      const gId = query.$or[0].guildId;
      const cBy = query.$or[1].createdBy;
      return list.filter(t => t.guildId === gId || t.createdBy === cBy);
    }
    return list;
  },

  async findOne({ name }) {
    const db = readDb();
    return db.templates[name] || null;
  },

  async findOneAndUpdate({ name }, update, options = {}) {
    const db = readDb();
    let template = db.templates[name];

    if (!template) {
      if (options.upsert) {
        template = {
          name,
          createdAt: new Date()
        };
      } else {
        return null;
      }
    }

    template.updatedAt = new Date();

    // Apply updates
    for (const [key, val] of Object.entries(update)) {
      if (key !== '$set') {
        template[key] = val;
      } else {
        for (const [subKey, subVal] of Object.entries(val)) {
          template[subKey] = subVal;
        }
      }
    }

    db.templates[name] = template;
    writeDb(db);
    return template;
  }
};

module.exports = { CustomTemplate };
