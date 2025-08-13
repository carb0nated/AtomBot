const BOT_CONSTANTS = {
    PREFIX: '::',
    ACTIVITY: {
        type: 'LISTENING',
        message: '::help'
    },
    LOG_LEVELS: {
        INFO: 'INFO',
        ERROR: 'ERROR',
        WARN: 'WARN',
        TEXT: 'TEXT'
    },
    COMMAND: {
        RADAR: 'radar',
        HELP: 'help',
        SHOULDI: 'shouldi',
        XO: 'xo',
        WEATHER: 'weather',
        TIME: 'time'
    }
};

module.exports = BOT_CONSTANTS;