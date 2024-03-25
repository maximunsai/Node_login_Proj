const express = require('express');
const path = require('path')

const app = express();
const port = 8000;
// const db = require('./db');
const route = require('./routes/route');
const authRoute = require('./routes/auth')


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended:false}));
app.use(express.json());



  app.use('/', route);
  app.use('/auth', authRoute )

app.set('view engine', 'hbs');  



app.listen(port, ()=>{
    console.log(`listening to the port ${port}`)
})