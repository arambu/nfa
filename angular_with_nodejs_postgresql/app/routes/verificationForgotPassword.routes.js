module.exports = app => {
    const verificationForgotPassword = require("../controllers/verificationForgotPassword.controller.js");
    var router = require("express").Router();

    // 
    router.post("/", verificationForgotPassword.verification);

    // Send email verification
    router.post("/send", verificationForgotPassword.send);

    app.use('/api/forgot-password', router);
  };