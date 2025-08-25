const { EmbedBuilder } = require('discord.js');

module.exports = {
    help: function(message) { 
        help(message);
    },
    status: function(message, atom) {
        status(message, atom);
    }, 
    ping: function(message, atom) {
        ping(message, atom);
    },
    xo: function(message) {
        xo(message);
    }
};


function help(message) {
    let helpList = `
[Help] AtomBot Help Menu
Version 0.1.0
A list of commands AtomBot is capable of:
-------------------------------------------

**[Radar]**
::radar [city]
Displays the latest radar image for a specific city. Works for major Australian cities only.
::radar cities
Returns all the supported cities. If your city is not here, ask us to add it.


**[XO]**
::xo [player1] [player2] [random start? Y|N]
Starts a game of XO between player1 and player2 (case-sensitive usernames), with an option of a random starting player (type in Y or N).
It is recommended that you create a special channel for XO games so that you and other users won't be disturbed, however, that is optional. 

::xo play [index]
Make your move! Enter the index of the cell you would like to choose as shown below:
/-----------\
| 0 | 1 | 2 |
|-----------|
| 3 | 4 | 5 |
|-----------|
| 6 | 7 | 8 |
\-----------/
For example,  **::xo play 4**   will mark the cell '4' with either X or O, depending on your symbol.


**[Status]**
::status
Returns the version, ping and status of the bot.


**[Ping]**
::ping
Returns the ping of the bot.


**[Should I?]**
::shouldi [question]
Not sure what to do? Ask AtomBot! 
The outcome is completely random and you should not take it seriously. Your question is never taken into account.


**[Weather]**
::weather [city]
Gives you the latest update on your city's weather! This services recieves data through the weather-js package.


**[Help]**
::help
Displays the help menu with a list of all available commans.

More will be coming soon! Send me your ideas!
`;

    message.channel.send(helpList);
}



function status(message, atom) {
    message.reply('Fetching status...').then(sent => {
        const embed = new EmbedBuilder()
            .setColor('#00ff55')
            .setTitle('📊 Status')
            .addFields([
                { name: 'Version', value: '0.2.1' },
                { name: 'Ping', value: `${atom.ws.ping}ms` },
                { name: 'Status', value: `${atom.user.presence.status}` }
            ])
            .setTimestamp();

        sent.edit({ content: null, embeds: [embed] });
    });
}

function ping(message, atom) {
    message.reply('Pinging...').then(sent => {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('🏓 Pong!')
            .addFields([
                { name: 'Latency', value: `${sent.createdTimestamp - message.createdTimestamp}ms` },
                { name: 'API Latency', value: `${Math.round(atom.ws.ping)}ms` }
            ])
            .setTimestamp();

        sent.edit({ content: null, embeds: [embed] });
    });
}

function xo(message) {
    message.channel.send(`
**[XO]**
::xo [player1] [player2] [random start? Y|N]
Starts a game of XO between player1 and player2 (case-sensitive usernames), with an option of a random starting player (type in Y or N).
It is recommended that you create a special channel for XO games so that you and other users won't be disturbed, however, that is optional. 

::xo play [index]
Make your move! Enter the index of the cell you would like to choose as shown below:
/-----------\
| 0 | 1 | 2 |
|-----------|
| 3 | 4 | 5 |
|-----------|
| 6 | 7 | 8 |
\-----------/
For example,  **::xo play 4**   will mark the cell '4' with either X or O, depending on your symbol.
    `);
}