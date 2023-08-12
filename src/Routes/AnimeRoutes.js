const express = require('express');
const RecentAnime = require('../Extraction/AnimeRecent');
const router = express.Router();


router.get(`/recent`,async(req, res)=>{
    try{
        const data = await RecentAnime();
        res.status(200).json({succes: true, data})
    }catch{
        if(res.status(400)){
            return res.json({succes: false, message: 'erreur aucun fichier trouver '})
        }
        if(res.status(500)){
            return res.status(500).json({succes: false, message: ' Erreur Arrete de faire de la merde !!!'})
        }
                
    }
})

module.exports = router;

