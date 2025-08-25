const path = require('path');
const { Client, GatewayIntentBits, Events } = require('discord.js');
const { text } = require('./config/text.js');
const handlers = require('./events/commonHandlers.js');
const logger = require('./utils/logger');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Validate token exists in env file
if (!process.env.DISCORD_TOKEN) {
    logger.error('DISCORD_TOKEN not found in environment variables');
    process.exit(1);
}

// Initialise client and its intents
const atom = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Event handlers
atom.on(Events.ClientReady, () => handlers.ready(atom));
atom.on(Events.MessageCreate, (message) => handlers.message(message, atom));

// Start the bot
atom.login(process.env.DISCORD_TOKEN).catch(error => {
    logger.error(`${text.Logon.Failed} ${error}`);
    process.exit(1);
});