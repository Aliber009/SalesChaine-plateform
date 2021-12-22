const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const organizationController=require("../controllers/orgController")
const reqAuth = require('../middlewares/safeRoutes').reqAuth;


router.post('/all', organizationController.getAll);
router.post('/create', organizationController.create) 
router.post('/edit',organizationController.edit);
router.post('/delete',organizationController.delete);

module.exports = router;
