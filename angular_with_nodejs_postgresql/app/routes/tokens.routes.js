module.exports = app => {
    const tokens = require("../controllers/tokens.controller.js");
    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", tokens.create);

    // Retrieve all Tutorials
    router.get("/", tokens.findAll);

    // Retrieve all published Tutorials
    //router.get("/published", tokens.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", tokens.findOne);

    // Update a Tutorial with id
    router.put("/:id", tokens.update);

    // Delete a Tutorial with id
    router.delete("/:id", tokens.delete);

    // Delete all token
    router.delete("/", tokens.deleteAll);
    
    app.use('/api/tokens', router);
  };