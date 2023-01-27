const User = require('../models/user');

exports.postUser = (req,res,next)=>{
    
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    User.create({
       name:user,
       email:email,
       password: password
    })
   .then((results) => {
   // console.log(results);
    res.json(results);
   })
   .catch(err => {
    console.log(err);
    res.status(404).json(err);
   });
   };