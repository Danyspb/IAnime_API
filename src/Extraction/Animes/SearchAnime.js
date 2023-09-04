const axios = require('axios');
const cheerio = require('cheerio');
const { Domaine, Dsearchlink, Esearchlink } = require('../../Liens/AnimeLink');
const { SearchModel } = require('../../Model/AnimesModel/SearchAnimeModel');


async function Search(text, dataAnime = []) {
    /**
     * Performs a web scraping operation to search for anime data based on the provided text.
     * Saves the retrieved data to a MongoDB database using Mongoose.
     * 
     * @param {string} text - The text to search for anime data.
     * @param {Array} dataAnime - An array to store the retrieved anime data. Defaults to an empty array.
     * @returns {Array} - An array containing the retrieved anime data.
     * @throws {Error} - If an error occurs during the web scraping or database operations.
     */
    try {
        const donnes = await axios.get(`${Dsearchlink + text + Esearchlink}`);
        const $ = cheerio.load(donnes.data)

        $('td[align="center"] table tbody').each(async (i, rech) => {
            const textlink = $(rech).find('tr center a').text();
            if (textlink.includes('Visionner L\'anime')) {
                const AnimeId = $(rech).find('tr center a').attr('href').match(/(\d+)/gm).toString();
                const titre = $(rech).find('tr center span titre6').text();
                const textl = $(rech).find('tr center a').attr('href');
                const image = $(rech).find('tr center div').css('background').match(/http.*(jpg|png|jpeg|webp)/gm).toString();
                const lien = `${Domaine}${textl}`;
                const type = $(rech).find('tr td font[color="#008080"]').text();

                dataAnime.push({
                    AnimeId,
                    titre,
                    image,
                    lien,
                    type
                })

                const info = await SearchModel.find({
                    AnimeId
                });

                if (info.length === 0) {
                    const rechAnime = new SearchModel({
                        AnimeId: AnimeId,
                        Titre: titre,
                        Image: image,
                        Lien: lien,
                        Type: type
                    });
                    rechAnime.save();
                    // console.log("Donnees sauvegare avec succes !!!")
                } else {
                    const id = await SearchModel.find({
                        AnimeId
                    })
                    for (a of id) {
                        SearchModel.bulkWrite([{
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
                                upsert: true,
                            }
                        }])
                    }
                    // console.log("Mise a jour des donnes reussi !!!")
                }
            }
        });
        return dataAnime;

    } catch (err) {
        throw err
    }
}

Search();

module.exports = Search;