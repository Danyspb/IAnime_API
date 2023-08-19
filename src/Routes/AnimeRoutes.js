const express = require('express');
const RecentAnime = require('../Extraction/Animes/AnimeRecent');
const { RecentModel } = require('../Model/AnimesModel/RecentModel');
const LesTop30Animes = require('../Extraction/Animes/Top30Anime');
const { Top30Model } = require('../Model/AnimesModel/Top30Model');
const DetailsAnime = require('../Extraction/Animes/InfosAnime');
const router = express.Router();


router.get(`/api/recent`, async (req, res) => {
    
    try {
        const data = await RecentAnime();
        const result = data.reduce((unique, o) => {
            if (!unique.some(obj => obj.AnimeId === o.AnimeId && obj.Type === o.Type)) {
                unique.push(o);
            }
            return unique;
        }, []);
        res.status(200).json({
            succes: true,
            result
        })
    } catch {
        if (res.status(404)) {
            return res.json({
                succes: false,
                message: 'erreur aucun fichier trouver '
            })
        }
        if (res.status(500)) {
            return res.status(500).json({
                succes: false,
                message: ' Erreur Arrete de faire de la merde !!!'
            })
        }

    }
})




router.get(`/api/top30`, async (req, res) => {

    try {
        const data = await LesTop30Animes();
        const result = data.reduce((unique, o) => {
            if (!unique.some(obj => obj.AnimeId === o.AnimeId && obj.Type === o.Type)) {
                unique.push(o);
            }
            return unique;
        }, []);

        res.status(200).json({
            succes: true,
            result
        })
    } catch {
        if (res.status(404)) {
            return res.json({
                succes: false,
                message: 'erreur aucun fichier trouver '
            })
        }
        if (res.status(500)) {
            return res.status(500).json({
                succes: false,
                message: ' Erreur Arrete de faire de la merde !!!'
            })
        }

    }
})

router.get(`/api/info/:id`, async(req, res)=>{

    try{
        const id = req.params.id;
        const data = await DetailsAnime(id);
        const result = data.reduce((unique, o) => {
            if (!unique.some(obj => obj.titre === o.titre)) {
                unique.push(o);
            }
            return unique;
        }, []);

        res.status(200).json({
            success :true ,
            result
        })

    }catch{
        console.log(res);
        if (res.status(404)) {
            return res.json({
                succes: false,
                message: 'erreur aucun fichier trouver '
            })
        }
        if (res.status(500)) {
            return res.status(500).json({
                succes: false,
                message: ' Erreur Arrete de faire de la merde !!!'
            })
        }

    }
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////   si vous voulez recuperer les donnes qui se trouve dans votre base de donnes  utilisez le chemin ci dessous    //////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get(`/api/dbRecent`, async (req, res) => {
    let recentAniDB = await RecentModel.find();
    if (!recentAniDB) {
        if (res.status(500)) {
            return res.status(500).json({
                succes: false,
                message: 'Erreur Arrete de faire de la merde !!!'
            })
        }
        if (res.status(404)) {
            return res.status(404).json({
                succes: false,
                message: 'Erreur Fichier non trouvee'
            })
        }
    } else {
        return res.status(200).json(recentAniDB)
    }

})

router.get(`/api/dbTop30`, async (req, res) => {
    let top30 = await Top30Model.find();
    if (!top30) {
        if (res.status(500)) {
            return res.status(500).json({
                succes: false,
                message: 'Erreur Arrete de faire de la merde !!!'
            })
        }
        if (res.status(404)) {
            return res.status(404).json({
                succes: false,
                message: 'Erreur Fichier non trouvee'
            })
        }
    } else {
        return res.status(200).json(top30)
    }

})

module.exports = router;