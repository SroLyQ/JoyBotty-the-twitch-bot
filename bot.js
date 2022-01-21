require('dotenv').config();

const tmi = require('tmi.js');
const { password } = require('tmi.js/lib/utils');

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

const commands = {
    'author' : {
        'response' : 'It\'s a me Mario'
    },
    'joy' : {
        'response' : 'Joy so Cute <3 TearGlove'
    },
    'sens' : {
        'response' : 'DPI : 800 Valorant : 0.45'
    },
    'rank' : {
        'response' : 'Platinum 3'
    },
    'setup' : {
        'response' : 'Monitor : zowie 144hz xl2411p \n\rCPU : i7 12700KF GPU : GTX1070 RAM : ddr5 16GB \n\rKeyboard : tofu65 acrylic switches : holypanda \n\rMouse : gpro x superlight \n\rMousepad : vaxee pa winter 21'   
    }
}

const client = new tmi.Client({
	connection:{
        reconnect: true
    },
    channels: [ 'phaiez_' ],
    identity:{
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    }
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	// "Alca: Hello, World!"
    const isNotBot = tags.username.toLowerCase() !== process.env.BOT_USERNAME;
    if(!isNotBot) return;

    if(message.startsWith('!')){
        textCommand = message.split('!')[1]
        resMessage = ''
        try{
            resMessage = commands[textCommand]['response']
        }
        catch(e){
            console.log(e.message)
        }
        if(resMessage == ''){
            return;
        }
        else{
            client.say(channel,resMessage)
        }
    }

    else if(message.includes('joy') || message.includes('จอย') || message.includes('Joy')){
        client.say(channel,'Joy is my cute little old friend. <3 bleedPurple')
    }
    //const[raw,command,argument] = message.match(regexpCommand);

    //const commandToExe = commands[command] || {};
    /*
    if (typeof response == 'function'){
        client.say(channel, response(tags.username))
    }
    else if(typeof response == 'string'){
        client.say(channel,response);
    }
    */
	console.log(`${tags['display-name']}: ${message}`);
});
			