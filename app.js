const express = require('express')
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongose = require('mongoose');





////////////////////////
app.use(cors());
app.options('*', cors())
///////////////////////

const anime = require('./src/Routes/AnimeRoutes');

///////////////////////
app.use(express.json());
app.use(morgan('tiny'));


///////////////////

app.use(`/`,anime );




/////////////////////  mettre votre donnes dans une base de donnes du cluster mais il duplicate les donnes ////////////////// /////
//////// mongose.connect('mongodb+srv://danyspb4ever:4ExpbNbI5gRn5y6z@ianimecluster.1ev9i6f.mongodb.net/?retryWrites=true&w=majority')///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////// si vous decommenter cette partie les donnnes scrapper iront dans votre base de donne comme l'exemple ci-dessous  ////////////////
mongose.connect('mongodb://127.0.0.1:27017/Ianime')
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
.then(() => {
    console.log('Connection a la base de donne OK!!!');
})
.catch((err) => {
    console.log(err);
})







/////////////////////////////////////////////

app.get('/', (req, res)=>{
    res.send("Welcome to my IAnime API")
})




app.listen(3000, ()=>[
    console.log("server is running well !!")
])
