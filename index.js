let tokenFile = require("./TOKEN.js")
const Discord = require("discord.js");
let commands = require("./commands.js");
let radar = require("./radar.js");
let help = require("./help.js");
let xo = require("./xo.js");
let shouldI = require("./shouldi.js");
const TOKEN = tokenFile.TOKEN;

/* Create a client and login */
let atom = new Discord.Client();
atom.login(TOKEN);

/* Variables and Constants */
let prefix = '::';

/* Indicates that the bot has successfully started. */
atom.on("ready", () => {
    console.log(`AtomBot was succesfully started... Ping: ${atom.ping}ms.`);
});

/* Logs messages sent by users to the console. */
atom.on("message", (message) => {
    console.log(`[INFO] Message recieved: ${message.content} | from ${message.author.username} in ${message.channel.name} at ${message.createdAt}.`);
});

/* Checks if the user is writing a command */
atom.on("message", message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix)) {
        commands.checkCommand(message, atom);
    }
});