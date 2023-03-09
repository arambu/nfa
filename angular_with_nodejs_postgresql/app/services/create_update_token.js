const db = require("../models");
const Token = db.tokens;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  createToken: function (email, token_type, expiresIn, userId, res) {
    const accessToken = jwt.sign( {email: email}, process.env.TOKEN_SECRET, {expiresIn: expiresIn});
    const token = {
      token: accessToken,
      token_type: token_type,
      userId: userId
    };
    
    Token.create(token)
      .then(token => {
        return res.status(200).json({'status':'ok', 'message': accessToken});
      })
      .catch(err => {
        return res.status(404).json({'status':'failed', 'message':'email already exist'});
      });
  },
  
  updateToken: function (email, token_type, expiresIn, userId, res) {
    const accessToken = jwt.sign( {email: email}, process.env.TOKEN_SECRET, {expiresIn: expiresIn});
    const token = {
      token: accessToken,
      token_type: token_type,
      userId: userId
    };

    Token.update(token, {
      where: {token_type: token_type, userId: userId }
    })
    .then(num => {
      if (num == 1) {
        return res.status(200).json({'status':'ok', 'message': accessToken});
      } else {
        return res.status(404).json({'status':'failed', 'message': 'Cannot update Token with emailwith email = ' + email});
      }
    })
    .catch(err => {
      return res.status(404).json({'status':'failed', 'message': 'Error updating Token with email = ' + email});
    });
  }
};
