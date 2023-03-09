const db = require("../models");
const User = db.users;
const Token = db.tokens;
const email = require("../services/send_email.js");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

// Forgot password
exports.send = (req, res) => {
  User.findOne({
    where: { email: req.body.email },
  })
  .then(user => {
    if (user.email === req.body.email) {
    
      Token.findOne({
        where: { userId: user.id, token_type: "forgot_password" },
      })
      .then(token => {
        var accessToken = jwt.sign( {email: req.body.email}, process.env.TOKEN_SECRET, {expiresIn: 60 * 60});

        if (token == null) {
        //if (token.userId === user.id && token.token_type === "forgot_password") {
          const tokenCreate = {
            token: accessToken,
            token_type: "forgot_password",
            userId: user.id
          };

          Token.create(tokenCreate)
          .then(token => {
            email.send_email_forgot_password(req.body.email, accessToken);
            return res.status(200).json({'status':'ok', 'message': accessToken});
          })
          .catch(err => {
            return res.status(404).json({'status':'failed', 'message':''});
          });
        } else {
          const tokenUpdate = {
            token: accessToken,
          };

          Token.update(tokenUpdate, {
            where: { userId: user.id, token_type: "forgot_password" }
          })
          .then(token => {
            email.send_email_forgot_password(req.body.email, accessToken);
            return res.status(200).json({'status':'ok', 'message': accessToken});
          })
          .catch(err => {
            return res.status(404).json({'status':'failed', 'message':'email already exist'});
          });
        }
      });
    } else {
      res.status(409).json({'status':'failed', 'message': "Token is wrong"});
    }
  })
};

exports.verification = (req, res) => {
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