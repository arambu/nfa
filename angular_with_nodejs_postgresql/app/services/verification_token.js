const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  verificationToken: function (token) {

    if (!token) {
      return -1;
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      var user = decoded;

      return user.email;
      } catch (err) {
        console.log("err = " + err);
        return -1;
      }
  }
};