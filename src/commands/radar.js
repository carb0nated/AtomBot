const INDEX = require("../index.js");

module.exports = {
    radar: function(message) { 
        radar(message); 
    }
};

let cities = ['BRISBANE', 'SYDNEY', 'MELBOURNE', 'ADELAIDE', 'PERTH', 'DARWIN', 'HOBART', 'CAIRNS', 'CANBERRA'];
let code = ['IDR663', 'IDR713', 'IDR023', 'IDR643', 'IDR703', 'IDR633', 'IDR763', 'IDR193', 'IDR403'];

function radar(message) {
    let requestedCity = getRequestedCity(message).toUpperCase();

    if(requestedCity == '') {
        message.channel.send('[Radar] Incomplete command. Type ::help and look for **[Radar]** for more help.');
        return;
    }
    if (!cities.includes(requestedCity) && requestedCity == 'CITIES') {
        message.channel.send(`[Radar] A list of supported cities: ${cities}`);
    } else {
        console.log()
        let requestedCity = getRequestedCity(message).toUpperCase();
        if (cities.includes(requestedCity)) {
            let cityIndex = cities.indexOf(requestedCity);
            message.channel.send(`http://www.bom.gov.au/radar/${code[cityIndex]}.gif`)
        } else {
            message.channel.send(`[Radar] Sorry, the city ${requestedCity.toLowerCase()} was not found.`);
        }
    }
}

function getRequestedCity(message) {
    return message.content.substring(8);
};