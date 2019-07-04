const _ = require('lodash');
const Discord = require('discord.js');
const auth = require('./auth.json');
const cardQuery = require('./cardQuery.js');
const client = new Discord.Client();
const prefix = '!';

client.commands =  new Discord.Collection();

client.commands.set(cardQuery.name, cardQuery);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (!_.startsWith(message.content, prefix) || message.author.bot){ return; }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    client.commands.get(command).execute(message, args);
});

client.login(auth.token);