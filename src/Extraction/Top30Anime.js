const axios = require('axios');
const cheerio = require('cheerio');
const { TopAnime, Domaine } = require('../Liens/AnimeLink');
const { Top30Model } = require('../Model/Top30Model');


const url = TopAnime;
const dataAnime = [];

async function LesTop30Animes() {
    try {
        const donnes = await axios.get(url);
        const $ = cheerio.load(donnes.data)

        $('table[width="214"] tbody').each(async (i, crap) => {
            const AnimeId = $(crap).find('a').attr('href').match(/(\d+)/gm).toString();
            const titre = $(crap).find('span').text();
            const image = $(crap).find('div').css('background').match(/http.*(jpg|png|jpeg|webp)/gm).toString();
            const lienText = $(crap).find('a').attr('href');
            const lien = `${Domaine}${lienText}`;
            const type = $(crap).find('div img').attr('title').match(/(VF|VOSTFR)/gm).toString();
            const result = {
                AnimeId,
                titre,
                image,
                lien,
                type
            }
            dataAnime.push(result)

            const info = await Top30Model.find({
                AnimeId
            });

            if (info.length === 0) {
                const Top30Anime = new Top30Model({
                    AnimeId: AnimeId,
                    Titre: titre,
                    Image: image,
                    Lien: lien,
                    Type: type
                });
                Top30Anime.save();
                // console.log("Donnees sauvegare avec succes !!!")
            } else {
                const id = await Top30Model.find({
                    AnimeId
                })
                for (a of id) {
                    Top30Model.bulkWrite([{
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
                                    Type: type,
                                }
                            },
                            upsert: true
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

LesTop30Animes();

module.exports = LesTop30Animes;