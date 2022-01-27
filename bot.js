require('dotenv').config();
const axios = require('axios');
const tmi = require('tmi.js');
const { password, get } = require('tmi.js/lib/utils');

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);
async function getRank(){
    try
    {
        res = await axios.get(`https://api.kyroskoh.xyz/valorant/v1/mmr/ap/${process.env.RIOT_ACCOUNT_NAME}/${process.env.RIOT_TAGS}`)
        resData = res.data
        console.log(typeof(resData))
        rank=resData
        return JSON.stringify(resData) 
    }
    catch (e){
        console.log(e.message)
    }
}
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
        'response' : `phaiez's rank : `
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
            if(textCommand == 'rank'){
                (async ()=>{
                    tag= `@${tags['display-name']} `
                    resMessage = commands[textCommand]['response']
                    rank = await getRank()
                    client.say(channel,tag+resMessage+rank)
                })();
            }
            else{
                resMessage = commands[textCommand]['response']
                client.say(channel,resMessage)
            }
        }
        catch(e){
            console.log(e.message)
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
			