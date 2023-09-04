const axios = require('axios');
const cheerio = require('cheerio');



async function Video(data = []){
    try{

        const donnes = await axios.get();
        const $ = cheerio.load(donnes.data);
        
        const test = $(".post-wrapper center [style] script").text.match(/".*(")/gm)[0].replaceAll('"','');
        const lien = decodeURIComponent(test);
        const url  = lien.match(/https.*webkit/gm)[0].replace("' webkit","")
        console.log(url)



    }catch(err){
        throw err
    }
}