module.exports = app => {
    const emailVerification = require("../controllers/verificationUser.controller.js");
    var router = require("express").Router();

    // 
    router.post("/", emailVerification.verification);

    // Send email verification
    router.put("/send", emailVerification.sendEmail);
    
    app.use('/api/verification-user', router);
  };