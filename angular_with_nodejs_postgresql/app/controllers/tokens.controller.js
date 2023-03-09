const db = require("../models");
const Token = db.tokens;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.token) {
      res.status(400).json({'status':'failed', 'message': "Content can not be empty!"});
      return;
    }
    // Create a Tutorial
    const token = {
      token: req.body.token,
      token_type: req.body.token_type,
      expires_at: req.body.expires_at
    };
    // Save Tutorial in the database
    Token.create(token)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).json({'status':'failed', 'message': "Some error occurred while creating the Token."});
    });
};  

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Token.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(400).json({'status':'failed', 'message': err.message || "Some error occurred while retrieving tokens."});
      });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Token.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).json({'status':'failed', 'message': "Cannot find Token"});
        }
      })
      .catch(err => {
        res.status(500).json({'status':'failed', 'message': "Error retrieving Token with id=" + id});
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Token.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Token was updated successfully." });
      } else {
        res.status(500).json({'status':'failed', 'message': "Cannot update Token with"});
      }
    })
    .catch(err => {
      res.status(500).json({'status':'failed', 'message': "Error updating Token"});
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Token.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({ message: "Token was deleted successfully!" });
        } else {
          res.status(500).json({'status':'failed', 'message': "Cannot delete Token"});
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Token with id=" + id
        });
      });
  };  

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Token.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tokens were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).json({'status':'failed', 'message':  err.message || "Some error occurred while removing all tokens." });
      });
  };

// Find all published Tutorials
/*
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  }; 
  */