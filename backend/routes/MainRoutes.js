/**
 * Created by Sunil Kumar
 */
var express = require('express');
var mainController = require('../controllers/MainController');
var router = express.Router();
var app = require('../../ApplicationInstance');


//===============================================================
//================== NORMAL GET REQUEST ROUTER ========================
//===============================================================

//home page 
router.route('/').get(mainController.home);

// db request pages
router.route('/search').get(mainController.search);
router.route('/update').get(mainController.update);
router.route('/insert').get(mainController.insert);
router.route('/database').get(mainController.database);
router.route('/report').get(mainController.report);
router.route('/manager').get(mainController.manager);
router.route('/sql').get(mainController.sql);

router.route('/login').get(mainController.login);
router.route('/signup').get(mainController.signup);
router.route('/logout').get(mainController.logout);

//==============================================================
//================  SPECIAL GET REQUEST ========================
//================ NOT TO BE USED =============================
//=============================================================



//==============================================================
//================== POST REQUEST ROUTER =======================
//==============================================================
router.route('/login').post(mainController.loginpost);
router.route('/signup').post(mainController.signuppost);



module.exports = router;