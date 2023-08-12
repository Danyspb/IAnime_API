const axios = require('axios');
const fs = require("fs");
const cheerio = require('cheerio');

const url = "https://www.ianimes.org/index.php";
const dataAnime = [];

async function Recntanime() {
    const {data : html} = await axios.get(url);
    return html
}

Recntanime().then((res) =>{
    const $ = cheerio.load(res)
    $('center td[align="center"]').each((i,inf)=>{
        dataAnime.push({
         titre : $(inf).find('td[colspan="3"] span').text(),
         image :  $(inf).find('div').css('background').match(/http.*(jpg|png|jpeg|webp)/gm).toString(),
         lien : $(inf).find('a').attr('href'),
         episode : $(inf).find('font[color="#FF4500"]').text(),
         type : $(inf).find('font[color="#008080"]').eq(1).text(),
        })
       });
       console.log(dataAnime)
       return dataAnime, (err)=>{
            if(err){
                throw err;
            }else{
                console.log("file success");
            }
        }

    })

module.exports.Recntanime = Recntanime;
