
const Expense = require('../models/expense');

exports.postExpense = async (req,res,next) =>{

    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
 
    //console.log(req.user.id);
    try{
      const answer =  await Expense.create({
          amount:amount,
          description:description,
          category:category,
          UserId: req.user.id
       })

    //    const answer =  await req.user.createExpense({
    //     amount:amount,
    //     description:description,
    //     category:category,
    //  })

 
       res.status(201).json(answer);
  }
  catch(err){
    console.log(err);
     res.status(500).json(err);
  }
 
 };
 
 exports.getExpense = async (req,res,next) => {
   
    try{
      // const Expenses = await Expense.findAll({where: {userId: req.user.id}});
       //const Expenses = await req.user.getExpenses();
     const Expenses = await Expense.findAll();

      // console.log(Expenses);
       res.status(201).json(Expenses); 
    }
   catch(err){
       res.status(404).json(err);
   }
 
 };
 
 exports.deleteExpense = async(req,res,next) => {
 
     const id = req.params.ExpenseId;
 
    try{
       const user =   await Expense.destroy({
          
          where :{
            id:id,
            UserId:req.user.id
          }
 
         });

        if(user === 0){
           throw new Error("message: u cannot delete");
        }else{
           res.status(201).json({success:true,message:"successfully deleted"});
        }
    }
    catch(err){
        console.log(err);
      res.status(404).json(`${err}`);
    }
 };