
//Transofrm every mangoose function to Sequilze
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const reqAuth = require('../middlewares/safeRoutes').reqAuth;
const userController=require('../controllers/userController')







router.post('/all',userController.getAll);
router.post('/edit',userController.edit );
router.post('/check/resetpass/:id', userController.checkrestepass);
router.post('/resetpass/:id', userController.resetpass);
router.post('/forgotpassword', userController.forgotpass);
router.post('/register', userController.register);
// Create User as Admin
router.post('/create', reqAuth, userController.create);
//delete user
router.post('/delete',userController.delete);
router.post('/confirm/:id', userController.confirm);
router.post('/login', userController.login);
router.post('/checkSession', reqAuth,function(req, res) {
  
  res.json({success: true});
});
router.post('/logout', reqAuth, userController.logout);
router.post('/associate',reqAuth,userController.associate);
router.post('/findassociations',reqAuth,userController.findAssociations);
router.post('/removeDeviceAssociations',userController.removeDeviceAssociations);
router.post('/registerassociate',userController.registerAsAssociciate);
//router.post('/adddevs',userController.setdevices);




module.exports = router;
