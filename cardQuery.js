const hb = require('./HorrorBot.js');

module.exports = {
    name : 'hb',
    description : 'Searches ArkhamDB for cards',
    execute(message, args) {
        message.channel.send(hb.respondWithCard(args[0]));
    }
};