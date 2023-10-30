import dbConfig from "../config/dbConfig.js";
import authorSchema from "./author.js";
import blogSchema from "./blog.js";

import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  dbConfig.DBCONFIG.DB,
  dbConfig.DBCONFIG.USER,
  dbConfig.DBCONFIG.PASSWORD,
  {
    host: dbConfig.DBCONFIG.HOST,
    port: dbConfig.DBCONFIG.PORT,
    dialect: dbConfig.DBCONFIG.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.DBCONFIG.pool.max,
      min: dbConfig.DBCONFIG.pool.min,
      acquire: dbConfig.DBCONFIG.pool.acquire,
      idle: dbConfig.DBCONFIG.pool.idle,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.User = authorSchema(sequelize, DataTypes);
db.Blog = blogSchema(sequelize, DataTypes);

db.Blog.belongsTo(db.User, { foreignKey: "authorId", targetKey: "authorId" });

db.sequelize.sync({ force: false }).then(() => {
  console.log("Yes resync done");
});

export default db;
