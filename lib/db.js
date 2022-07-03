let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

const { Pool } = require("pg");
const db = new Pool(dbParams);

const getAllCombinations = () => {
  return db
    .query(
      `SELECT colours.value
       FROM combinations
       JOIN colours ON colours.id = combinations;`
    )
    .then(result=>result.rows)
    .catch(err => console.error(err.stack));
};

module.exports = {
  db,
  getAllCombinations,
};
