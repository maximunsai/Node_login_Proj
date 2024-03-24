const express = require('express');
const path = require('path')

const app = express();
const port = 8000;
const db = require('./db');

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

app.set('view engine', 'hbs');  

app.get('/', (req, res)=>{
    res.render('index')
});
app.get('/register', (req, res)=>{
    res.render('register')
});

app.listen(port, ()=>{
    console.log(`listening to the port ${port}`)
})