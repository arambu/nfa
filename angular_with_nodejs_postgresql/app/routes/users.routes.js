module.exports = app => {
    const users = require("../controllers/users.controller.js");
    var router = require("express").Router();

    // Create a new User
    router.post("/", users.create);

    // Retrieve all User
    //router.get("/", users.findAll);

    // Retrieve all published User
    //router.get("/published", users.findAllPublished);

    // Retrieve a single User with id
    //router.get("/:id", users.findOne);

    // Update a User with id
    //router.put("/all/:id", users.update);

    // Delete a User with id
    //router.delete("/:id", users.delete);

    // Delete all user
    //router.delete("/", users.deleteAll);

    // Delete  user
    router.delete("/delete", users.delete);

    // Update password
    router.put("/update-password", users.updatePassword);

    app.use('/api/users', router);
  };