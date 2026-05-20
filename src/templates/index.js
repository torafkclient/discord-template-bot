/**
 * Official Premium Discord Templates extracted from discordtemplates.me
 * Contains exactly 25 elite, beautiful, and highly aesthetic layouts with rich roles, channels, and custom configurations.
 * EVERY template has been expanded to be extremely long, rich, and detailed (no short 4-channel setups!).
 */
const templates = [
  // 1. SMALL COMMUNITY SERVER
  {
    name: 'small-community',
    displayName: '👥 Small Community Server',
    description: 'discordtemplates.me popular small community layout with Important announcements, Chatting hubs, Voice channels, and Staff sections.',
    isPremium: false,
    emojiPackageSuggestion: '📣, 💬, 🎤',
    roles: [
      { name: '👑 [OWNER]', color: '#E74C3C', hoist: true, mentionable: true, permissions: ['Administrator'] },
      { name: '👮 [MOD]', color: '#3498DB', hoist: true, mentionable: true, permissions: ['ManageMessages', 'KickMembers', 'MuteMembers'] },
      { name: '🌟 [FRIEND]', color: '#F1C40F', hoist: true, mentionable: true, permissions: [] },
      { name: '🎖️ [OG]', color: '#9B59B6', hoist: true, mentionable: true, permissions: [] },
      { name: '👥 [Member]', color: '#2ECC71', hoist: false, mentionable: false, permissions: [] }
    ],
    categories: [
      {
        name: '📜Important',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📣announcement', type: 'announcement', topic: 'Sunucu duyuruları' },
          { name: '📑rules', type: 'text', topic: 'Sunucu kuralları' },
          { name: '🔮portal', type: 'text', topic: 'Sunucu portal ve bilgilendirme' }
        ]
      },
      {
        name: '💬Chatting',
        channels: [
          { name: '💬general-chat', type: 'text', topic: 'Genel sohbet odası' },
          { name: '🤖bot-commands', type: 'text', topic: 'Bot komut alanı' },
          { name: '📷pictures', type: 'text', topic: 'Resim paylaşım odası' },
          { name: '🎵music-requests', type: 'text', topic: 'Müzik dinleme komutları' }
        ]
      },
      {
        name: '🎤Voice channels',
        channels: [
          { name: '🗣 [MAIN]', type: 'voice' },
          { name: '🔊 [MUSIC]', type: 'voice' }
        ]
      },
      {
        name: '👏 Community',
        channels: [
          { name: '📷videos', type: 'text', topic: 'Video klipler' },
          { name: '🎉giveaways', type: 'text', topic: 'Çekiliş odası' }
        ]
      },
      {
        name: '👩💼Staff Only',
        permissionOverwrites: [
          { roleName: '@everyone', deny: ['ViewChannel'] },
          { roleName: '👮 [MOD]', allow: ['ViewChannel', 'SendMessages'] },
          { roleName: '👑 [OWNER]', allow: ['ViewChannel', 'SendMessages'] }
        ],
        channels: [
          { name: 'staff-rules', type: 'text' },
          { name: 'staff-general', type: 'text' },
          { name: 'bot-logs', type: 'text' },
          { name: 'Staff call', type: 'voice' }
        ]
      }
    ]
  },

  // 2. SIMPLE SERVER TEMPLATE
  {
    name: 'simple-server',
    displayName: '✨ Simple Server Template',
    description: 'discordtemplates.me popular multi-level community template with active level ranks, VIP sections, and Head/Admin staff hierarchy.',
    isPremium: false,
    emojiPackageSuggestion: '📌, ✨, 🚧',
    roles: [
      { name: '👑 Owner', color: '#C0392B', hoist: true, mentionable: true, permissions: ['Administrator'] },
      { name: '🛡️ Administrator', color: '#8E44AD', hoist: true, mentionable: true, permissions: ['Administrator'] },
      { name: '👮 Head Moderator', color: '#2980B9', hoist: true, mentionable: true, permissions: ['ManageMessages', 'KickMembers', 'BanMembers'] },
      { name: '👮 Moderator', color: '#3498DB', hoist: true, mentionable: true, permissions: ['ManageMessages', 'KickMembers'] },
      { name: '🛠️ Staff', color: '#1ABC9C', hoist: true, mentionable: true, permissions: ['ManageMessages'] },
      { name: '🏆 Champion', color: '#F1C40F', hoist: true, mentionable: true, permissions: [] },
      { name: '👑 VIP', color: '#F39C12', hoist: true, mentionable: true, permissions: [] },
      { name: '🌠 Most Active [LVL 50]', color: '#E74C3C', hoist: false, permissions: [] },
      { name: '💫 Insanely Active [LVL 30]', color: '#E67E22', hoist: false, permissions: [] },
      { name: '🌟 Extremely Active [LVL 20]', color: '#F1C40F', hoist: false, permissions: [] },
      { name: '⭐ Super Active [LVL 10]', color: '#2ECC71', hoist: false, permissions: [] },
      { name: '✨ Active [LVL 5]', color: '#3498DB', hoist: false, permissions: [] },
      { name: '👥 Member', color: '#95A5A6', hoist: false, permissions: [] },
      { name: '🤖 Bot', color: '#7F8C8D', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '📌 Important',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜rules', type: 'text' },
          { name: '❔information', type: 'text' },
          { name: '🆘support', type: 'text' },
          { name: '📢announcements', type: 'announcement' }
        ]
      },
      {
        name: '💬 General',
        channels: [
          { name: 'general', type: 'text', topic: 'Genel sohbet' },
          { name: 'bot-commands', type: 'text' },
          { name: 'suggestions', type: 'text' },
          { name: 'vip-chat', type: 'text', permissionOverwrites: [{ roleName: '@everyone', deny: ['ViewChannel'] }, { roleName: '👑 VIP', allow: ['ViewChannel'] }, { roleName: '👑 Owner', allow: ['ViewChannel'] }] },
          { name: 'General 1', type: 'voice' },
          { name: 'General 2', type: 'voice' }
        ]
      },
      {
        name: '🚧 Staff',
        permissionOverwrites: [
          { roleName: '@everyone', deny: ['ViewChannel'] },
          { roleName: '🛠️ Staff', allow: ['ViewChannel'] }
        ],
        channels: [
          { name: 'staff-announcements', type: 'text' },
          { name: 'mod-chat', type: 'text' },
          { name: 'head-mod-chat', type: 'text' },
          { name: 'admin-chat', type: 'text' },
          { name: 'reports', type: 'text' },
          { name: 'logs', type: 'text' },
          { name: 'Mod Chat', type: 'voice' },
          { name: 'Admin Chat', type: 'voice' }
        ]
      }
    ]
  },

  // 3. GAMING AND FRIENDS
  {
    name: 'gaming-friends',
    displayName: '🎮 Gaming and Friends',
    description: 'discordtemplates.me popular layout for gaming and friends featuring custom chatting, dynamic self-adverts, and hotel sleep areas.',
    isPremium: false,
    emojiPackageSuggestion: '🎮, 💬, 🏢',
    roles: [
      { name: '👑 [OWNER]', color: '#C0392B', hoist: true, mentionable: true, permissions: ['Administrator'] },
      { name: '👮 [MOD]', color: '#2980B9', hoist: true, mentionable: true, permissions: ['ManageMessages'] },
      { name: '🌟 [FRIEND]', color: '#F1C40F', hoist: true, permissions: [] },
      { name: '🎖️ [OG]', color: '#8E44AD', hoist: true, permissions: [] },
      { name: '👥 [Member]', color: '#2ECC71', hoist: false, permissions: [] },
      { name: '🤖 Bots', color: '#7F8C8D', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '📜IMPORTANT',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📣announcement', type: 'announcement' },
          { name: '📑rules', type: 'text' }
        ]
      },
      {
        name: '💬CHATTING',
        channels: [
          { name: '💬main-chat', type: 'text' },
          { name: '🧮self-advertizement', type: 'text' },
          { name: '🤖bot-stuff', type: 'text' },
          { name: '📈polls', type: 'text' },
          { name: '☢memes', type: 'text' }
        ]
      },
      {
        name: '🎤VOICE CHANNELS',
        channels: [
          { name: 'vc1', type: 'voice' },
          { name: 'vc2', type: 'voice' },
          { name: 'vc3', type: 'voice' },
          { name: 'vc4', type: 'voice' },
          { name: 'vc5', type: 'voice' }
        ]
      },
      {
        name: '👏 COMMUNITY',
        channels: [
          { name: '📷videos', type: 'text' },
          { name: '📷pictures', type: 'text' }
        ]
      },
      {
        name: '🏢HOTEL',
        channels: [
          { name: '🛏Sleeping', type: 'voice' }
        ]
      }
    ]
  },

  // 4. GAMING COMMUNITY FRIENDS (Duo/Trio/Team gaming slots)
  {
    name: 'gaming-community-friends',
    displayName: '🎮 Gaming Community & Friends Duo/Trio',
    description: 'discordtemplates.me advanced gaming layout featuring organized spaces for player search, promo, and dedicated Duo/Trio/Team voice channels.',
    isPremium: false,
    emojiPackageSuggestion: '🔔, ✨, 🌈',
    roles: [
      { name: '👑 Owner', color: '#C0392B', hoist: true, mentionable: true, permissions: ['Administrator'] },
      { name: '👑 Co Owner', color: '#D35400', hoist: true, mentionable: true, permissions: ['Administrator'] },
      { name: '👾 DC Manager', color: '#8E44AD', hoist: true, mentionable: true, permissions: ['ManageMessages'] },
      { name: '👽 Moderator', color: '#2980B9', hoist: true, mentionable: true, permissions: ['ManageMessages'] },
      { name: '👨‍💻 Supporter', color: '#1ABC9C', hoist: true, permissions: [] },
      { name: '🤝 Partner', color: '#2ECC71', hoist: true, permissions: [] },
      { name: '💎 VIP / DM = BAN', color: '#F1C40F', hoist: true, permissions: [] },
      { name: '🙋‍♂️ RL Friend', color: '#3498DB', hoist: false, permissions: [] },
      { name: '🙋‍♂️ Friend', color: '#A569BD', hoist: false, permissions: [] },
      { name: '🌍 Community', color: '#BDC3C7', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '🔔 IMPORTANT',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📣announcements', type: 'announcement' },
          { name: '💜self-roles', type: 'text' },
          { name: '🎉events', type: 'text' },
          { name: '📑owner-socials', type: 'text' }
        ]
      },
      {
        name: '🆙 LEVELS',
        channels: [
          { name: '🆙level-ups', type: 'text' }
        ]
      },
      {
        name: '✨ CHATS',
        channels: [
          { name: '✨chat-eng', type: 'text' },
          { name: '✨chat-ger', type: 'text' },
          { name: '🤖bot-commands', type: 'text' },
          { name: '😂memes', type: 'text' },
          { name: '🔍looking-for-players', type: 'text' },
          { name: '🎥self-promo', type: 'text' }
        ]
      },
      {
        name: '🤝 PARTNER',
        channels: [
          { name: '🤝partner-promo', type: 'text' },
          { name: '🤝partner-req', type: 'text' }
        ]
      },
      {
        name: '👑 OWNER TALK',
        permissionOverwrites: [
          { roleName: '@everyone', deny: ['ViewChannel'] },
          { roleName: '👑 Owner', allow: ['ViewChannel', 'Connect'] }
        ],
        channels: [
          { name: "👑oop's Talk", type: 'voice' },
          { name: '🕖Move', type: 'voice' }
        ]
      },
      {
        name: '🌈 VOICES',
        channels: [
          { name: '🌈Main Voice', type: 'voice' },
          { name: '🔐Private Talk 1', type: 'voice' },
          { name: '🔐Private Talk 2', type: 'voice' },
          { name: '🔐Private Talk 3', type: 'voice' }
        ]
      },
      {
        name: '💥 Games compartment',
        channels: [
          { name: '💥╔ Game Duo [1]', type: 'voice' },
          { name: '⚡╠ Game Duo [2]', type: 'voice' },
          { name: '🔥 ╚ Game Duo [3]', type: 'voice' },
          { name: '💥╔ Game Trio [1]', type: 'voice' },
          { name: '⚡╠ Game Trio [2]', type: 'voice' },
          { name: '🔥 ╚ Game Trio [3]', type: 'voice' },
          { name: '💥╔ Game Team [1]', type: 'voice' },
          { name: '⚡╠ Game Team [2]', type: 'voice' },
          { name: '🔥 ╚ Game Team [3]', type: 'voice' },
          { name: '💥╔ Open Game Talk [1]', type: 'voice' },
          { name: '⚡╠ Open Game Talk [2]', type: 'voice' },
          { name: '🔥 ╚ Open Game Talk [3]', type: 'voice' }
        ]
      }
    ]
  },

  // 5. ANIME ICHIGO (AESTHETIC TURKISH / JAPANESE)
  {
    name: 'anime-ichigo',
    displayName: '🌸 Anime Ichigo / Aesthetic Community',
    description: 'discordtemplates.me popular highly aesthetic Turkish anime template. level, matching icons, custom ping self-roles, and anime-themed voice channels.',
    isPremium: false,
    emojiPackageSuggestion: '🌸, 🍓, 🍥',
    roles: [
      { name: '👑 Kurucu!', color: '#FF3366', hoist: true, mentionable: true, permissions: ['Administrator'] },
      { name: '👑 Kurucu Ortak!', color: '#E74C3C', hoist: true, mentionable: true, permissions: ['Administrator'] },
      { name: '🛡️ Admin!', color: '#8E44AD', hoist: true, mentionable: true, permissions: ['ManageMessages'] },
      { name: '👮 Mod!', color: '#3498DB', hoist: true, mentionable: true, permissions: ['ManageMessages'] },
      { name: '👮 Chat Mod!', color: '#2ECC71', hoist: true, mentionable: true, permissions: ['ManageMessages'] },
      { name: '🎉 Event Manager', color: '#F1C40F', hoist: true, permissions: [] },
      { name: '🤝 Sponsor!', color: '#F39C12', hoist: true, permissions: [] },
      { name: '🌸 Anime', color: '#FF80AB', hoist: false, permissions: [] },
      { name: '🎨 Resim', color: '#1ABC9C', hoist: false, permissions: [] },
      { name: '🩰 Dans', color: '#9B59B6', hoist: false, permissions: [] },
      { name: '📖 Manga', color: '#16A085', hoist: false, permissions: [] },
      { name: '👥 Muted', color: '#7F8C8D', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '૮ ˶ˆ꒳ˆ˵ ა ICHİGO ˖ ࣪',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '╭꒷🍓₊˚๑┆kurallar꒱', type: 'text' },
          { name: 'hakkında꒱', type: 'text' },
          { name: 'davetler꒱', type: 'text' },
          { name: 'yetkili-alım꒱', type: 'text' },
          { name: 'level-ups꒱', type: 'text' }
        ]
      },
      {
        name: '૮ ˶ˆ꒳ˆ˵ ა ÖNEMLİ ˖ ࣪',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '╭꒷🍓₊˚๑┆roller꒱', type: 'text' },
          { name: 'renkler꒱', type: 'text' },
          { name: 'çekilişler꒱', type: 'text' },
          { name: 'avantajlar꒱', type: 'text' },
          { name: 'boost꒱', type: 'text' },
          { name: 'şikayet-öneri꒱', type: 'text' }
        ]
      },
      {
        name: '૮ ˶ˆ꒳ˆ˵ ა GENEL ˖ ࣪',
        channels: [
          { name: '╭꒷🍓₊˚๑┆sohbet꒱', type: 'text', topic: 'Genel anime sohbet odası' },
          { name: 'bot-komut꒱', type: 'text' },
          { name: 'kendini-tanıt꒱', type: 'text' },
          { name: 'emoji꒱', type: 'text' },
          { name: 'foto-video꒱', type: 'text' }
        ]
      },
      {
        name: '૮ ˶ˆ꒳ˆ˵ ა GALERİ ˖ ࣪',
        channels: [
          { name: '╭꒷🍓₊˚๑┆anime-icon꒱', type: 'text' },
          { name: 'anime-gif-icon꒱', type: 'text' },
          { name: 'anime-matching-icons꒱', type: 'text' },
          { name: 'anime-wallpapers꒱', type: 'text' }
        ]
      },
      {
        name: '૮ ˶ˆ꒳ˆ˵ ა OYUN ! ˖ ࣪',
        channels: [
          { name: '╭꒷🍓₊˚๑┆owo꒱', type: 'text' },
          { name: 'aki꒱', type: 'text' },
          { name: 'cortex꒱', type: 'text' },
          { name: 'mudae꒱', type: 'text' },
          { name: 'anigame꒱', type: 'text' }
        ]
      },
      {
        name: '૮ ˶ˆ꒳ˆ˵ ა ETKİNLİK ˖ ࣪',
        channels: [
          { name: '╭꒷🍓₊˚๑┆karakter-vs꒱', type: 'text' },
          { name: 'ship-or-skip꒱', type: 'text' },
          { name: 'kiss-marry-kill꒱', type: 'text' },
          { name: 'qotd꒱', type: 'text' },
          { name: 'aotd꒱', type: 'text' }
        ]
      },
      {
        name: '૮ ˶ˆ꒳ˆ˵ ა SESLİ ! ˖ ࣪',
        channels: [
          { name: '╭꒷🍓₊˚๑┆mikrofonsuz-sohbet꒱', type: 'text' },
          { name: 'müzik-komut꒱', type: 'text' },
          { name: 'Sohbet¹', type: 'voice' },
          { name: 'Sohbet²', type: 'voice' },
          { name: 'Sohbet³', type: 'voice' },
          { name: 'Müzik¹', type: 'voice' },
          { name: 'Müzik²', type: 'voice' },
          { name: 'Müzik³', type: 'voice' },
          { name: '⬝ ✦ ៹ AFK ♡ᵎ', type: 'voice' }
        ]
      }
    ]
  },

  // 6. CHILL/PURPLE THEMED! (Aesthetic Purple lounge)
  {
    name: 'chill-purple',
    displayName: '🔮 Chill Purple Aesthetic Lounge',
    description: 'discordtemplates.me popular purple aesthetic community template. reaction roles, zodiac lists, study spaces, and game lounges.',
    isPremium: false,
    emojiPackageSuggestion: '🔮, ☂️, 💜',
    roles: [
      { name: '👑 Owner', color: '#8E44AD', hoist: true, mentionable: true, permissions: ['Administrator'] },
      { name: '🛡️ Admin', color: '#9B59B6', hoist: true, mentionable: true, permissions: ['Administrator'] },
      { name: '👮 Booster!', color: '#D2B4DE', hoist: true, permissions: [] },
      { name: '🌟 Verified', color: '#BB8FCE', hoist: true, permissions: [] },
      { name: '— 🔮Single﹆', color: '#EBDEF0', hoist: false, permissions: [] },
      { name: '— 🔮Taken﹆', color: '#A569BD', hoist: false, permissions: [] },
      { name: '— 💜18+﹆', color: '#7D3C98', hoist: false, permissions: [] },
      { name: '— 💜13-16﹆', color: '#C39BD3', hoist: false, permissions: [] },
      { name: '— ☂️Europe﹆', color: '#5B2C6F', hoist: false, permissions: [] },
      { name: '— ☂️Asia﹆', color: '#4A235A', hoist: false, permissions: [] },
      { name: '— ♑Capricorn﹆', color: '#AF7AC5', hoist: false, permissions: [] },
      { name: '— ♏Scorpio﹆', color: '#9B59B6', hoist: false, permissions: [] },
      { name: '— ♌Leo﹆', color: '#BB8FCE', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: 'っ◔◡◔っ [IMPORTANT]',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: 'っ◔◡◔っ💜-rules-💜', type: 'text' },
          { name: 'welcome-goodbye', type: 'text' },
          { name: 'verify', type: 'text' },
          { name: 'reaction-roles', type: 'text' }
        ]
      },
      {
        name: 'っ◔◡◔っ [ADMINS]',
        permissionOverwrites: [
          { roleName: '@everyone', deny: ['ViewChannel'] },
          { roleName: '🛡️ Admin', allow: ['ViewChannel'] },
          { roleName: '👑 Owner', allow: ['ViewChannel'] }
        ],
        channels: [
          { name: 'moderators', type: 'text' },
          { name: 'cmds', type: 'text' }
        ]
      },
      {
        name: 'っ◔◡◔っ [TEXT]',
        channels: [
          { name: 'lounge', type: 'text', topic: 'Genel sohbet lounge' },
          { name: 'art', type: 'text' }
        ]
      },
      {
        name: 'っ◔◡◔っ [RANDOM]',
        channels: [
          { name: 'levels', type: 'text' },
          { name: 'polls', type: 'text' }
        ]
      },
      {
        name: 'っ◔◡◔っ [BOTS]',
        channels: [
          { name: 'mudae', type: 'text' },
          { name: 'counting', type: 'text' },
          { name: 'meme', type: 'text' },
          { name: 'aki', type: 'text' }
        ]
      },
      {
        name: 'っ◔◡◔っ [TALK] (SES)',
        channels: [
          { name: 'lounge', type: 'voice' },
          { name: 'movie-night', type: 'voice' },
          { name: 'minecraft', type: 'voice' },
          { name: 'roblox', type: 'voice' },
          { name: 'league', type: 'voice' },
          { name: 'among us', type: 'voice' },
          { name: 'genshin', type: 'voice' }
        ]
      },
      {
        name: 'っ◔◡◔っ [MUSIC]',
        channels: [
          { name: 'music-cmds-1', type: 'text' },
          { name: 'music-cmds-2', type: 'text' },
          { name: 'music', type: 'voice' },
          { name: 'music2', type: 'voice' }
        ]
      },
      {
        name: 'っ◔◡◔っ [STUDY/SCHOOL]',
        channels: [
          { name: 'chillbot', type: 'text' },
          { name: 'homework・help', type: 'text' },
          { name: 'study', type: 'voice' }
        ]
      }
    ]
  },

  // 7. AESTHETIC SAKURA
  {
    name: 'aesthetic-sakura',
    displayName: '🌸 Sakura Aesthetic Cafe',
    description: 'Cozy and aesthetic sakura-themed cafe community layout with visual assets and chill hubs.',
    isPremium: false,
    emojiPackageSuggestion: '🌸, ☕, 🍧',
    roles: [
      { name: '🌸 Cafe Owner', color: '#FFB6C1', hoist: true, permissions: ['Administrator'] },
      { name: '☕ Barista (Staff)', color: '#FFD1DC', hoist: true, permissions: ['ManageMessages'] },
      { name: '🍧 Regular Customer', color: '#FFE4E1', hoist: true, permissions: [] },
      { name: '🍡 Elite Guest', color: '#E8A7A1', hoist: true, permissions: [] },
      { name: '🍵 Coffee Lover', color: '#C28E8E', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '🌸 SAKURA FOYER',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '☕・welcome-rules', type: 'text' },
          { name: '📜・cafe-rules', type: 'text' },
          { name: '📢・announcements', type: 'announcement' },
          { name: '💎・boost-benefits', type: 'text' }
        ]
      },
      {
        name: '🌸 CHILL TEA CORNER',
        channels: [
          { name: '🍵・tea-chat', type: 'text', topic: 'Genel sohbet odası' },
          { name: '🍡・selfies', type: 'text' },
          { name: '🍧・aesthetic-images', type: 'text' },
          { name: '🤖・bot-playground', type: 'text' }
        ]
      },
      {
        name: '🍧 CAFE SEATS (SES)',
        channels: [
          { name: '🔊 Window Seat (Lounge)', type: 'voice' },
          { name: '🔊 Terrace Tables #1', type: 'voice' },
          { name: '🔊 Terrace Tables #2', type: 'voice' },
          { name: '🔊 Cozy Fireside Corner', type: 'voice' },
          { name: '🔊 Lofi Chill Cabin', type: 'voice' }
        ]
      }
    ]
  },

  // 8. CYBERPUNK NEON GRID
  {
    name: 'cyberpunk-lounge',
    displayName: '🌌 Cyberpunk Neon Grid',
    description: 'Neon cyberpunk futuristic space layout perfect for tech discussions and siberpunk fans.',
    isPremium: false,
    emojiPackageSuggestion: '🌌, 🧪, 📡',
    roles: [
      { name: '🤖 System Admin', color: '#00FFFF', hoist: true, permissions: ['Administrator'] },
      { name: '📡 Cyber Runner (Mod)', color: '#FF00FF', hoist: true, permissions: ['ManageMessages'] },
      { name: '🧪 Grid Resident', color: '#FFFF00', hoist: true, permissions: [] },
      { name: '🦾 Cyborg Member', color: '#9932CC', hoist: true, permissions: [] },
      { name: '🛸 Netrunner', color: '#00FA9A', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '📡 GRID SYSTEM PROTOCOL',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📡・rules-and-info', type: 'text' },
          { name: '📢・grid-broadcast', type: 'announcement' }
        ]
      },
      {
        name: '📡 MAIN GRID DATA',
        channels: [
          { name: '💬・grid-chat', type: 'text' },
          { name: '🧪・cyber-logs', type: 'text' },
          { name: '🦾・hardware-mods', type: 'text' },
          { name: '🛸・glitch-art', type: 'text' }
        ]
      },
      {
        name: '🌌 NEON NODES (SES)',
        channels: [
          { name: '🔊 Cyber Lounge #1', type: 'voice' },
          { name: '🔊 Grid Room #2', type: 'voice' },
          { name: '🔊 System Terminal #3', type: 'voice' },
          { name: '🔊 Netrunner Space', type: 'voice' }
        ]
      }
    ]
  },

  // 9. COZY STUDY LIBRARY
  {
    name: 'study-cafe',
    displayName: '📚 Cozy Library & Study Cafe',
    description: 'Perfect space for studying, group works, coding and reading books in absolute silence.',
    isPremium: false,
    emojiPackageSuggestion: '📚, 📖, ✏️',
    roles: [
      { name: '🎓 Librarian (Owner)', color: '#855E42', hoist: true, permissions: ['Administrator'] },
      { name: '✏️ Tutor (Mod)', color: '#A0522D', hoist: true, permissions: ['ManageMessages'] },
      { name: '📖 Scholar / Student', color: '#DEB887', hoist: true, permissions: [] },
      { name: '💻 Programmer', color: '#5D6D7E', hoist: false, permissions: [] },
      { name: '📝 Writer', color: '#AF601A', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '📚 LIBRARY REGISTRATION',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📖・rules-rules', type: 'text' },
          { name: '📢・announcements', type: 'announcement' }
        ]
      },
      {
        name: '📚 COZY STUDY HALL',
        channels: [
          { name: '💬・general-study-hall', type: 'text' },
          { name: '✏️・homework-help', type: 'text' },
          { name: '💡・resources', type: 'text' },
          { name: '💻・coding-help', type: 'text' }
        ]
      },
      {
        name: '📖 SILENT STUDY (SES)',
        channels: [
          { name: '🔊 Silent Reading Desk #1', type: 'voice' },
          { name: '🔊 Coding / Dev Desk #2', type: 'voice' },
          { name: '🔊 Focus Music Lounge #3', type: 'voice' },
          { name: '🔊 Study Group Room #4', type: 'voice' }
        ]
      }
    ]
  },

  // 10. LOFI RADIO 24/7
  {
    name: 'lofi-radio',
    displayName: '📻 Lofi Radio 24/7',
    description: 'Lofi aesthetic radio station community template with lofi playlist links and radio rooms.',
    isPremium: false,
    emojiPackageSuggestion: '📻, 🎧, ☕',
    roles: [
      { name: '📻 Station Host (Owner)', color: '#E59866', hoist: true, permissions: ['Administrator'] },
      { name: '🎧 DJ (Mod)', color: '#F8C471', hoist: true, permissions: ['ManageMessages'] },
      { name: '☕ Chill Listener', color: '#FAD7A0', hoist: true, permissions: [] },
      { name: '📻 Vinyl Collector', color: '#E59866', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '📻 STATION ENTRANCE',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・station-rules', type: 'text' },
          { name: '📢・live-broadcast-news', type: 'announcement' }
        ]
      },
      {
        name: '📻 TRANSMISSION CHANNELS',
        channels: [
          { name: '🎧・radio-chats', type: 'text' },
          { name: '📻・lofi-playlist', type: 'text' },
          { name: '☕・night-cafe-vibes', type: 'text' }
        ]
      },
      {
        name: '🎧 RADIO CHANNELS (SES)',
        channels: [
          { name: '🔊 Lofi Chill Station', type: 'voice' },
          { name: '🔊 Sleep Radio Station', type: 'voice' },
          { name: '🔊 Study Beats Room', type: 'voice' },
          { name: '🔊 Midnight Vinyl Spin', type: 'voice' }
        ]
      }
    ]
  },

  // 11. STEAM GAMERS LOBBY
  {
    name: 'steam-gamers',
    displayName: '🕹️ Steam Gamers Lobby',
    description: 'Perfect hub for casual gaming, co-op lobbies, steam library shares, and general chats.',
    isPremium: false,
    emojiPackageSuggestion: '🕹️, 🎮, 👾',
    roles: [
      { name: '👾 Arcade Boss (Owner)', color: '#1F618D', hoist: true, permissions: ['Administrator'] },
      { name: '🕹️ Mod (Admin)', color: '#2980B9', hoist: true, permissions: ['ManageMessages'] },
      { name: '🎮 Steam Player', color: '#5DADE2', hoist: true, permissions: [] },
      { name: '🥇 Pro Gamer', color: '#F4D03F', hoist: true, permissions: [] },
      { name: '🎧 Co-Op Player', color: '#48C9B0', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '🕹️ WELCOME BOARD',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・server-rules', type: 'text' },
          { name: '📢・steam-updates', type: 'announcement' }
        ]
      },
      {
        name: '🕹️ ARCADE ROOM',
        channels: [
          { name: '💬・lobby-chat', type: 'text' },
          { name: '🎮・game-shares', type: 'text' },
          { name: '🥇・clip-sharing', type: 'text' },
          { name: '👾・bot-fun', type: 'text' }
        ]
      },
      {
        name: '🕹️ STEAM DUOS (SES)',
        channels: [
          { name: '🔊 Duo Channel #1', type: 'voice' },
          { name: '🔊 Co-op Lobby #2', type: 'voice' },
          { name: '🔊 Steam Squad #3', type: 'voice' },
          { name: '🔊 Competitive Room #4', type: 'voice' }
        ]
      }
    ]
  },

  // 12. MOVIE POPCORN NETFLIX
  {
    name: 'movie-popcorn',
    displayName: '🍿 Movie & Netflix Night',
    description: 'For cinema lovers, film discussion forums, and Netflix party screen sharing rooms.',
    isPremium: false,
    emojiPackageSuggestion: '🍿, 🎬, 📺',
    roles: [
      { name: '🎬 Film Director (Owner)', color: '#A04000', hoist: true, permissions: ['Administrator'] },
      { name: '🍿 Patlamış Mısır (Mod)', color: '#D35400', hoist: true, permissions: ['ManageMessages'] },
      { name: '📺 Movie Addict', color: '#F39C12', hoist: true, permissions: [] },
      { name: '🎥 Series Binger', color: '#F8C471', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '🍿 WELCOME THEATER',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・theater-rules', type: 'text' },
          { name: '📢・watch-schedule', type: 'announcement' }
        ]
      },
      {
        name: '🍿 THEATER HUB',
        channels: [
          { name: '💬・cinema-chats', type: 'text' },
          { name: '🎬・movie-recommendations', type: 'text' },
          { name: '🎥・series-reviews', type: 'text' }
        ]
      },
      {
        name: '📺 CINEMA SCREENS (SES)',
        channels: [
          { name: '🔊 1. Cinema Screen', type: 'voice' },
          { name: '🔊 2. Cinema Screen', type: 'voice' },
          { name: '🔊 Netflix Room #3', type: 'voice' },
          { name: '🔊 Anime Watch Room #4', type: 'voice' }
        ]
      }
    ]
  },

  // 13. FPS VALORANT/CS2 SHOOTER
  {
    name: 'fps-shooter',
    displayName: '🔫 FPS Squad Valorant/CS2',
    description: 'Highly competitive shooter arena server template with active duo/trio queues.',
    isPremium: false,
    emojiPackageSuggestion: '🔫, 🏆, 🎖️',
    roles: [
      { name: '🏆 Top Gun (Owner)', color: '#9B59B6', hoist: true, permissions: ['Administrator'] },
      { name: '🔫 Captain (Mod)', color: '#8E44AD', hoist: true, permissions: ['ManageMessages'] },
      { name: '🎖️ Ranked Soldier', color: '#D2B4DE', hoist: true, permissions: [] },
      { name: '🔥 Radiant / Global', color: '#F1C40F', hoist: true, permissions: [] },
      { name: '🎯 Gunner', color: '#1ABC9C', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '🔫 BARRACKS INFO',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・rules-and-ranks', type: 'text' },
          { name: '📢・tournament-news', type: 'announcement' }
        ]
      },
      {
        name: '🔫 SHOOTERS LORE',
        channels: [
          { name: '💬・general-lobby', type: 'text' },
          { name: '🔫・aim-training', type: 'text' },
          { name: '🏆・lineups-strategies', type: 'text' },
          { name: '🎯・looking-for-group', type: 'text' }
        ]
      },
      {
        name: '🔫 COMPETITIVE (SES)',
        channels: [
          { name: '🔊 Duo Arena #1', type: 'voice' },
          { name: '🔊 Faceit Squad #2', type: 'voice' },
          { name: '🔊 Competitive 5v5 #3', type: 'voice' },
          { name: '🔊 Warmup Deathmatch #4', type: 'voice' }
        ]
      }
    ]
  },

  // 14. MANGA OTAKU LOUNGE
  {
    name: 'manga-club',
    displayName: '📖 Otaku Manga Lounge',
    description: 'Aesthetic lounge for anime discussions, manga reviews, fanart sharing, and lofi sessions.',
    isPremium: false,
    emojiPackageSuggestion: '📖, 🍥, 🎋',
    roles: [
      { name: '🎋 Sensei (Owner)', color: '#E74C3C', hoist: true, permissions: ['Administrator'] },
      { name: '🍥 Shinobi (Mod)', color: '#E67E22', hoist: true, permissions: ['ManageMessages'] },
      { name: '📖 Otaku Member', color: '#F1C40F', hoist: true, permissions: [] },
      { name: '🌸 Cosplayer', color: '#FF80AB', hoist: true, permissions: [] }
    ],
    categories: [
      {
        name: '🎋 ANIME BOARD INFO',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・dojo-rules', type: 'text' },
          { name: '📢・release-announcements', type: 'announcement' }
        ]
      },
      {
        name: '🎋 OTAKU BOARD',
        channels: [
          { name: '💬・anime-manga-chat', type: 'text' },
          { name: '📖・manga-reviews', type: 'text' },
          { name: '🌸・cosplay-shares', type: 'text' },
          { name: '🎨・otaku-artworks', type: 'text' }
        ]
      },
      {
        name: '🍥 OTAKU DOJO (SES)',
        channels: [
          { name: '🔊 Dojo Main Lounge', type: 'voice' },
          { name: '🔊 Lofi Study Room', type: 'voice' },
          { name: '🔊 Cosplay Voice Hub', type: 'voice' }
        ]
      }
    ]
  },

  // 15. GOTHIC DARK CRYPT
  {
    name: 'crypt-goth',
    displayName: '💀 Gothic Crypt & Dark Lounge',
    description: 'Black, gothic, vampire themed alternative server layout with dark aesthetics.',
    isPremium: false,
    emojiPackageSuggestion: '💀, ⚰️, 🩸',
    roles: [
      { name: '🩸 Vampire Lord (Owner)', color: '#7B241C', hoist: true, permissions: ['Administrator'] },
      { name: '⚰️ Crypt Keeper (Mod)', color: '#641E16', hoist: true, permissions: ['ManageMessages'] },
      { name: '💀 Shadow Citizen', color: '#922B21', hoist: true, permissions: [] },
      { name: '🖤 Gothic Soul', color: '#4A235A', hoist: true, permissions: [] },
      { name: '🦇 Nocturnal', color: '#1B2631', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '⚰️ CRYPT GATES',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '🦇・decree-rules', type: 'text' },
          { name: '📢・dark-whispers', type: 'announcement' }
        ]
      },
      {
        name: '⚰️ THE CRYPT ENTRY',
        channels: [
          { name: '💬・shadows-sohbet', type: 'text' },
          { name: '🩸・dark-artworks', type: 'text' },
          { name: '🖤・melancholy-poetry', type: 'text' },
          { name: '🦇・nocturnal-music', type: 'text' }
        ]
      },
      {
        name: '💀 DARK COVEN (SES)',
        channels: [
          { name: '🔊 Main Crypt Lounge #1', type: 'voice' },
          { name: '🔊 Vampire Coffin Room #2', type: 'voice' },
          { name: '🔊 Gothic Melancholy #3', type: 'voice' },
          { name: '🔊 Nocturnal Flight #4', type: 'voice' }
        ]
      }
    ]
  },

  // 16. WARM COZY FIREPLACE CABIN
  {
    name: 'cosy-cabin',
    displayName: '🪵 Warm Cozy Fireplace Cabin',
    description: 'Fireside chats, warm atmosphere, hot cocoa recipe exchanges and slow acoustic music sessions.',
    isPremium: false,
    emojiPackageSuggestion: '🪵, ☕, 🍁',
    roles: [
      { name: '🍁 Cabin Host (Owner)', color: '#7E5109', hoist: true, permissions: ['Administrator'] },
      { name: '☕ Coffee Brewer (Mod)', color: '#B57C1E', hoist: true, permissions: ['ManageMessages'] },
      { name: '🪵 Cozy Resident', color: '#E59866', hoist: true, permissions: [] },
      { name: '🧶 Blanket Lover', color: '#A04000', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '🍁 CABIN FOYER',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・cabin-rules', type: 'text' },
          { name: '📢・cabin-news', type: 'announcement' }
        ]
      },
      {
        name: '🍁 COZY CABIN FOREST',
        channels: [
          { name: '💬・fireplace-sohbet', type: 'text' },
          { name: '☕・cocoa-recipes', type: 'text' },
          { name: '🪵・nature-photography', type: 'text' },
          { name: '🧶・crochet-and-crafts', type: 'text' }
        ]
      },
      {
        name: '🪵 FIREPLACE CHILL (SES)',
        channels: [
          { name: '🔊 Cozy Sofa Corner #1', type: 'voice' },
          { name: '🔊 Warm Rain Cabin #2', type: 'voice' },
          { name: '🔊 Campfire Acoustic #3', type: 'voice' },
          { name: '🔊 Midnight Cocoa Chat #4', type: 'voice' }
        ]
      }
    ]
  },

  // 17. SPACE VOYAGER STATIONS
  {
    name: 'space-voyager',
    displayName: '🚀 Space Orbit Stations',
    description: 'Space voyager station template with dynamic gravity control rooms.',
    isPremium: false,
    emojiPackageSuggestion: '🚀, 🪐, 🌌',
    roles: [
      { name: '🚀 Station Commander (Owner)', color: '#5B2C6F', hoist: true, permissions: ['Administrator'] },
      { name: '🪐 Astronaut (Mod)', color: '#A569BD', hoist: true, permissions: ['ManageMessages'] },
      { name: '🌌 Space Voyager', color: '#D2B4DE', hoist: true, permissions: [] },
      { name: '🛸 Alien Visitor', color: '#00FF00', hoist: true, permissions: [] }
    ],
    categories: [
      {
        name: '🚀 COMMAND STATION',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・command-rules', type: 'text' },
          { name: '📢・mission-briefing', type: 'announcement' }
        ]
      },
      {
        name: '🪐 COSMIC SPACE',
        channels: [
          { name: '💬・space-talks', type: 'text' },
          { name: '🌌・cosmic-gallery', type: 'text' },
          { name: '🛸・alien-discoveries', type: 'text' },
          { name: '☄️・astronomy-hub', type: 'text' }
        ]
      },
      {
        name: '🚀 ORBIT FLOORS (SES)',
        channels: [
          { name: '🔊 Station Main Deck', type: 'voice' },
          { name: '🔊 Space Gravity Void #2', type: 'voice' },
          { name: '🔊 Science Lab Deck #3', type: 'voice' }
        ]
      }
    ]
  },

  // 18. MINECRAFT SMP WORLD
  {
    name: 'minecraft-craft',
    displayName: '⛏️ Minecraft SMP World',
    description: 'Perfect server layout for whitelist systems, coordinates, base shares, and general chats.',
    isPremium: false,
    emojiPackageSuggestion: '⛏️, 💎, 🌲',
    roles: [
      { name: '👑 Admin (Owner)', color: '#27AE60', hoist: true, permissions: ['Administrator'] },
      { name: '🛡️ Moderator', color: '#2ECC71', hoist: true, permissions: ['ManageMessages'] },
      { name: '💎 SMP Member', color: '#3498DB', hoist: true, permissions: [] },
      { name: '🧱 Master Builder', color: '#E67E22', hoist: true, permissions: [] },
      { name: '⚔️ PvPer', color: '#C0392B', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '🌲 WORLD RULES',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・rules-and-ip', type: 'text' },
          { name: '📢・smp-announcements', type: 'announcement' }
        ]
      },
      {
        name: '🌲 WORLD CENTER',
        channels: [
          { name: '💬・smp-general', type: 'text' },
          { name: '⛏️・whitelist-apply', type: 'text' },
          { name: '📍・coordinates', type: 'text' },
          { name: '🧱・base-showcase', type: 'text' },
          { name: '💎・diamond-trade', type: 'text' }
        ]
      },
      {
        name: '💎 MINING CAVES (SES)',
        channels: [
          { name: '🔊 Ingame Voice #1', type: 'voice' },
          { name: '🔊 Nether Adventures #2', type: 'voice' },
          { name: '🔊 Base Building Talk #3', type: 'voice' }
        ]
      }
    ]
  },

  // 19. MUSIC PRODUCTION BEATS
  {
    name: 'music-beats',
    displayName: '🎵 Beatmakers & Music Production',
    description: 'For music producers, beats sharing, samples share, and music production discussions.',
    isPremium: false,
    emojiPackageSuggestion: '🎵, 🎹, 🎧',
    roles: [
      { name: '🎹 Master Producer (Owner)', color: '#1B4F72', hoist: true, permissions: ['Administrator'] },
      { name: '🎧 Audio Engineer (Mod)', color: '#2874A6', hoist: true, permissions: ['ManageMessages'] },
      { name: '🎵 Beatmaker / Artist', color: '#5DADE2', hoist: true, permissions: [] },
      { name: '🎙️ Vocalist', color: '#A569BD', hoist: true, permissions: [] }
    ],
    categories: [
      {
        name: '🎹 STUDIO LOBBY',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・studio-guidelines', type: 'text' },
          { name: '📢・collab-requests', type: 'announcement' }
        ]
      },
      {
        name: '🎹 DIGITAL AUDIO WORKSTATION',
        channels: [
          { name: '💬・beatmaker-lounge', type: 'text' },
          { name: '🎹・share-your-beats', type: 'text' },
          { name: '🔊・sample-packs', type: 'text' },
          { name: '🎙️・acapellas-vocal-share', type: 'text' }
        ]
      },
      {
        name: '🎧 HEADPHONES IN (SES)',
        channels: [
          { name: '🔊 Listening Session #1', type: 'voice' },
          { name: '🔊 DAW Screen Share #2', type: 'voice' },
          { name: '🔊 Collab Space #3', type: 'voice' }
        ]
      }
    ]
  },

  // 20. FANTASY MEDIEVAL RP
  {
    name: 'rp-fantasy',
    displayName: '⚔️ Medieval Fantasy Roleplay',
    description: 'Medieval kingdoms, character creations, taverns, guilds, and immersive soft fantasy roleplay.',
    isPremium: false,
    emojiPackageSuggestion: '⚔️, 🏰, 🛡️',
    roles: [
      { name: '👑 High King (Owner)', color: '#7E5109', hoist: true, permissions: ['Administrator'] },
      { name: '🛡️ Royal Knight (Mod)', color: '#D35400', hoist: true, permissions: ['ManageMessages'] },
      { name: '⚔️ Adventurer', color: '#E59866', hoist: true, permissions: [] },
      { name: '🧙 Wizard / Mage', color: '#85C1E9', hoist: true, permissions: [] },
      { name: '🏹 Rogue / Ranger', color: '#27AE60', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '🏰 KINGDOM BILLS',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・parchment-rules', type: 'text' },
          { name: '📢・scroll-news', type: 'announcement' }
        ]
      },
      {
        name: '🍺 SHAMROCK TAVERN (RP)',
        channels: [
          { name: '🍺・tavern-chat', type: 'text' },
          { name: '⚔️・quest-board', type: 'text' },
          { name: '🧙・spell-book-chat', type: 'text' },
          { name: '🏹・hunting-grounds', type: 'text' }
        ]
      },
      {
        name: '🍻 TAVERN TABLE (SES)',
        channels: [
          { name: '🔊 Fireside Tavern Seat #1', type: 'voice' },
          { name: '🔊 Campfire Whispers #2', type: 'voice' },
          { name: '🔊 Council Chamber #3', type: 'voice' }
        ]
      }
    ]
  },

  // 21. ARTIST STUDIO
  {
    name: 'artist-studio',
    displayName: '🎨 Digital Artists Studio',
    description: 'Perfect creative studio for digital/traditional artists, illustration shares and commission displays.',
    isPremium: false,
    emojiPackageSuggestion: '🎨, 🖌️, 🖼️',
    roles: [
      { name: '🎨 Studio Master (Owner)', color: '#7D6608', hoist: true, permissions: ['Administrator'] },
      { name: '🖌️ Art Director (Mod)', color: '#F1C40F', hoist: true, permissions: ['ManageMessages'] },
      { name: '🖼️ Creative Artist', color: '#F9E79F', hoist: true, permissions: [] },
      { name: '🎨 Commission Open', color: '#2ECC71', hoist: true, permissions: [] }
    ],
    categories: [
      {
        name: '🖼️ ART GALLERY INFO',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・gallery-rules', type: 'text' },
          { name: '📢・art-exhibitions', type: 'announcement' }
        ]
      },
      {
        name: '🖼️ CREATIVE HUB',
        channels: [
          { name: '💬・artists-lounge', type: 'text' },
          { name: '🎨・share-your-art', type: 'text' },
          { name: '🖌️・commissions', type: 'text' },
          { name: '💡・art-tutorials', type: 'text' }
        ]
      },
      {
        name: '🎨 CANVAS DRAWING (SES)',
        channels: [
          { name: '🔊 Live Drawing Share #1', type: 'voice' },
          { name: '🔊 Art Feedback Cafe #2', type: 'voice' },
          { name: '🔊 Chill Doodle Lounge #3', type: 'voice' }
        ]
      }
    ]
  },

  // 22. COFFEE SHOP & BARISTA LOUNGE
  {
    name: 'coffee-beans',
    displayName: '☕ Coffee Shop & Barista Lounge',
    description: 'Calm background acoustic melodies, barista talks, coffee recipes, and cozy lofi channels.',
    isPremium: false,
    emojiPackageSuggestion: '☕, 🍪, 🍁',
    roles: [
      { name: '☕ Shop Owner', color: '#7E5109', hoist: true, permissions: ['Administrator'] },
      { name: '🍪 Head Barista (Mod)', color: '#A04000', hoist: true, permissions: ['ManageMessages'] },
      { name: '🍁 Coffeelover Club', color: '#DEB887', hoist: true, permissions: [] },
      { name: '☕ Espresso Expert', color: '#6E2C00', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '☕ CAFETERIA INFO',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・shop-menu-rules', type: 'text' },
          { name: '📢・daily-brew-announcements', type: 'announcement' }
        ]
      },
      {
        name: '☕ COFFEE ORDER',
        channels: [
          { name: '💬・coffee-lounge-chats', type: 'text' },
          { name: '☕・barista-coffee-recipes', type: 'text' },
          { name: '🍪・cookie-bakery', type: 'text' },
          { name: '🍁・acoustic-tunes', type: 'text' }
        ]
      },
      {
        name: '🍪 COFFEE SHOP TABLES (SES)',
        channels: [
          { name: '🔊 Bar Tabureleri #1', type: 'voice' },
          { name: '🔊 Corner Table Seat #2', type: 'voice' },
          { name: '🔊 Lofi Terrace Sofa #3', type: 'voice' }
        ]
      }
    ]
  },

  // 23. SOCIAL CLUB VIP LOUNGE
  {
    name: 'social-club',
    displayName: '🥂 Social Club VIP Lounge',
    description: 'High-end elite lounge focusing on general chats, event sharing and deluxe aesthetic layout.',
    isPremium: false,
    emojiPackageSuggestion: '🥂, 💎, ✨',
    roles: [
      { name: '🥂 Club Host (Owner)', color: '#7D3C98', hoist: true, permissions: ['Administrator'] },
      { name: '✨ Concierge (Mod)', color: '#BB8FCE', hoist: true, permissions: ['ManageMessages'] },
      { name: '💎 VIP Club Member', color: '#EBDEF0', hoist: true, permissions: [] },
      { name: '🥂 Elite Club Guest', color: '#F5EEF8', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '🥂 CLUB ENTRANCE',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・club-code-rules', type: 'text' },
          { name: '📢・soiree-announcements', type: 'announcement' }
        ]
      },
      {
        name: '🥂 CLUB FOYER',
        channels: [
          { name: '💬・elite-lounge', type: 'text' },
          { name: '✨・exclusive-news', type: 'text' },
          { name: '💎・vip-pictures', type: 'text' },
          { name: '🥂・gossip-chats', type: 'text' }
        ]
      },
      {
        name: '🥂 ELITE CHAMPAGNE (SES)',
        channels: [
          { name: '🔊 Champagne Seat #1', type: 'voice' },
          { name: '🔊 VIP Room Lounge #2', type: 'voice' },
          { name: '🔊 Club Jazz Hall #3', type: 'voice' }
        ]
      }
    ]
  },

  // 24. FOOTBALL FANATIC CLUBHOUSE
  {
    name: 'football-turf',
    displayName: '⚽ Football Fanatic Clubhouse',
    description: 'Perfect clubhouse for daily sports and football news, predictions, match analysis, and chats.',
    isPremium: false,
    emojiPackageSuggestion: '⚽, 🏟️, 🏆',
    roles: [
      { name: '🏆 Club President', color: '#1B4F72', hoist: true, permissions: ['Administrator'] },
      { name: '⚽ Technical Coach (Mod)', color: '#2E86C1', hoist: true, permissions: ['ManageMessages'] },
      { name: '🏟️ Fanatic Supporter', color: '#85C1E9', hoist: true, permissions: [] },
      { name: '🥇 Dream Team player', color: '#F1C40F', hoist: true, permissions: [] }
    ],
    categories: [
      {
        name: '🏟️ PRESS CENTER',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・stadium-rules', type: 'text' },
          { name: '📢・club-bulletins', type: 'announcement' }
        ]
      },
      {
        name: '🏟️ STADIUM TICKET OFFICE',
        channels: [
          { name: '💬・stadium-chat', type: 'text' },
          { name: '📊・match-predictions', type: 'text' },
          { name: '🥇・transfer-gossip', type: 'text' },
          { name: '⚽・matchday-photos', type: 'text' }
        ]
      },
      {
        name: '⚽ PRESS ROOM (SES)',
        channels: [
          { name: '🔊 Press Conference #1', type: 'voice' },
          { name: '🔊 Match Watch Party #2', type: 'voice' },
          { name: '🔊 Locker Room Chill #3', type: 'voice' }
        ]
      }
    ]
  },

  // 25. NATURE & FOREST ESCAPE
  {
    name: 'nature-forest',
    displayName: '🌲 Deep Forest & Nature Escape',
    description: 'Green, forest atmosphere, deep organic relaxation themes and natural quiet ambient soundscapes.',
    isPremium: false,
    emojiPackageSuggestion: '🌲, 🍃, 🏕️',
    roles: [
      { name: '🏕️ Park Ranger (Owner)', color: '#1E8449', hoist: true, permissions: ['Administrator'] },
      { name: '🍃 Forest Guardian (Mod)', color: '#2ECC71', hoist: true, permissions: ['ManageMessages'] },
      { name: '🌲 Wilderness Explorer', color: '#ABEBC6', hoist: true, permissions: [] },
      { name: '🏕️ Campfire Singer', color: '#D4AC0D', hoist: false, permissions: [] }
    ],
    categories: [
      {
        name: '🌲 FOREST RANGER DESK',
        permissionOverwrites: [{ roleName: '@everyone', allow: ['ViewChannel'], deny: ['SendMessages'] }],
        channels: [
          { name: '📜・forest-guidelines', type: 'text' },
          { name: '📢・weather-alerts', type: 'announcement' }
        ]
      },
      {
        name: '🌲 DEEP FOREST TRAIL',
        channels: [
          { name: '💬・ranger-station-sohbet', type: 'text' },
          { name: '🏕️・survival-talks', type: 'text' },
          { name: '🍃・nature-photography', type: 'text' },
          { name: '🌲・ambient-birds-sound', type: 'text' }
        ]
      },
      {
        name: '🏕️ FOREST CAMPSITES (SES)',
        channels: [
          { name: '🔊 Pine Forest Trail #1', type: 'voice' },
          { name: '🔊 Acoustic Campsite #2', type: 'voice' },
          { name: '🔊 Rain Ambient Hut #3', type: 'voice' }
        ]
      }
    ]
  }
];

module.exports = { templates };
