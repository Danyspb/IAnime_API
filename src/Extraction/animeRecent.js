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
    $('#menu-platforms-menu>li').each((i,movi)=>{
        const test = $(movi).find('a strong').text();
        const cat = $(movi).find('a').text();
        moviesData[test] = cat;
    });

    fs.writeFile('moviesData.json', JSON.stringify(moviesData), (err)=>{
        if(err){
            throw err;
        }else{
            console.log("file success");
        }
    })
})