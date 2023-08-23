const axios = require('axios');
const cheerio = require('cheerio');
const { Domaine, Dsearchlink, Esearchlink } = require('../../Liens/AnimeLink');


async function Search(text ,dataAnime = []){
    
    try{
        const donnes = await axios.get(`${Dsearchlink + text + Esearchlink}`);
        const $ = cheerio.load(donnes.data)

        $('td[align="center"] table tbody').each((i, rech)=>{
            const textlink = $(rech).find('tr center a').text();
            if(textlink.includes('Visionner L\'anime')){
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
            }
        });
        return dataAnime;

    }catch(err){
        throw err
    }
}

Search();

module.exports = Search;