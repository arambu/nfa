module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define("token", {
    token: {
      type: Sequelize.STRING
    },
    token_type: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
         model: 'users', // 'users' refers to table name
         key: 'id', // 'id' refers to column name in fathers table
      }
   }
    /*
    expires_at: {
      type: Sequelize.STRING
    }
    */
  });
  return Token;
};