const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');

const User = require('./models/user');
const Expense = require('./models/expense');

const cors = require('cors');
app.use(cors());

const sequelize = require('./util/database');

app.use(bodyParser.json());

app.use('/user',userRoute);
app.use('/Expense',expenseRoute);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync().then((m) => app.listen(3000)).catch(err => console.log(err));

