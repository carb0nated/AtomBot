const { ActivityType } = require('discord.js');
const { PREFIX, ACTIVITY } = require('../config/constants.js');
const logger = require('../utils/logger.js');
const { checkCommand } = require('../commands/commands.js');
const Text = require('../config/text.js');

const handlers = {
    ready: async (client) => {
        try
        {
            await client.user.setActivity(ACTIVITY.message, {
                type: ActivityType.Playing,
                name: "Testing!"
            });
            logger.info(Text.StartupSuccess);
        } catch (error) {
            logger.error(`Error setting activity: ${error}`);
        }
    },

    message: async (message, client) => {
        // log message incoming from user
        logger.logMessage(message);
        
        // if its not by the bot and it starts with the prefix, check the command and act on it
        if (!message.author.bot && message.content.startsWith(PREFIX)) {
            try {
                checkCommand(message, client);
            } catch (error) {
                logger.error(`Error checking command: ${error}`);
            }
        }
    }
};

module.exports = handlers;