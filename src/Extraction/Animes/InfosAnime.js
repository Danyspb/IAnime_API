const axios = require('axios');
const cheerio = require('cheerio');
const { AnimeInfo } = require('../../Liens/AnimeLink');
const { InfoMode } = require('../../Model/AnimesModel/InfoModel');


const url = AnimeInfo;
const dataAnime = [];
const episodes = [];

async function DetailsAnime() {

    try{
        const donnes = await axios.get(url);
        const $ = cheerio.load(donnes.data)

        
        const titre = $('center h1 ').text();
        const coverImage = $('center div ').css('background').match(/http.*(jpg|png|jpeg|webp)/gm).toString();
        const image =  $('td img').attr('src');
        const titreOriginal = $('td font:contains("Titre original")').next().text();
        const type = $('td font:contains("Format")').next().text();
        const genres = $('td font:contains("Genre")').next().text();
        const dateSortie = $('td font:contains("Date de Diffusion")').next().text();
        const dureeEpisode = $('td font:contains("Durée par épisode")').next().text();
        const studio = $('td font:contains("Studio")').next().text();
        const description = $('legend').eq(1).next().text();
        $('.cat_post_item-1.clearfix a').each((i, ep)=>{
            const  numero = $(ep).text();
            const  lien = $(ep).attr('href');
            const res = {numero, lien}
            if(res.numero.includes('Episode') || res.numero.includes('Oav ') || res.numero.includes('Special')){
                episodes.push(res)
            }
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
            description,
            episodes   
        }
        dataAnime.push(result);
        const verif = await InfoMode.find({})

        if(verif.length === 0){
            const newDetails = new InfoMode({
                Titre: titre,
                Coverimage :coverImage ,
                Image: image,
                Titreoriginal:titreOriginal,
                Type:type,
                Genre:genres,
                Datesortie:dateSortie,
                Duréepisode:dureeEpisode,
                Studio:studio,
                Description:description,
                Episodes: episodes
            })
            newDetails.save();
        }else{
            InfoMode.bulkWrite([{
                    deleteMany: {
                        "filter": {}
                    }
                },
                {
                    insertOne:{
                        document:{
                            Titre:titre,
                            CoverImage :coverImage ,
                            Image: image,
                            TitreOriginal: titreOriginal,
                            Type:type,
                            Genre:genres,
                            Datesortie:dateSortie,
                            Duréepisode:dureeEpisode,
                            Studio:studio,
                            Description:description,
                            Episodes:episodes
                        }
                    }
                }
            ])
        }

        return dataAnime;
    }catch (err){
        throw err
    }

}

DetailsAnime();

module.exports = DetailsAnime;