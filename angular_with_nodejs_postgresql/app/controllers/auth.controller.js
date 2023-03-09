const db = require("../models");
const User = db.users;
const Token = db.tokens;
const createUpdateToken = require('../services/create_update_token');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.auth = (req, res) => {
  if (!req.body.name && !req.body.email) {
    res.status(400).json({'status':'failed', 'message': "Content can not be empty!"});
    return;
  }

  User.findOne({
    where: { email: req.body.email }
  })
    .then(user => {
      if (user.email === req.body.email) {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (result) {
            Token.findOne({ 
              where: { userId: user.id, token_type: "session_token" }
            })
            .then(data => {
              if (data) {
                createUpdateToken.updateToken(req.body.email, "session_token", 60 * 60, user.id, res);
              } else {
                createUpdateToken.createToken(req.body.email, "session_token", 60 * 60, user.id, res);
              }
            })
            .catch(err => {
              res.status(500).json({'status':'failed', 'message': err.message || "Error token."});
            });
          } else {
            res.status(409).json({'status':'failed', 'message': "Email or password is wrong"});
          }
        });
      } else {
         res.status(409).json({'status':'failed', 'message': "Email or password is wrong"});
      }
  })
};

exports.authenticateToken = (req, res) => {
  var token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({'status':'failed', 'message': "A token is required for authentication"});
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;

    User.findOne({
      where: { email: req.user.email }
    })
    .then(user => {
      if (user) {
        return res.status(200).json({'status':'ok', 'message': "Token verify"});
      } else {
        return res.status(409).json({'status':'failed', 'message': "Token is wrong"});
      }
    })
    .catch(err => {
      return res.status(409).json({'status':'failed', 'message': "Token is wrong"});
    });
  } catch (err) {
    return res.status(401).json({'status':'failed', 'message': "Invalid Token"});
  }
};