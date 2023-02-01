const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Sib = require ("sib-api-v3-sdk");

const User = require('../models/user');
const Forgotpassword = require('../models/forgotpassword');

require('dotenv').config()

const client = Sib.ApiClient.instance

const apiKey = client.authentications['api-key']

apiKey.apiKey = process.env.API_KEY

const tranEmailApi = new Sib.TransactionalEmailsApi()

const sender = {
    email: 'yatingoyal31@gmail.com',
}


exports.forgotPasswrd = async (req,res,next)=>{

     try{
        const user = await User.findOne({where:{email:req.body.email}});
       
        if(user){

            const id = uuid.v4();

           await Forgotpassword.create({
                id:id,
                active:true,
                UserId:1
            })


        

        const receivers = [
            {
                email: req.body.email,
            },
        ]
      //console.log("ok");
        tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'subscribe to yatin goyal academy',
            textContent:`
            yatin goyal will teach how to become philoshoper.
            `,
            // htmlContent:`
            // <a> href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>
            // `
        })
        .then((response)=> {
          res.status(202).json({message: 'Link to reset password sent to your mail ', sucess: true});
        })
        .catch((error)=>{
            console.log(error);
            throw new Error (error);
        })
    }
    else{
        throw new Error('User do not exist');
    }

     }
     catch(err){
       
        return res.json({message:`${err}`,success:false});

     }
    

    //console.log(req.body);
}

exports.resetpassword =  (req,res) =>{

    const id = req.params.id;
     Forgotpassword.findOne({where : {id:id}}).then(forgotpasswordrequest => {

        if(forgotpasswordrequest){

            forgotpasswordrequest.update({active:false});
            console.log("hy");
            res.status(200).send(
                `<html>
                <script>
                function formsubmitted(e){
                    e.preventDefault();                 
                }
                </script>

                <form action="/password/updatepassword/${id}" method="get">
                <label for="newpassword">Enter new password</label>
                <input name="newpassword" type="password" required></input>
                <button>reset password</button>
                </form>
                </html>
                `
            )

            res.end();
        }
     })
}

exports.updatepassword = (req,res) => {

     try{
    const newpassword = req.query.newpassword;
    const resetpasswordid = req.params.resetpasswordid;
   
    Forgotpassword.findOne({where: {id: resetpasswordid}}).then(resetpasswordrequest => {
      User.findOne({where: {id:resetpasswordrequest.UserId}}).then(user => {

        if(user){
            bcrypt.hash(newpassword,10,  (err,hash) => {
            user.update({password:hash}).then(()=>{
                res.status(201).json({message:"Successfully updates new password"});
            })
            .catch((err)=>{
                throw new Error(err);
            })
      });

    }
    else{
        return res.status(404).json({error:"No User Exist", success:false});
    }
    })
})
}
catch(error){
    return res.status(403).json({error:`${error}`,success:false});
}
}

