
const Expense = require('../models/expense');
const DownloadedFile = require('../models/downloadedfile');

const UserServices = require('../services/userservices');
const { RequestContactImportNewList } = require('sib-api-v3-sdk');
const S3Services = require('../services/s3services');

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
 
//  exports.getExpense = async (req,res,next) => {
   
//     try{
//       // const Expenses = await Expense.findAll({where: {userId: req.user.id}});
//        //const Expenses = await req.user.getExpenses();
//      const Expenses = await Expense.findAll();

//       // console.log(Expenses);
//        res.status(201).json(Expenses); 
//     }
//    catch(err){
//        res.status(404).json(err);
//    }
 
//  };

exports.getExpense = async (req,res,next) => {
   
   try{
     
      const page = req.query.page || 1;

      const rows = req.query.rows;

      console.log(rows);

      const Items_Per_Page = rows;

      const count = await Expense.count();

    const Expenses = await Expense.findAll({
      offset: (page-1) * Items_Per_Page,
      limit: Number(Items_Per_Page),
    });

     // console.log(Expenses);
      res.status(201).json({
         expenses:Expenses,
         currentPage: Number(page),
         hasNextPage:  Items_Per_Page*page < count,
         nextPage:Number(page)+1,
         hasPreviousPage:Number(page)>1,
         previousPage:Number(page)-1,
         lastPage:Math.ceil(count/Items_Per_Page)
      }); 
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

//  function uploadToS3(data,filename){
    
//    const BUCKET_NAME = 'expenseapp';
//    const IAM_USER_KEY = 'AKIAS2C7JSQF6IB2OHCV';
//    const IAM_USER_SECRET = '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';
   
//    let s3bucket = new AWS.S3({
//      accessKeyId: IAM_USER_KEY,
//      secretAccessKey:IAM_USER_SECRET,
//     // Bucket:BUCKET_NAME
//    });
  
//    s3bucket.createBucket(()=>{
       
//       var params = {
//          Bucket: BUCKET_NAME,
//          Key: filename,
//          Body: data
//       }
     
//       s3bucket.upload(params,(err, s3response) => {
//          if(err){
//             console.log('Something went wrong',err);
//          }else{
//             console.log('success',s3response);
//          }
//       })

//    });

//  }



 exports.downloadexpense = async (req,res,next)=>{
    
   try{
      const expenses = await UserServices.getExpenses(req);
      // console.log(expenses);
    
       const stringifiedExpenses = JSON.stringify(expenses);
       console.log(stringifiedExpenses);
    
       //if we want to override file content then keep same file name
       //const filename = 'Expense.txt';
    
       //if we donot want to override file content then provide different file name
    
       const userId = req.user.id;
    
       const filename = `Expense${userId}/${new Date()}.txt`
       const fileURL = await S3Services.uploadToS3(stringifiedExpenses,filename);

       await DownloadedFile.create({

         Download: fileURL,
         UserId: req.user.id
       })
    
       res.status(200).json({fileURL, success:true});
    
   }
   catch(err){
      res.status(500).json({fileURL:'', success:false, err:err});
   }
 }

 exports.getDownloads = async (req,res,next)=>{

      const downloads = await req.user.getDownloadedFiles();
      res.status(200).json(downloads);
 }