// The message event runs every time a message is received. This means
// that this is the file where our event handler is defined. This command
// handler is heavily inspired by Guide Bot.
// https://github.com/AnIdiotsGuide/guidebot

module.exports = async (client, message) => {
  // It's always best practice to have your bot ignore other bots. This
  // also prevents the bot from replying to itself.
  if (message.author.bot) return;

  // If the user pings the bot, send them the prefix.
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.channel.send(`My prefix is \`${client.config.prefix}\``);
  }

  // To avoid unecessary processing, ignore messages that don't start with
  // the prefix.
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // Now we separate the message into "command" and "arguments".
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // If the member on a guild is invisible or not cached, fetch them.
  if (message.guild && !message.member) await message.guild.members.fetch(message.author);

  // Now we check if the command or alias is defined in our collections.
  // If it is not, we'll just ignore the message.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (!cmd) return;

  // If the command cannot be run in DMs and the user tries to use it in a
  // DM, send them a helpful error message.
  if (!message.guild) return message.channel.send("You cannot run commands in DMs.");

  // Check to make sure the user has the correct permissions to run the
  // command and give a helpful error message if they don't.
  if (cmd.config.ownerOnly && message.author.id != client.config.ownerID) return message.channel.send("You do not have permission to run this command.");
  if (cmd.config.permissions.length > 0 && !message.member.hasPermission(cmd.config.permissions)) return message.channel.send("You do not have permission to run this command.");

  // If we've made it this far, it should be fine to run the command. Log
  // the attempt and run the command.
  // If the command exists, **AND** the user has permission, run it.
  client.logger.cmd(`[CMD] ${message.author.username} (${message.author.id}) ran command ${cmd.name}`);
  cmd.run(client, message, args);
};