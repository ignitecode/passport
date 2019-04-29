'use strict';
module.exports = (sequelize, DataTypes) => {
  const accounts = sequelize.define('accounts', {
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    balance: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  accounts.associate = function(models) {
    // associations can be defined here
  };
  return accounts;
};