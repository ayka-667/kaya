const Discord = require("discord.js")

exports.help = {
    name: "lock",
    category: 'mods',
  };
  
exports.run = async (bot, message, args) => { 
    if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Gérer les salons.**`)

        return message.reply({ embeds: [embed] })
    } else {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel && args[0]) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("**❌ Vous devez mentionner un salon.**")
            return message.reply({ embeds: [embed]})
        } else {
            channel = channel || message.channel
            if(channel.name.startsWith("🔒")) {
                const embed = new Discord.EmbedBuilder()
                .setColor("Blue")
                .setDescription(`ℹ️ ⁠${channel} est déjà verrouillé.`)
                return message.reply({ embeds: [embed]})
            }
            try {
                await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                    SendMessages: false,
                });
                const embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`**✅ ${channel} a bien été verrouillé.**`)
                channel.edit({ name: `🔒-${channel.name}` })
                message.reply({ embeds: [embed]})
                bot.db.query(`SELECT * FROM logs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if(req.length < 1) return

                    const embed = new Discord.EmbedBuilder()
                    .setDescription(`Le salon ${channel} \`🔒-${channel.name}\` a été verrouillé.`)
                    .setFooter({ text: `ID du salon : ${message.channel.id}`})
                    .setTitle("Salon verrouillé")
                    .setColor("Orange")
                    .setTimestamp()
                    .addFields(
                        { name: "Modérateur :", value: `> ${message.member} **@${message.author.username}**`},
                    )

                    const channel2 = message.guild.channels.cache.get(req[0].channelMods)
                    if(channel2) channel2.send({ embeds: [embed]})
                })
            } catch (error) {
                const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription(`**❌ Je n'ai pas les permissions de verrouiller le salon ${channel}.**`)
                return message.reply({ embeds: [embed]})
            }
        }
    }
}