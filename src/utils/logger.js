const constants = require('../config/constants.js');

const logger = {
    info: (message) => console.log(`[${constants.LOG_LEVELS.INFO}] ${message}`),
    error: (message) => console.error(`[${constants.LOG_LEVELS.ERROR}] ${message}`),
    warn: (message) => console.warn(`[${constants.LOG_LEVELS.WARNING}] ${message}`),
    logMessage: (message) => {
        logger.info(
            `[${constants.LOG_LEVELS.TEXT}] [${message.channel.guild.name}] ${message.author.username}: ${message.content} | ` +
            `{${message.channel.name} at ${message.createdAt}}.`
        );
    }
};

module.exports = logger;