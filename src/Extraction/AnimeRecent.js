const axios = require('axios');
const cheerio = require('cheerio');
const { RecentAnimeLink, Domaine } = require('../Liens/AnimeLink');
const { RecentModel } = require('../Model/RecentModel');


const url = RecentAnimeLink;
const dataAnime = [];

async function RecentAnime(){

    try{
    const donnes = await axios.get(url);
    const $ = cheerio.load(donnes.data)

    $('center td[align="center"]').each(async (i,inf)=>{
        const AnimeId = $(inf).find('a').attr('href').match(/(\d+)/gm).toString();
        const titre = $(inf).find('td[colspan="3"] span').text();
        const image =  $(inf).find('div').css('background').match(/http.*(jpg|png|jpeg|webp)/gm).toString();
        const lienText = $(inf).find('a').attr('href');
        const lien = `${Domaine}${lienText}`;
        const episode = $(inf).find('font[color="#FF4500"]').text();
        const type = $(inf).find('font[color="#008080"]').eq(1).text();

        const result = {AnimeId ,titre , image, lien, episode, type}
        dataAnime.push(result);

        //////// mettres ces donnes dans notre base de donnes////////
       try{
        const data = await RecentModel.find({});
            if(data.length === 0){
                const SortieRecent = new RecentModel({
                    AnimeId: AnimeId,
                    titre: titre,
                    image: image,
                    lien: lien,
                    episode:episode,
                    type:type
                })
                SortieRecent.save();
                console.log("donnes ajoutee");
            }else{
                const id = await RecentModel.find({AnimeId})
                for(a of id){
                    RecentModel.bulkWrite([
                        {
                            updateMany:
                            {
                                "filter":
                                {
                                    "AnimeId" : a.AnimeId
                                },
                                "update":
                                {
                                    $set:{
                                        AnimeId: AnimeId,
                                        titre: titre,
                                        image:image,
                                        lien:lien,
                                        episode:episode,
                                        type:type
                                    }
                                },
                                upsert:true
                            }
                            
                        }
                    ])
                    console.log('donnes modifier avec succes ');
                }         
            }
       }catch(err){
        throw err
       }
        
        
       });
       return dataAnime;
    }catch (err){
        throw err
    }
    
}

RecentAnime();

module.exports = RecentAnime;



