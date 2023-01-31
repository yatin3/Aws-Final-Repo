
const Sib = require ("sib-api-v3-sdk");

require('dotenv').config()

const client = Sib.ApiClient.instance

const apiKey = client.authentications['api-key']

apiKey.apiKey = process.env.API_KEY

const tranEmailApi = new Sib.TransactionalEmailsApi()

const sender = {
    email: 'yatingoyal31@gmail.com',
}


exports.forgotPasswrd = (req,res,next)=>{

    const receivers = [
        {
            email: req.body.email,
        },
    ]
    
    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'subscribe to yatin goyal academy',
        textContent:`
        yatin goyal will teach how to become philoshoper.
        `
    })
    .then((response)=> {
      res.status(202).json({message:'successful'});
    })
    .catch(err => console.log(err));
    


    //console.log(req.body);
}