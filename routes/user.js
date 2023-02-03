const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const expenseController = require('../controllers/expense');

const userauthentication = require('../middleware/auth');

router.post('/signup',userController.postUser);

router.post('/login',userController.checkUser);

router.get('/download',userauthentication.authenticate,expenseController.downloadexpense);

router.get('/getDownloads',userauthentication.authenticate,expenseController.getDownloads);


module.exports = router;