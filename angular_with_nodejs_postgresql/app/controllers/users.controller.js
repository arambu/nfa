const db = require("../models");
const User = db.users;
const Token = db.tokens;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const email = require("../services/send_email.js");
const verificationToken = require("../services/verification_token.js");

function isIdUnique (email) {
  return User.count({ where: { email: email } })
    .then(count => {
      if (count != 0) {
        return false;
      }
      return true;
  });
}

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.name && !req.body.email) {
       res.status(400).json({'status':'failed', 'message': "Content can not be empty!"});
      return;
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
          isIdUnique(req.body.email).then(isUnique => {
            if (isUnique) {
              const user = {
                name: req.body.name,
                last_name: req.body.last_name,
                password: hash,
                email: req.body.email,
                role: req.body.role,
                permission: req.body.permission,
              };
              User.create(user)
              .then(user => {
                const accessToken = jwt.sign( {email: req.body.email}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60});
                const token = {
                  token: accessToken,
                  token_type: "validation_email",
                  userId: user.id
                };
                Token.create(token)
                .then(token => {
                  email.send_email(req.body.email, req.body.name, accessToken);
                  res.status(200).json({'status':'ok', 'message': accessToken});
                })
                .catch(err => {
                  res.status(500).json({'status':'failed', 'message': err.message || "Some error occurred while creating the User"});
                });
              })
              .catch(err => {
                res.status(500).json({'status':'failed', 'message': "Some error occurred while creating the User"});
              });
             } else {
              res.status(409).json({'status':'failed', 'message': "Email already exist"});
             }
          });
      });
    })
};  

// Update user password
exports.updatePassword = (req, res) => {
  var email = verificationToken.verificationToken(req.body.token);

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      const user = {
        password: hash,
      };
      User.update(user, {
        where: { email: email }
      })
      .then(num => {
        if (num == 1) {
          res.status(200).json({'status':'ok', 'message': "User was updated successfully"});
        } else {
          res.status(500).json({'status':'failed', 'message': "Cannot update User"});
        }
      })
      .catch(err => {
        res.status(500).json({'status':'failed', 'message': "Error updating User"});
      });
    });
  })
};

exports.delete = (req, res) => {
  var token = req.body.token || req.query.token || req.headers["x-access-token"];
  var email = verificationToken.verificationToken(token);

  User.findOne({
    where: { email: email }
  })
  .then(user => {
    if (user) {
      Token.findAll({ 
        where: { userId: user.id }
      })
      .then(data => {
        for (var i = 0; i < data.length; i++) {
          Token.destroy({
            where: { id: data[i].id }
          })
          .then(user => {    
            if (user == 1) {
            } else {
              res.send({message: `Cannot delete User`});
            }
          })
          .catch(err => {
            res.status(500).json({'status':'failed', 'message': "Could not delete User", 'error': err});
          });
        }
        User.destroy({
          where: { email: email }
        })
        .then(user => {
          if (user == 1) {
            res.send({message: "User was deleted successfully!"});
          } else {
            res.send({message: `Cannot delete User`});
          }
        })
        .catch(err => {
          res.status(500).json({'status':'failed', 'message': "Could not delete User", 'error': err});
        });
      })
      .catch(err => {
        res.status(500).json({'status':'failed', 'message': err.message || "Error token."});
      });
    } else {
      return res.status(409).json({'status':'failed', 'message': "Token is wrong"});
    }
  })
  .catch(err => {
    return res.status(409).json({'status':'failed', 'message': "Token is wrong"});
  });

};

/*
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).json({'status':'failed', 'message': err.message || "Some error occurred while retrieving tutorials."});
      });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({ message: `Cannot find Tutorial`});
        }
      })
      .catch(err => {
        res.status(500).json({'status':'failed', 'message': "Error retrieving Tutorial"});
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(500).json({'status':'failed', 'message': "User was updated successfully"});
      } else {
        res.status(500).json({'status':'failed', 'message': "Cannot update User"});
      }
    })
    .catch(err => {
      res.status(500).json({'status':'failed', 'message': "Error updating User"});
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({message: "User was deleted successfully!"});
        } else {
          res.send({message: `Cannot delete User with id=${id}. Maybe User was not found!`});
        }
      })
      .catch(err => {
        res.status(500).json({'status':'failed', 'message': "Could not delete User"});
      });
  };  

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Users were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({message:err.message || "Some error occurred while removing all users."});
      });
  };
  */
