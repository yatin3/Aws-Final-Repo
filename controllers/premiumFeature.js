const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');

// exports. getUserLeaderBoard = async (req,res) =>{
//     try{
//        const users = await User.findAll();
//        const expenses = await Expense.findAll();
//        const userAggregatedExpenses = {};

//        expenses.forEach((expense)=>{
       
//         if(userAggregatedExpenses[expense.UserId]){
//             userAggregatedExpenses[expense.UserId] =   userAggregatedExpenses[expense.UserId] +Number(expense.amount);
//         }else{
//             userAggregatedExpenses[expense.UserId] = Number(expense.amount);
//         }
//        })
      
//        let userLeaderBoardDetails = [];
//        users.forEach((user)=>{
//         userLeaderBoardDetails.push({name:user.name, total_cost:userAggregatedExpenses[user.id]||0});
//        })
//       userLeaderBoardDetails.sort((a,b)=> b.total_cost-a.total_cost)
//        res.status(200).json(userLeaderBoardDetails);
//     }
//     catch(err){
//       console.log(err);
//       res.status(500).json(err);
//     }
// }

// exports. getUserLeaderBoard = async (req,res) =>{
//     try{
//        const users = await User.findAll({
//          attributes: ['id','name']
//        });
//        const expenses = await Expense.findAll({
//          attributes: ['UserId','amount']
//        });
//        const userAggregatedExpenses = {};

//        expenses.forEach((expense)=>{
       
//         if(userAggregatedExpenses[expense.UserId]){
//             userAggregatedExpenses[expense.UserId] =   userAggregatedExpenses[expense.UserId] +Number(expense.amount);
//         }else{
//             userAggregatedExpenses[expense.UserId] = Number(expense.amount);
//         }
//        })
      
//        let userLeaderBoardDetails = [];
//        users.forEach((user)=>{
//         userLeaderBoardDetails.push({name:user.name, total_cost:userAggregatedExpenses[user.id]||0});
//        })
//       userLeaderBoardDetails.sort((a,b)=> b.total_cost-a.total_cost)
//        res.status(200).json(userLeaderBoardDetails);
//     }
//     catch(err){
//       console.log(err);
//       res.status(500).json(err);
//     }
// }

// exports. getUserLeaderBoard = async (req,res) =>{
//   const expenses = await Expense.findAll();
//     try{
//        const leaderBoardOfUser = await User.findAll({
//     //    attributes: ['id','name',[sequelize.fn('sum', sequelize.col('expenses.amount')),'total_cost']],
//         attributes: ['id','name','expenses.amount'],
       
//        include: [
//         {
//           model:Expense,
//           attributes:['id','amount','category']
//         }
//        ],

//       // group: ['User.id']

//       });
//       console.log(leaderBoardOfUser);
//       res.status(200).json(leaderBoardOfUser);
//       }

//     catch(err){
//       console.log(err);
//       res.status(500).json(err);
    
// }

exports. getUserLeaderBoard = async (req,res) =>{
  
    try{
       const leaderBoardOfUser = await User.findAll({
        attributes: ['id','name',[sequelize.fn('sum', sequelize.col('expenses.amount')),'total_cost']],
       
       include: [
        {
          model:Expense,
          attributes:[]
        }
       ],

       group: ['User.id'],
       order:[['total_cost',"DESC"]]

      });
      console.log(leaderBoardOfUser);
      res.status(200).json(leaderBoardOfUser);
      }

    catch(err){
      console.log(err);
      res.status(500).json(err);
    
}

}

