const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const deviceController=require("../controllers/deviceController")
const reqAuth = require('../middlewares/safeRoutes').reqAuth;


router.post('/all',deviceController.getAll );
router.post('/create',deviceController.create ) 
router.post('/edit',deviceController.edit);
router.post('/delete',deviceController.delete);

module.exports = router;
