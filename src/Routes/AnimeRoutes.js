const express = require('express');
const RecentAnime = require('../Extraction/AnimeRecent');
const { RecentModel } = require('../Model/RecentModel');
const LesTop30Animes = require('../Extraction/Top30Anime');
const { Top30Model } = require('../Model/Top30Model');
const router = express.Router();


router.get(`/recent`,async(req, res)=>{
    try{
        const data = await RecentAnime();
        res.status(200).json({succes: true, data})
    }catch{
        if(res.status(404)){
            return res.json({succes: false, message: 'erreur aucun fichier trouver '})
        }
        if(res.status(500)){
            return res.status(500).json({succes: false, message: ' Erreur Arrete de faire de la merde !!!'})
        }
                
    }
})


router.get(`/top30`,async(req, res)=>{
    try{
        const data = await LesTop30Animes();
        res.status(200).json({succes: true, data})
    }catch{
        if(res.status(404)){
            return res.json({succes: false, message: 'erreur aucun fichier trouver '})
        }
        if(res.status(500)){
            return res.status(500).json({succes: false, message: ' Erreur Arrete de faire de la merde !!!'})
        }
                
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// si vous voulez recuperer les donnes de votre base de donnes  utilisez le chemin ci dessous    //////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get(`/dbRecent`, async(req, res)=>{
    let recentAniDB = await RecentModel.find();
    if(!recentAniDB){
        if(res.status(500)){
            return  res.status(500).json({succes: false, message: 'Erreur Arrete de faire de la merde !!!'})
        }if(res.status(404)){
            return res.status(404).json({succes: false, message: 'Erreur Fichier non trouvee'})
        }
    }else{
        return res.status(200).json(recentAniDB)
    }
   
})

router.get(`/dbTop30`, async(req, res)=>{
    let top30 = await Top30Model.find();
    if(!top30){
        if(res.status(500)){
            return  res.status(500).json({succes: false, message: 'Erreur Arrete de faire de la merde !!!'})
        }if(res.status(404)){
            return res.status(404).json({succes: false, message: 'Erreur Fichier non trouvee'})
        }
    }else{
        return res.status(200).json(top30)
    }
   
})

module.exports = router;

