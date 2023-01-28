const User = require('../models/user');
const bcrypt = require('bcrypt');
const Expense = require('../models/expense');

function isStringInvalid(s){

   if(s.length === 0 ||s == null ){
     return true;
   }
   return false;
}

exports.postUser = (req,res,next)=>{
    
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

   //  if(user == null || user.length === 0|| email == null || email.length === 0|| password.length === 0||password == null){
   //    return res.status(400).json({error : "Bad Parameters . Something is Missing"});
   //  }
  
   try{
      if(isStringInvalid(user) || isStringInvalid(email) || isStringInvalid(password)){
         return res.json(400).json({error: "Bad Parameters . Something is Missing"});
       }
   
       bcrypt.hash(password,10, async (err,hash) => {
         await User.create({
            name:user,
            email:email,
            password: hash
         })
         res.status(201).json({message: "Successfully created new user"})
   })
   }
     catch(err){
      res.status(500).json({message: "user already exist"});
      };

};

exports.checkUser = async (req,res,next) => {
     
    const email = req.body.email;
    const password = req.body.password;

    try{
      if(isStringInvalid(email) || isStringInvalid(password)){
         return res.json(400).json({message: "Bad Parameters . Something is Missing",success: false});
       }
   
       const user = await User.findOne({ where: { email:email } })
         
         if(user !== null ){

            bcrypt.compare(password ,user.dataValues.password,(err,result)=>{

               if(err){
                  // return res.status(500).json({success:true, message:"something went wrong"});
                  throw new Error("Something Went Wrong");
               }
               if(result === true){
                  return res.status(201).json({message:"user logged in successfully", success:true});
               }
               else{
                  return res.status(401).json({message:"user not authorized" , success: false});
               }
            })
        }
         else {
            return res.status(404).json({message:"user not found" , success: false});
         }
   
    }
    catch(err){
      console.log(err);
       return res.status(500).json(err);
    }

};

exports.postExpense = async (req,res,next) =>{

   const amount = req.body.amount;
   const description = req.body.description;
   const category = req.body.category;

   try{
     const answer =  await Expense.create({
         amount:amount,
         description:description,
         category:category
      })

      res.status(201).json(answer);
 }
 catch(err){
   console.log(err);
    res.status(500).json(err);
 }

};

exports.getExpense = async (req,res,next) => {
  
   try{
      const Expenses = await Expense.findAll();
      console.log(Expenses);
      res.status(201).json(Expenses); 
   }
  catch(err){
      res.status(404).json(err);
  }

};

exports.deleteExpense = async(req,res,next) => {

    const id = req.params.ExpenseId;

   try{
        await Expense.destroy({
         
         where :{
           id:id
         }

        });
   }
   catch(err){
     res.status(404).json(err);
   }
};