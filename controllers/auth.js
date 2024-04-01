const db = require('../db');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_TOKEN;
const bcrypt = require('bcrypt');

db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

exports.register = (req, res) => {
  console.log(req.body);

  const { name, email, password, ConfirmPassword } = req.body;

  db.query('SELECT email FROM users WHERE email = $1', [email], async (error, result) => {
    if (error) {
      console.error(error);
    }
    if (result && result.rows && result.rows.length > 0) {
      return res.render('register', { message: "Email already exists 🤣, Try with new email.." })
    }
    else if (password !== ConfirmPassword) {
      return res.render('register', { message: "Password doesnt match 😢..." });
    }
    const hashPassword = await bcrypt.hash(password, 8);
    console.log(hashPassword);

    db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ', [name, email, hashPassword], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        return res.redirect('/login');
      }
    })
  })
}

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = $1', [email], async (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result && result.rows && result.rows.length > 0) {
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return res.redirect(`/dashboard?name=${user.name}`);
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  });
};

exports.getAllUsers = (req,res)=>{
  db.query('SELECT * FROM users', (error, result)=>{
    if(error){
      console.error(error);
      return res.status(400).json({message: "Error while fetching users.."});
    }else{
      // return res.status(200).json({message:"Users fetched Successfully..."});
      return res.send(result.rows);
    };
  });
} 


