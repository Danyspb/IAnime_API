const express = require('express')
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongose = require('mongoose');



app.use(cors());
app.options('*', cors())
///////////////////////

const anime = require('./src/Routes/AnimeRoutes');



///////////////////////
app.use(express.json());
app.use(morgan('tiny'));


///////////////////

app.use(`/`,anime );








// mongose.connect('mongodb://127.0.0.1:27017/Ianime')
// .then(() => {
//     console.log('Connection a la base de donne OK!!!');
// })
// .catch((err) => {
//     console.log(err);
// })


app.get('/', (req, res)=>{
    res.send("Welcome to my IAnime API")
})




app.listen(3000, ()=>[
    console.log("server is running well !!")
])
