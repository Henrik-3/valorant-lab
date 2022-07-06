import {uuidv4, getDB, embedBuilder, translations, axios, errorhandlerinteraction, roles, firstletter} from '../../methods.js';

export async function execute({interaction, args, guilddata} = {}) {
    await interaction.deferReply({ephemeral: true});
    switch (args[1]) {
        case 'generate': {
            const uuid = uuidv4();
            await getDB('state').insertOne({userid: interaction.user.id, guild: interaction.guildId, code: uuid, expireAt: new Date(), type: 'autorole'});
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: translations[guilddata.lang].link.link_generated_title,
                        desc: translations[guilddata.lang].link.link_generated_desc + `https://valorantlabs.xyz/v1/rso/redirect/${uuid}`,
                        footer: 'VALORANT LABS [LINK GENERATED]',
                    }),
                ],
            });
        }
        case 'update': {
            const link = await getDB('linkv2').findOne({userid: interaction.user.id});
            if (!link)
                return interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[guilddata.lang].link.nolink_title,
                            desc: translations[guilddata.lang].link.nolink_desc,
                            footer: 'VALORANT LABS [NO LINK V2]',
                        }),
                    ],
                });
            const mmr = await axios.get(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/${link.region}/${link.puuid}?asia=true`).catch(error => {
                return error;
            });
            if (mmr.response) return errorhandlerinteraction({interaction, status: mmr.response, type: 'mmr', lang: guilddata.lang, data: mmr.response.data});
            if (
                (mmr.data.data.current_data.currenttier == null || mmr.data.data.current_data.games_needed_for_rating != 0) &&
                guilddata.autoroles.some(i => i.name == 'verify' || i.name == 'unrated')
            ) {
                await interaction.member.roles.remove(guilddata.autoroles.filter(i => i.name != 'verify' && i.name != 'unrated').map(item => item.id));
                if (guilddata.autoroles.some(i => i.name == 'unrated')) await interaction.member.roles.add(guilddata.autoroles.find(i => i.name == 'unrated').id);
                return interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[guilddata.lang].mmr.no_rank_title,
                            desc: translations[guilddata.lang].mmr.no_rank_desc,
                            footer: 'VALORANT LABS [MMR ERROR]',
                        }),
                    ],
                });
            }
            const uneditableroles = [];
            roles.forEach(item => {
                if (guilddata.autoroles.some(i => i.name == item)) {
                    const role = interaction.guild.roles.cache.get(guilddata.autoroles.find(item1 => item1.name == item).id);
                    if (!role.editable) uneditableroles.push({name: firstletter(item), value: `<@&${role.id}>`});
                } else if (item != 'unrated') uneditableroles.push({name: firstletter(item), value: translations[guilddata.lang].autorole.wrong});
            });
            if (uneditableroles.length)
                return interaction.editReply({
                    embeds: [
                        embedBuilder({
                            title: translations[guilddata.lang].autorole.roles_error_title,
                            desc: translations[guilddata.lang].autorole.roles_error_desc,
                            additionalFields: uneditableroles,
                            footer: 'VALORANT LABS [ROLE PERMISSION ERROR]',
                        }),
                    ],
                });
            await interaction.member.roles
                .remove(
                    guilddata.autoroles
                        .filter(item => mmr.data.data.current_data.currenttierpatched.split(' ')[0].toLowerCase() != item.name && item.name != 'verify')
                        .map(item => {
                            return item.id;
                        })
                )
                .catch(error => {
                    if (error.code == 50013)
                        return interaction.editReply({
                            embeds: [
                                embedBuilder({
                                    title: translations[guilddata.lang].autorole_permission_title,
                                    desc: translations[guilddata.lang].autorole_permission_desc,
                                    footer: 'VALORANT LABS [NO PERMISSION]',
                                }),
                            ],
                        });
                });

            await interaction.member.roles.add(
                guilddata.autoroles.some(i => i.name == 'verify')
                    ? guilddata.autoroles
                          .filter(item => mmr.data.data.current_data.currenttierpatched.split(' ')[0].toLowerCase() == item.name || item.name == 'verify')
                          .map(item => {
                              return item.id;
                          })
                    : guilddata.autoroles.find(item => mmr.data.data.current_data.currenttierpatched.split(' ')[0].toLowerCase() == item.name).id
            );
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: translations[guilddata.lang].autorole.role_given_title,
                        desc: translations[guilddata.lang].autorole.role_given_desc,
                    }),
                ],
            });
        }
        case 'remove': {
            await interaction.member.roles
                .remove(
                    guilddata.autoroles
                        .filter(item => item.name != 'verify')
                        .map(item => {
                            return item.id;
                        })
                )
                .catch(error => {
                    if (error.code == 50013)
                        return interaction.editReply({
                            embeds: [
                                embedBuilder({
                                    title: translations[guilddata.lang].autorole_permission_title,
                                    desc: translations[guilddata.lang].autorole_permission_desc,
                                    footer: 'VALORANT LABS [NO PERMISSION]',
                                }),
                            ],
                        });
                });
            return interaction.editReply({
                embeds: [
                    embedBuilder({
                        title: translations[guilddata.lang].autorole.role_removed_title,
                        desc: translations[guilddata.lang].autorole.role_removed_desc,
                    }),
                ],
            });
        }
    }
}
export const name = 'autoroles';
