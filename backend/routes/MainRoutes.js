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
router.route('/database').post(mainController.database1);
router.route('/report').get(mainController.report);

router.route('/sql').get(mainController.sql);

router.route('/login').get(mainController.login);
router.route('/signup').get(mainController.signup);

//==============================================================
//================  SPECIAL GET REQUEST ========================
//================ NOT TO BE USED =============================
//=============================================================



//==============================================================
//================== POST REQUEST ROUTER =======================
//==============================================================

router.route('/mem').post(mainController.mem);


module.exports = router;