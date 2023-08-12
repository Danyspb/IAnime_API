const express = require('express')
const app = express();
const port = 3000;
const morgan = require('morgan');
const cors = require('cors');


////////////////////////
app.use(cors());
app.options('*', cors());
///////////////////////////



app.use(morgan('dev'));

////////////////////////


app.get('/', (req, res) => {
  res.send('server is Running well !!!!')
})
app.listen(port, () => console.log(`server marche sur le port: ${port}!`))