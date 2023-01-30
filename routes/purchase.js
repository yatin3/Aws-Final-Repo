const express = require('express');

const purchaseController = require('../controllers/purchase');

const userauthentication = require('../middleware/auth');

const router = express.Router();

router.get('/premiummembership', userauthentication.authenticate, purchaseController.purchasepremium);

router.post('/updatetransactionstatus',userauthentication.authenticate,purchaseController.updateTransactionStatus);

router.post('/updateFailedtransactionstatus',userauthentication.authenticate,purchaseController.updateFailedTransactionStatus);


module.exports = router;