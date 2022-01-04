const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const groupController=require("../controllers/groupController")

router.post('/adddevices',groupController.addDevices);
router.post('/create',groupController.create);
router.post('/delete',groupController.delete);
router.post('/all',groupController.getAll);
router.get('/allgroups',groupController.getgroups);

module.exports = router;