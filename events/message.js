module.exports = (appData, message) => {
	// let Discord = require("discord.js");
	// /**@type Discord.Message */
	// let message;
	if(message.author.isBot) return;
	let prefixCheck = appData.checkPrefix(message.content)
	if(!prefixCheck) {
		for(let i = 0 ; i < appData.names.length ; i++){
			if( message.content.startsWith(appData.names[i].toLowerCase()) ){
				message.reply("Kultury trochę -.-");
				return;
			}
		}
		return;
	}
	let args = message.content.substr(prefixCheck.length).trim().split(/ +/g);
	let cmdName = args.shift().toLowerCase();
	let cmd = appData.commands.get(cmdName);
	if(cmd){
		cmd.exec(appData, message, args);
	}
}