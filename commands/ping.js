module.exports.checkHumanLang = (args) => { return false; }
module.exports.description = "Reply with pong";
module.exports.exec = (appData, message, args) => {
	message.reply("pong!");
}