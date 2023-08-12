const axios = require('axios');
const fs = require("fs");
const cheerio = require('cheerio');
const { default: AnimeLinks } = require('../Liens/AnimeLinks');

const url = AnimeLinks.animeRecent;
const dataAnime = {};

async function Recntanime() {
    const {data : html} = await axios.get(url);
    return html

}

Recntanime().then((res) =>{
    const $ = cheerio.load(res)
    $('center td[align="center"]').each((i,inf)=>{
        const titre = $(inf).find('td[colspan="3"] span').text();
        const image = $(inf).find('div').css('background').match(/http.*(jpg|png|jpeg)/gm);
        const lien = $(inf).find('a').attr('href');
        const numero = $(inf).find('font[color="#FF4500"]').text();
        const episode = `episode ${numero}`;
        const type = $(inf).find('font[color="#008080"]').eq(1).text();
        dataAnime[titre, image, lien, episode, type]
       });

    fs.writeFile('moviesData.json', JSON.stringify(dataAnime), (err)=>{
        if(err){
            throw err;
        }else{
            console.log("file success");
        }
    })
})