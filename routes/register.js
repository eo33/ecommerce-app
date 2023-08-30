const express = require('express');
const router = express.Router();

// @route   POST register/create
// @desc    Register user
// @acess   Public

router.get("/create", (req,res)=>{
    res.send('hi')
})


module.exports = router; 