const Sequelize = require("sequelize");

module.exports = new Sequelize("codegig", "postgres", "05903876assia", {
  host: "localhost",
  dialect: "postgres",
  //   operatorsAliases: false,
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
});
