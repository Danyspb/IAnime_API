const axios = require('axios');
const cheerio = require('cheerio');


const url = "https://www.ianimes.org/index.php";
const dataAnime = [];

async function RecentAnime(){

    try{
    const donnes = await axios.get(url);
    const $ = cheerio.load(donnes.data)

    $('center td[align="center"]').each((i,inf)=>{
        const domaine = 'https://www.ianimes.org/';
        const titre = $(inf).find('td[colspan="3"] span').text();
        const image =  $(inf).find('div').css('background').match(/http.*(jpg|png|jpeg|webp)/gm).toString();
        const lienText = $(inf).find('a').attr('href');
        const lien = `${domaine}${lienText}`;
        const episode = $(inf).find('font[color="#FF4500"]').text();
        const type = $(inf).find('font[color="#008080"]').eq(1).text();
        const result = {titre , image, lien, episode, type}
        dataAnime.push(result);
       });
       return dataAnime;
    }catch (err){
        throw err
    }
    
}

RecentAnime();

module.exports = RecentAnime;



