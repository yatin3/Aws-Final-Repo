const Razorpay = require('razorpay');
const Order = require('../models/orders');
const jwt = require('jsonwebtoken');

function generateAccessToken(id,name,ispremiumuser){
  
    // return jwt.sign({userid:id, name:name, ispremiumuser:ispremiumuser }, '87659937449fgjdh73990303');
    return jwt.sign({userid:id, name:name, ispremiumuser:ispremiumuser }, process.env.Token_Key);
 }
 

exports.purchasepremium = async (req,res) => {
    try{
        var rzp = new Razorpay({
            key_id : 'rzp_test_oEV9ZO0VVVpcgP',
            key_secret : 'dhsb4a7PgnSMMRMdKuj9FtIn'
        })
        // console.log(process.env.Razorpay_Key);
        // console.log(process.env.Razorpay_Secret);

        // var rzp = new Razorpay({
        //     key_id : process.env.Razorpay_Key,
        //     key_secret : process.env.Razorpay_Secret
        // })
    
        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {

            if(err){
                throw new Error(JSON.stringify(err));
            }

            req.user.createOrder({orderid: order.id, status:'pending'}).then(()=>{
                return res.status(201).json({order, key_id : rzp.key_id});
            }).catch(err => {
                throw new Error(err)
            })
        })
    }
    catch(err){
        console.log(err);
        res.status(403).json({message: 'something went wrong', error: err})
    }
}

// exports.updateTransactionStatus = (req,res) => {

//     try{
//         const { payment_id, order_id} = req.body;
//         Order.findOne({where: {orderid:order_id}}).then(order => {

//             order.update({ paymentid: payment_id, status:'SUCCESSFUL'}).then(()=>{
//                req.user.update({ isPremiumUser: true}).then(()=>{
//                   return res.status(202).json({success: true, message:"Transaction Successful"});
//                }).catch((err)=>{
//                   throw new Error(err);
//                })
//             }).catch((err)=>{
//                 throw new Error(err);
//             })
//         })
//     }
//     catch(err){
//         res.status(404).json(err);
//     }
// }

exports.updateTransactionStatus = async (req,res) => {

    try{
        const { payment_id, order_id} = req.body;
      const order =   await Order.findOne({where: {orderid:order_id}})

        const promise1 =     order.update({ paymentid: payment_id, status:'SUCCESSFUL'})

         const promise2 =    req.user.update({ isPremiumUser: true})

         Promise.all([promise1,promise2])
         .then(()=>{
            return res.status(202).json({success: true, message:"Transaction Successful",token: generateAccessToken(req.user.id,req.user.name,true)});
         })
                  
    }
    catch(err){
        res.status(404).json(err);
    }
}


// exports.updateFailedTransactionStatus = (req,res) => {

//     try{
//         const orderId = req.body.order_id;

//         Order.findOne({where: {orderid: orderId}}).then(order => {

//             order.update({status:'FAILED'}).then(()=>{
//                 return res.status(202).json({successful:true, message:"database updated"})
//             })
//         })
//         .catch((err)=>{
//             res.status(404).json({message:`${err}`})
//         })
//     }
//     catch(err){
//         res.status(404).json(err);
//     }
// }

exports.updateFailedTransactionStatus = async (req,res) => {

    try{
        const orderId = req.body.order_id;

        const order = await Order.findOne({where: {orderid: orderId}})

            await order.update({status:'FAILED'})

           return res.status(202).json({successful:true, message:"database updated"})
            
    }
    catch(err){
        res.status(404).json(err);
    }
}