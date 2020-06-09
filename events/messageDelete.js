module.exports = async (client, message) => {
  if (message.author.bot) return;
  client.logger.log(`${message.author.username} (${message.author.id}) deleted message ${message.id}:\n\t"${message.content}"`);
};