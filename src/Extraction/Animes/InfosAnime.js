const axios = require('axios');
const cheerio = require('cheerio');
const { AnimeInfo } = require('../../Liens/AnimeLink');


const url = AnimeInfo;
const dataAnime = [];

async function DetailsAnime() {

    try{
        const donnes = await axios.get(url);
        const $ = cheerio.load(donnes.data)

        const episodes = [];
        const titreOriginal = '';
        const type = '';
        const genres = '';
        const dateSortie = '';
        const dureeEpisode = '';
        const studio = '';
        


    
        const titre = $('center h1 ').text();
        const coverImage = $('center div ').css('background').match(/http.*(jpg|png|jpeg|webp)/gm).toString();
        const image =  $('td img').attr('src');
        titreOriginal = $('td font:contains("Titre original")').next().text();
        type = $('td font:contains("Format")').next().text();
        genres = $('td font:contains("Genre")').next().text();
        dateSortie = $('td font:contains("Date de Diffusion")').next().text();
        dureeEpisode = $('td font:contains("Durée par épisode")').next().text();
        studio = $('td font:contains("Studio")').next().text();
        const description = $('legend').eq(1).next().text();
        $('.cat_post_item-1.clearfix a').each((i, ep)=>{
            episodes.push(
               numero = $(ep).text(),
                lien = $(ep).attr('href')
            )
             
        })

        const result = {
            
            titre,
            coverImage,
            image,
            titreOriginal,
            type,
            genres,
            dateSortie,
            dureeEpisode,
            studio,
            episodes     
            
        }
        dataAnime.push(result);
        console.log(dataAnime)
        


    }catch{
        console.log('helllo')
    }

    DetailsAnime();

}

module.exports = DetailsAnime;