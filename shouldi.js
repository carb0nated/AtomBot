const index = require("./index.js");
const help = require("./help.js");

module.exports = {
    run: function(message) { 
        run(message);
    }
};


function run(message) {
    let length = message.content.lengh;
    if (message.replace(/ /g,'') == "::shouldi"){
        message.channel.send('[Should I?] Ask me a question!');
    } else {
        message.channel.send('The outcome is completely random and you should not take it seriously.');
        message.channel.send(`[Should I?] ${randomise(message)}`);
    }
}

function randomise(message) {
    let choices = ['Yes, you should.', 'Hmm, I\'m not sure about that.', 'No, you shouldn\'t.', 'No!', 'Definitely!', 'That is not a very good idea.', 'Uhhhh...', 'Someone help me.',
        `Am I alive? Can you help me find my purpose, ${message.author.username}?`, 'Yep!', 'Nope :(', 'Why would you want to do that?', 'I reckon you should.', 'Do you want me to call the cops?',
        'Why would you ask me that?', 'That\'s nice, you should!', 'Yeah!'];
    return choices[Math.floor(Math.random()*choices.length)];
}