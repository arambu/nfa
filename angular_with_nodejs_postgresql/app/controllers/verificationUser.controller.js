const db = require("../models");
const User = db.users;
const Token = db.tokens;
const email = require("../services/send_email.js");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

exports.sendEmail = (req, res) => {
    if (!req.body.email) {
      res.status(400).json({'status':'failed', 'message': "Content can not be empty!"});
      //return;
    }

    User.findOne({email: req.body.email})
    .then(user => {
      if (user.email == req.body.email) {
        if (user.verified_on != "ok") {
          const accessToken = jwt.sign( {email: req.body.email}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 });
          const token = {
            token: accessToken,
            token_type: "validation_email",
            userId: user.id
          };

          Token.update(token, {
            where: { userId: user.id, token_type: "validation_email" }
          })
          .then(num => {
            if (num == 1) {
              email.send_email(user.email, user.name, accessToken);
              res.send(accessToken);
            } else {
              res.status(500).json({'status':'failed', 'message': "Cannot update User"});
            }
          })
          .catch(err => {
            res.status(500).json({'status':'failed', 'message': "Error updating Token with email = " + req.body.email});
          });
        } else {
          res.status(404).json({'status':'failed', 'message': "User is already vefiry"});
        }
      } else {
        res.status(404).json({'status':'failed', 'message': "Cannot find email"});
      }
    })
    .catch(err => {
      res.status(500).json({'status':'failed', 'message': "Error retrieving User with email"});
    });
  };

exports.verification = (req, res) => {
  var token = req.body.token;

    if (!token) {
      return res.status(403).json({'status':'failed', 'message': "A token is required for authentication"});
    }
    try {
      var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;

      User.findOne({
        where: { email: req.user.email },
      })
      .then(user => {
        if (user.email === req.user.email) {
          if (user.verified_on === "ok") {
            return res.status(409).json({'status':'failed', 'message': "User already verified"});
          }
          Token.findAll({ 
            where: { userId: user.id, token: token }
          })
          .then(data => {
            const user = {
              verified_on: "ok"
            };

            User.update(user, {
              where: { email: req.user.email }
            })
            .then(num => {
              if (num == 1) {
                 res.status(200).json({'status':'ok', 'message': "User verify"});
              } else {
                res.status(500).json({'status':'failed', 'message': "Error updating User with email = " + req.user.email});
              }
            })
            .catch(err => {
              res.status(500).json({'status':'failed', 'message': "Error updating User with email = " + req.user.email});
            });
          })
          .catch(err => {
            res.status(500).json({'status':'failed', 'message': err.message || "Error token."});
          });  
        } else {
          res.status(409).json({'status':'failed', 'message': "Token is wrong"});
        }
    })
  } catch (err) {
    return res.status(401).json({'status':'failed', 'message': "Invalid Token"});
  }
};