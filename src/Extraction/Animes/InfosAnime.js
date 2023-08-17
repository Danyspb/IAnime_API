const axios = require('axios');
const cheerio = require('cheerio');
const { AnimeInfo } = require('../../Liens/AnimeLink');


const url = AnimeInfo;
const dataAnime = [];

async function DetailsAnime() {

    try{
        const donnes = await axios.get(url);
        const $ = cheerio.load(donnes.data)

        const genres = [];
        const titre = $('center h1 ').text();
        const CoverImage = $('center div ').css('background').match(/http.*(jpg|png|jpeg|webp)/gm).toString();
        const image =  $('td img').attr('src');
        const titreOriginal = $('td font:contains("Titre original")').next().text();
        const type = $('td font:contains("Format")').next().text();
        


        


    }catch{

    }

}