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
router.route('/manager').get(mainController.manager);
router.route('/country').get(mainController.country);
router.route('/player').get(mainController.player);
router.route('/match').get(mainController.match);
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
router.route('/player/player').post(mainController.playerList);
router.route('/player/stat').post(mainController.playerStat);
router.route('/country/list').post(mainController.countryList);
router.route('/country/add').post(mainController.countryAdd);



module.exports = router;