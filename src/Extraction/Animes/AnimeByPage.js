const axios = require('axios');
const cheerio = require('cheerio');
const { page, DLinks, ELinks, Domaine  } = require('../../Liens/AnimeLink');
const { AnimeByPM } = require('../../Model/AnimesModel/AnimeByPageModel');



async function AnimeByAlpha(id, dataAnime = []) {

    for(i of page){
        const mod = id?.toUpperCase();
        if(mod === i.Caractere){
            id = i.value;
            try{
        
                const donnes = await axios.get(`${DLinks + id + ELinks}`)
                const $ = cheerio.load(donnes.data)
         
                $('table[width="95%"] center table[width="214"] tbody').each(async (i, rek)=>{
                 const AnimeId = $(rek).find('td center div a').attr('href').match(/(\d+)/gm).toString();
                 const titre = $(rek).find('td center span').text();
                 const image = $(rek).find('td center div').css('background').match(/http.*(jpg|png|jpeg|webp)/gm).toString();
                 const lienNonCOmplet = $(rek).find('td center div a').attr('href');
                 const lien = `${Domaine}${lienNonCOmplet}`;
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

                const info = await AnimeByPM.find({
                    AnimeId
                });
    
                if (info.length === 0) {
                    const pageAnime = new AnimeByPM({
                        AnimeId: AnimeId,
                        Titre: titre,
                        Image: image,
                        Lien: lien,
                        Episode: episode,
                        Type: type
                    })
                    pageAnime.save();
                    // console.log("Donnees sauvegare avec succes !!!")
                } else {
                    const SearchId = await AnimeByPM.find({
                        AnimeId
                    })
                    for (a of SearchId) {
                        AnimeByPM.bulkWrite([{
                                updateMany: {
                                    "filter": {
                                        "AnimeId": a.AnimeId
                                    },
                                    "update": {
                                        $set: {
                                            Titre: titre,
                                            Image: image,
                                            Lien: lien,
                                            Episode: episode,
                                            Type: type,
                                        }
                                    },
                                    upsert: true,
                                }
                            }
                            // {
                            //     deleteMany: {
    
                            //         // cette operation de comparaison marche
                            //         // "filter" :{
                            //         //     "AnimeId": {$eq : a.AnimeId}
                            //         // },
                            //         /// cette operation de comparaison ne marche pas
                            //         // "filter":{
                            //         //     "AnimeId": {$ne : a.AnimeId}
                            //         // }
    
                            //     }
                            // }
                        ])
                    }
                    // console.log("Mise a jour des donnes reussi !!!")
                }
                         
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