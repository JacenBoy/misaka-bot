module.exports = async (client, oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  client.logger.log(`${oldMessage.author.username} (${oldMessage.author.id}) deleted message ${oldMessage.id}:\n\t"${oldMessage.content}"`);
  client.logger.log(`${newMessage.author.username} (${newMessage.author.id}) replaced message ${newMessage.id}:\n\t"${newMessage.content}"`);
};