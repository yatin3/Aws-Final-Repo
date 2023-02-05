const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = (req,res,next)=>{

    try{
        const token = req.header('Authorization');

        // const user = jwt.verify(token,'87659937449fgjdh73990303');
        const user = jwt.verify(token,process.env.Token_Key);

        User.findByPk(user.userid).then(user => {
         req.user = user;
         next();
        }).catch(err => {throw new Error(err)})
    }
    catch(err){
        console.log(err);
        return res.status(401).json({success: false});
    }
}