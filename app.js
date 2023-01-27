const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const userRoute = require('./routes/user');

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

app.use('/user',userRoute);

app.listen(3000);