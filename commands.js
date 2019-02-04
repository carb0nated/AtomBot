const INDEX = require("./index.js");
let radar = require("./radar.js");
let help = require("./help.js");
let xo = require("./xo.js");
let shouldI = require("./shouldi.js");
let weather = require("./weather.js");


module.exports = {
    checkCommand: function(message, atom) {
        checkCommand(message, atom);
    }
};

function checkCommand(message, atom) {
    if (message.content.startsWith('::radar')) {
        radar.radar(message);
    }
    else if (message.content.startsWith('::help')) {
        help.help(message);
    }
    else if(message.content.startsWith('::status')) {
        help.status(message, atom);
    }
    else if(message.content.startsWith('::ping')) {
        help.ping(message, atom);
    }
    else if(message.content.startsWith('::xo')) {
        xo.start(message, atom);
    }
    else if(message.content.startsWith('::shouldi')) {
        shouldI.run(message);
    }
    else if(message.content.startsWith('::weather')) {
        weather.main(message);
    }
    else {
        message.channel.send('[Error] Invalid command. Type ::help for a list of commands.')
    }
}