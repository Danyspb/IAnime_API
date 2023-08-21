const axios = require('axios');
const cheerio = require('cheerio');
const { link } = require('../../Routes/AnimeRoutes');
const { page } = require('../../Liens/AnimeLink');


// https://www.ianimes.org/listing.php?affichage=${A}&b1u3vv0lSorJk9Lex0tbKZEtbz8RlMC9
const url = link;
const dataAnime = [];





async function AnimeByAlpha() {

    console.log(page.length)
    

    
    try{
       const donnes = await axios.get('https://www.ianimes.org/listing.php?affichage=Wup331BgFuytt788o&b1u3vv0lSorJk9Lex0tbKZEtbz8RlMC9')
       const $ = cheerio.load(donnes.data)

       $('table[width="95%"] center table[width="214"] tbody').each((i, rek)=>{
        const AnimeId = $(rek).find('td center div a').attr('href').match(/(\d+)/gm).toString();
        const titre = $(rek).find('td center span').text();
        const image = $(rek).find('td center div').css('background').match(/http.*(jpg|png|jpeg|webp)/gm).toString();
        const lien = $(rek).find('td center div a').attr('href');
        const NbrEpisode = $(rek).find('td[width="40%"] font[color="#FF4500"]').text();
        const type = $(rek).find('td[width="25%"] font[color="#008080"]').text();

        const result ={
            AnimeId,
            titre,
            image,
            lien,
            NbrEpisode,
            type
        }

        dataAnime.push(result)
                
        })
        return dataAnime;


    }catch(err){
        throw err;
    }

}

AnimeByAlpha();

module.exports = AnimeByAlpha;