const axios = require('axios');
const cheerio = require('cheerio');
const { RecentAnimeLink, Domaine } = require('../Liens/AnimeLink');
const { RecentModel } = require('../Model/RecentModel');


const url = RecentAnimeLink;
const dataAnime = [];

async function RecentAnime() {

    try {
        const donnes = await axios.get(url);
        const $ = cheerio.load(donnes.data)

        $('center td[align="center"]').each(async (i, inf) => {
            const AnimeId = $(inf).find('a').attr('href').match(/(\d+)/gm).toString();
            const titre = $(inf).find('td[colspan="3"] span').text();
            const image = $(inf).find('div').css('background').match(/http.*(jpg|png|jpeg|webp)/gm).toString();
            const lienText = $(inf).find('a').attr('href');
            const lien = `${Domaine}${lienText}`;
            const episode = $(inf).find('font[color="#FF4500"]').text();
            const type = $(inf).find('font[color="#008080"]').eq(1).text();

            const result = {
                AnimeId,
                titre,
                image,
                lien,
                episode,
                type
            }
            dataAnime.push(result);

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
                const id = await RecentModel.find({
                    AnimeId
                })
                for (a of id) {
                    RecentModel.bulkWrite([{
                        updateMany: {
                            "filter": {
                                "AnimeId": a.AnimeId
                            },
                            "update": {
                                $set: {
                                    AnimeId: AnimeId,
                                    Titre: titre,
                                    Image: image,
                                    Lien: lien,
                                    Episode: episode,
                                    Type: type,
                                }
                            }
                        }
                    }])
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



