const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const groupController=require("../controllers/groupController");
const { reqAuth } = require('../middlewares/safeRoutes');

router.post('/adddevices',groupController.addDevices);
router.post('/create',reqAuth,groupController.create);
router.post('/delete',groupController.delete);
router.post('/all',reqAuth,groupController.getAll);
router.get('/allgroups',reqAuth,groupController.getgroups);

module.exports = router;