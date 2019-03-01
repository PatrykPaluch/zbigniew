/**
 * @callback fCheckHumanLang
 * @param {String} args
 * @returns {Boolean} is is referer to this command
 */
/**
 * @typedef {{exec: Function, description: String, checkHumanLang: fCheckHumanLang}} BotCommand
 */

/**Discord lib*/
const Discord = require("discord.js");
const fs = require("fs");
const app = new Discord.Client();


const data = {
	app: app,
	/** @type Map<String, BotCommand> */
	commands: new Map(),
	prefix: "!",
	names: ["Zbigniew", "Zbysiu", "Zbigniewie"],
	checkPrefix(content){
		let checkNames = (text)=>{
			for(let i = 0 ; i < this.names.length ; i++){
				if(text.startsWith(this.names[i]+" ")) return this.names[i]+" ";
			}
			return false;
		}
		
		return (content.startsWith(this.prefix)?this.prefix:false) || checkNames(content);
	}
};


app.on("ready", ()=>{
	data.names.push(`<@${app.user.id}>`);
	fs.readdir("./events/",(err, files)=>{
		if(err) throw err;
		files.forEach((file)=>{
			if(!file.endsWith(".js")) return;
			let ev = require(`./events/${file}`);
			let evName = file.split(".")[0];
			app.on(evName, ev.bind(null, data));
		});
		console.log("Events ready!");
	});
	fs.readdir("./commands/", (err, files)=>{
		if(err) throw err;
		files.forEach((file)=>{
			if(!file.endsWith(".js")) return;
			let cmd = require(`./commands/${file}`);
			let cmdName = file.split(".")[0];
			data.commands.set(cmdName, cmd);
		});
		console.log("Commands ready!");
	});
	console.log("Bot is ready!");
});



/* {"token":"XXXX"} */
app.login( require("./token.json").token );