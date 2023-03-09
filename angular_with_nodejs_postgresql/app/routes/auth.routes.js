module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    var router = require("express").Router();

    // Sign in user
    router.post("/", auth.auth);

    // Verification token user
    router.post("/verification", auth.authenticateToken);
    
    app.use('/api/auth', router);
  };