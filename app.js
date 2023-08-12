const express = require('express')
const app = express();
const morgan = require('morgan');
const cors = require('cors');



app.use(cors());
app.options('*', cors())
///////////////////////

const anime = require('./src/Routes/AnimeRoutes')


///////////////////////
app.use(express.json());
app.use(morgan('tiny'));


///////////////////

app.use(`/`,anime )




app.get('/', (req, res)=>{
    res.send("Welcome to my IAnime API")
})





app.listen(3000, ()=>[
    console.log("server is running well !!")
])
