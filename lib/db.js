let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
}

const { Pool } = require("pg");
const db = new Pool(dbParams);

const getAllCombinations = () => {
  return db
    .query(
      `SELECT combinations.id AS combination, colours.value AS colour
      FROM colours_combinations
      JOIN colours ON colours.id = colours_combinations.colour_id
      JOIN combinations ON combinations.id = colours_combinations.combination_id
      GROUP BY colours_combinations.combination_id, colours_combinations.id, colours.id, combinations.id
      ORDER BY combination;`
    )
    .then((result) => {
      const combinations = [];
      console.log(result.rows);
      for (const row of result.rows) {
        combinations.push(row);
      }
      return {combinations};
    })
    .catch((err) => console.error(err.stack));
};


const getCombination = (id) => {
  return db
    .query(
      `SELECT combinations.id AS combination, colours.value AS colour
      FROM colours_combinations
      JOIN colours ON colours.id = colours_combinations.colour_id
      JOIN combinations ON combinations.id = colours_combinations.combination_id
      WHERE combinations.id = $1
      GROUP BY colours_combinations.combination_id, colours_combinations.id, colours.id, combinations.id
      ORDER BY combination;`,[id]
    )
    .then((result) => {
      const combination = [];
      for (const row of result.rows) {
        combination.push(row.colour);
      }
      return {combination};
    })
    .catch((err) => console.error(err.stack));
};


module.exports = {
  db,
  getAllCombinations,
  getCombination
};
