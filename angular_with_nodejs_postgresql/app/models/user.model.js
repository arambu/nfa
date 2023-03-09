module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    permission: {
      type: Sequelize.STRING
    },
    verified_on: {
      type: Sequelize.STRING
    }
  });
  return User;
};