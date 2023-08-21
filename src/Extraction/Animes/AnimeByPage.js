const axios = require('axios');
const cheerio = require('cheerio');
const { page, DLinks, ELinks  } = require('../../Liens/AnimeLink');



async function AnimeByAlpha(id, dataAnime = []) {

    for(i of page){
        if(id === i.Caractere){
            id = i.value;
            try{
        
                const donnes = await axios.get(`${DLinks + id + ELinks}`)
                const $ = cheerio.load(donnes.data)
         
                $('table[width="95%"] center table[width="214"] tbody').each((i, rek)=>{
                 const AnimeId = $(rek).find('td center div a').attr('href').match(/(\d+)/gm).toString();
                 const titre = $(rek).find('td center span').text();
                 const image = $(rek).find('td center div').css('background').match(/http.*(jpg|png|jpeg|webp)/gm).toString();
                 const lien = $(rek).find('td center div a').attr('href');
                 const episode = $(rek).find('td[width="40%"] font[color="#FF4500"]').text();
                 const type = $(rek).find('td[width="25%"] font[color="#008080"]').text();
         
                 dataAnime.push({
                    AnimeId,
                    titre,
                    image,
                    lien,
                    episode,
                    type
                })
                         
                 })
                 return dataAnime;
         
         
             }catch(err){
                 console.log('erreur');
             }

        }
       
    }

    
    
    

}

AnimeByAlpha();

module.exports = AnimeByAlpha;