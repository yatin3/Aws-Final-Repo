const express = require('express');

const router = express.Router();

const forgotPasswordController = require('../controllers/forgotpassword');

router.get('/updatepassword/:resetpasswordid',forgotPasswordController.updatepassword);

router.get('/resetpassword/:id',forgotPasswordController.resetpassword);

router.post('/forgotpassword',forgotPasswordController.forgotPasswrd);

module.exports = router;