const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expense');
const userauthentication = require('../middleware/auth');

router.post('/addexpense',userauthentication.authenticate, expenseController.postExpense);

router.get('/expense', userauthentication.authenticate, expenseController.getExpense);

router.delete('/deleteExpense/:ExpenseId',userauthentication.authenticate, expenseController.deleteExpense);

module.exports = router;