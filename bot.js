const _ = require('lodash');
const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const HorrorBot = require('./HorrorBot.js');
let horrorBot = {};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    horrorBot = new HorrorBot();
});

client.on('message', msg => {
    if (!message.content.startsWith(prefix) || message.author.bot){ return; }

    if (_.includes(msg.content, '!card')) {
        msg.reply(horrorBot.respondWithCard(msg.content));
    }
});

client.login(auth.token);