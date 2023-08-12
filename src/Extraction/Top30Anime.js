const axios = require('axios');
const cheerio = require('cheerio');
const { TopAnime, Domaine } = require('../Liens/AnimeLink');
const { Top30Model } = require('../Model/Top30Model');


const url = TopAnime;
const dataAnime = [];

async function LesTop30Animes(){
    try{
        const donnes = await axios.get(url);
        const $ = cheerio.load(donnes.data)

        $('table[width="214"] tbody').each((i,crap)=>{
            const titre = $(crap).find('span').text();
            const image = $(crap).find('div').css('background').match(/http.*(jpg|png|jpeg|webp)/gm).toString();
            const lienText = $(crap).find('a').attr('href');
            const lien = `${Domaine}${lienText}`;
            const type = $(crap).find('div img').attr('title').match(/(VF|VOSTFR)/gm).toString();
            const result = { titre, image, lien, type }
            dataAnime.push(result);

            const Top30Anime = new Top30Model({
                titre: titre,
                image: image,
                lien: lien ,
                type :type

            })
            Top30Anime.save()

        });
        return dataAnime;

    }catch(err){
        throw err
    }
}

LesTop30Animes();

module.exports = LesTop30Animes;