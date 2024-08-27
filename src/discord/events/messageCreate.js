const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  execute(message) {
    const { content } = message;
    const { globalName } = message.author;
    console.log(`User ${globalName} sent the message ${content}`);

    if (!message.author.bot) {
      message.reply('Replying!');
    }
  }
}
