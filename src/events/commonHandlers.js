const { PREFIX, ACTIVITY } = require('../config/constants.js');
const logger = require('../utils/logger.js');
const { checkCommand } = require('../commands/commands.js');
const Text = require('../config/text.js');

const handlers = {
    ready: (client) => {
        client.user.setActivity(ACTIVITY.message, { type: ACTIVITY.type });
        logger.info(Text.StartupSuccess);
    },

    message: (message, client) => {
        logger.logMessage(message);
        
        if (!message.author.bot && message.content.startsWith(PREFIX)) {
            checkCommand(message, client);
        }
    }
};

module.exports = handlers;