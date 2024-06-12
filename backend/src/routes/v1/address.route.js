const express=require("express");

const router=express.Router()

const { addAddress,getAddress,updateAddress,deleteAddress,getAddressByAddressId} = require('../../controllers/addressController');
// const { authenticate } = require('../../middlewares/authenticate');

// router.post('/create', authenticate, createAddress);
// router.get('/', authenticate, getAddress);
// router.put('/update', authenticate, updateAddress);
// router.delete('/delete/:addressId', authenticate, deleteAddress);
// module.exports = router;

router.post('/createAddress', addAddress);
router.get('/getAddress/:userId', getAddress);
router.get("/getAddressByAddressId/:addressId",getAddressByAddressId)
router.put('/updateAddress', updateAddress);
router.delete('/deleteAddress', deleteAddress);

module.exports = router;