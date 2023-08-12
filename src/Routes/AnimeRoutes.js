 const express = require('express');
 const router = express.Router()


router.get(`/home`,(req, res)=>{
    try{
        res.status(200).json({succes: true, message: 'Donnes recus avec succes'})
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

