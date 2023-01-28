const User = require('../models/user');

exports.postUser = (req,res,next)=>{
    
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    if(user == null || user.length === 0|| email == null || email.length === 0|| password.length === 0||password == null){
      return res.status(400).json({error : "Bad Parameters . Something is Missing"});
    }

    User.create({
       name:user,
       email:email,
       password: password
    })
   .then((results) => {
    res.status(201).json({message: "Successfully created new user"})
   })
   .catch(err => {
   res.status(500).json({message: "user already exist"});
   });
};

exports.checkUser = (req,res,next) => {
     
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ where: { email:email } })
    .then((user) => {
      
      if(user !== null && user.dataValues.password === password){
         res.status(201).json(user);

      }
      else if(user === null){
         res.status(404).json({message:"user not found"});
      }
      else if(user.dataValues.password != password){
         res.status(401).json({message:"user not authorized"});
      }

    })
    .catch((err)=>{
      console.log(err);
       res.status(404).json(err);
    })

};