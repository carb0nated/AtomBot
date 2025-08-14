const { TOKEN } = require('../TOKEN.js');
const { Client } = require('discord.js');
const { text } = require('./config/text.js');
const handlers = require('./events/commonHandlers.js');
const logger = require('./utils/logger');
const atom = new Client();

// Event handlers
atom.on('ready', () => handlers.ready(atom));
atom.on('message', (message) => handlers.message(message, atom));

// Start the bot
atom.login(TOKEN).catch(error => {
    logger.error(`${text.Logon.Failed} ${error}`);
    process.exit(1);
});