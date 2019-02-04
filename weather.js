const index = require("./index.js");
const Discord = require("discord.js");
const help = require("./help.js");
const weather = require("weather-js");

module.exports = {
    main: function(message) { 
        main(message);
    }
};

function main(message) {
    getWeather(message);
}

function getWeather(message) {
    weather.find({search: message.content.substring(10), degreeType: 'C'}, (err, result) => {
        if (err) {
            message.channel.send(err);
        }

        var current = result[0].current;
        var location = result[0].location;
        var forecast = result[1].forecast;
        const embed = new Discord.RichEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(0x00AE86)
            .addField('Date', `${current.date}`)
            .addField('Timezone',`UTC${location.timezone}`, true)
            .addField('Temperature', `${current.temperature} C`, true)
            .addField('Feels Like', `${current.feelslike} C`, true)
            .addField('Winds',current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)
            //.addField('Chance of Precipitation', `${forecast.precip}%`, true)
        message.channel.send({embed});
    });
}