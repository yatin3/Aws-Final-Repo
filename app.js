const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');
const purchaseRoute = require('./routes/purchase');
const premiumfeatureRoute = require('./routes/premiumFeature');
const ForgotPasswordRoute = require('./routes/forgotPassword');

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/orders');
const ForgotPassword = require('./models/forgotpassword');
const DownloadedFiles = require('./models/downloadedfile');

const cors = require('cors');
app.use(cors());

const sequelize = require('./util/database');

app.use(bodyParser.json());

app.use('/user',userRoute);
app.use('/expense',expenseRoute);
app.use('/purchase',purchaseRoute);
app.use('/premium',premiumfeatureRoute);
app.use('/password',ForgotPasswordRoute);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);

User.hasMany(DownloadedFiles);
DownloadedFiles.belongsTo(User);

sequelize.sync().then((m) => app.listen(process.env.PORT || 3000)).catch(err => console.log(err));

