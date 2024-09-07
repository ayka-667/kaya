const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Afficher l\'invitation du bot.',
    permission: "Aucune",
    dm: false,
    async run(bot, message, args) {
    const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: `Ajoutez ${bot.user.username} à votre serveur !`, url: "http://discord.nekohost.fr/", iconURL: bot.user.displayAvatarURL({ dynamic: true })})
    .setColor('White')

    const bouton1 = new Discord.ButtonBuilder()
    .setStyle('Link')
    .setLabel(`Inviter ${bot.user.username}`)
    .setEmoji('🧨')
    .setURL(`https://discord.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot%20applications.commands&permissions=-1`);
    const bouton2 = new Discord.ButtonBuilder()
    .setStyle('Link')
    .setLabel(`Serveur support`)
    .setEmoji('<:dev:1145032258508570634>')
    .setURL('http://discord.nekohost.fr/');
    const bouton3 = new Discord.ButtonBuilder()
    .setStyle('Link')
    .setLabel(`Site internet`)
    .setEmoji('🔗')
    .setURL('https://kaya.nekohost.fr/');

    const row = new Discord.ActionRowBuilder().addComponents(bouton1, bouton2, bouton3);

    message.reply({ embeds: [embed], components: [row] })
    }
}