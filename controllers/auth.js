const db = require('../db');
const jwt = require('json-web-token');
const bcrypt = require('bcrypt');

db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

exports.register = (req, res)=>{
    console.log(req.body);

    const {name, email, password, ConfirmPassword} = req.body;

    db.query('SELECT email FROM users WHERE email = $1', [email], async (error, result)=>{
        if(error){
            console.error(error);
        }
        if (result && result.rows && result.rows.length > 0){
            return res.render('register', {message: "Email already exists 🤣, Try with new email.."})
        }
        else if(password !== ConfirmPassword){
            return res.render('register', {message: "Password doesnt match 😢..."});
        }
        let hashPassword = await bcrypt.hash(password, 8);
        console.log(hashPassword);

    })

    res.send("done....!");

}