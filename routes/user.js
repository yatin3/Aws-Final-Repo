const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup',userController.postUser);

router.post('/login',userController.checkUser);

router.post('/addexpense',userController.postExpense);

router.get('/expense',userController.getExpense);

router.get('/deleteExpense/:ExpenseId',userController.deleteExpense);

module.exports = router;