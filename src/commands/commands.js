// Constants and privates
const COMMAND_PREFIX = '::';
const commandHandlers = {
    radar: require('./radar.js'),
    help: require('../help/help.js'),
    xo: require('./xo.js'),
    shouldi: require('./shouldi.js')
    // weather: require('./weather.js')
};

// Exports
module.exports = {
    checkCommand: handleCommand
};

/**
 * Handle incoming commands from users.
 * @param {*} message sent message object
 * @param {*} atom Discord client instance
 * @returns {void}
 * @description This function checks the content of the message for commands and executes the corresponding command handler.
 */
function handleCommand(message, atom) 
{
    const content = message.content;
    if (!content.startsWith(COMMAND_PREFIX)) return;

    const command = content.slice(COMMAND_PREFIX.length).split(' ')[0];

    switch (command) {
        case 'radar':
            commandHandlers.radar.radar(message);
            break;
        case 'help':
            commandHandlers.help.help(message);
            break;
        case 'status':
            commandHandlers.help.status(message, atom);
            break;
        case 'ping':
            commandHandlers.help.ping(message, atom);
            break;
        case 'xo':
            commandHandlers.xo.start(message, atom);
            break;
        case 'shouldi':
            commandHandlers.shouldi.run(message);
            break;
        default:
            message.channel.send('[Error] Invalid command. Type ::help for a list of commands.');
    }
}