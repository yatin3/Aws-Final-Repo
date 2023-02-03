const AWS = require('aws-sdk');

const uploadToS3 = (data,filename) => {
    
    const BUCKET_NAME = 'expenseapp';
    const IAM_USER_KEY = 'AKIAS2C7JSQF6IB2OHCV';
    const IAM_USER_SECRET = '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';
    
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey:IAM_USER_SECRET,
     // Bucket:BUCKET_NAME
    });
   
    //if we donot want to create bucket
   
        
       var params = {
          Bucket: BUCKET_NAME,
          Key: filename,
          Body: data,
          ACL:'public-read'
       }
 
       return new Promise((resolve,reject)=>{
          s3bucket.upload(params,(err, s3response) => {
             if(err){
                console.log('Something went wrong',err);
                reject(err);
             }else{
                console.log('success',s3response);
                resolve(s3response.Location);
             }
          })
       })
      
  }

  module.exports = {
    uploadToS3
  }
 