const express = require('express');
const bodyParser = require('body-parser');
// const helmet = require('helmet');
// const compression = require('compression');
// const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');
const purchaseRoute = require('./routes/purchase');
const premiumfeatureRoute = require('./routes/premiumFeature');
const ForgotPasswordRoute = require('./routes/forgotPassword');

const accessLogStream = fs.createWriteStream(
   path.join(__dirname,'access.log'),
   {flags: 'a'}
);

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/orders');
const ForgotPassword = require('./models/forgotpassword');
const DownloadedFiles = require('./models/downloadedfile');

const cors = require('cors');
app.use(cors());

const sequelize = require('./util/database');

// app.use(helmet());
// app.use(compression());
// app.use(morgan('combined', { stream: accessLogStream}));

app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use('/user',userRoute);
app.use('/expense',expenseRoute);
app.use('/purchase',purchaseRoute);
app.use('/premium',premiumfeatureRoute);
app.use('/password',ForgotPasswordRoute);

app.use((req,res) => {
   console.log('urll',req.url);
   console.log("added extra logs");
   console.log(path.join(__dirname,`public/${req.url}`));
     res.sendFile(path.join(__dirname,`public/login.html`));
});

//console.log(process.env.NODE_ENV);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);

User.hasMany(DownloadedFiles);
DownloadedFiles.belongsTo(User);

sequelize.sync().then((m) => app.listen(process.env.PORT || 3000)).catch(err => console.log(err));

// "start": "NODE_ENV=production User_Key=AKIAS2C7JSQF6IB2OHCV User_Secret=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 Token_Key=87659937449fgjdh73990303 Razorpay_Key=rzp_test_oEV9ZO0VVVpcgP Razorpay_Secret=dhsb4a7PgnSMMRMdKuj9FtIn API_KEY=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  node app.js",
//"start:dev": "nodemon app.js"