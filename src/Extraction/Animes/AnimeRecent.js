const axios = require('axios');
const cheerio = require('cheerio');
const { RecentAnimeLink, Domaine} = require('../../Liens/AnimeLink');
const { RecentModel } = require('../../Model/AnimesModel/RecentModel');



async function RecentAnime(dataAnime = []) {

    try {
        const donnes = await axios.get(RecentAnimeLink);
        const $ = cheerio.load(donnes.data)

        $('center td[align="center"]').each(async (i, inf) => {
            const AnimeId = $(inf).find('a').attr('href').match(/(\d+)/gm).toString();
            const titre = $(inf).find('td[colspan="3"] span').text();
            const image = $(inf).find('div').css('background').match(/http.*(jpg|png|jpeg|webp)/gm).toString();
            const lienText = $(inf).find('a').attr('href');
            const lien = `${Domaine}${lienText}`;
            const episode = $(inf).find('font[color="#FF4500"]').text();
            const type = $(inf).find('font[color="#008080"]').eq(1).text();

            dataAnime.push({
                AnimeId,
                titre,
                image,
                lien,
                episode,
                type
            });

            const info = await RecentModel.find({
                AnimeId
            });

            if (info.length === 0) {
                const RecentSortie = new RecentModel({
                    AnimeId: AnimeId,
                    Titre: titre,
                    Image: image,
                    Lien: lien,
                    Episode: episode,
                    Type: type
                })
                RecentSortie.save();
                // console.log("Donnees sauvegare avec succes !!!")
            } else {
                const SearchId = await RecentModel.find({
                    AnimeId
                })
                for (a of SearchId) {
                    RecentModel.bulkWrite([{
                            updateMany: {
                                "filter": {
                                    "AnimeId": a.AnimeId
                                },
                                "update": {
                                    $set: {
                                        Titre: titre,
                                        Image: image,
                                        Lien: lien,
                                        Episode: episode,
                                        Type: type,
                                    }
                                },
                                upsert: true,
                            }
                        }
                        // {
                        //     deleteMany: {

                        //         // cette operation de comparaison marche
                        //         // "filter" :{
                        //         //     "AnimeId": {$eq : a.AnimeId}
                        //         // },
                        //         /// cette operation de comparaison ne marche pas
                        //         // "filter":{
                        //         //     "AnimeId": {$ne : a.AnimeId}
                        //         // }

                        //     }
                        // }
                    ])
                }
                // console.log("Mise a jour des donnes reussi !!!")
            }
        });
        return dataAnime;
    } catch (err) {
        throw err
    }

}

RecentAnime();

module.exports = RecentAnime;