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
      `SELECT combinations.id AS id, colours.value AS colour, combinations.user_id as created_by, combinations_users.user_id AS saved_by
        FROM colours_combinations
        JOIN colours ON colours.id = colours_combinations.colour_id
        JOIN combinations ON combinations.id = colours_combinations.combination_id
        LEFT JOIN combinations_users ON combinations.id = combinations_users.combination_id
        GROUP BY colours_combinations.combination_id, colours_combinations.id, colours.id, combinations.id, combinations_users.user_id
        ORDER BY id;`
    )
    .then((result) => {
      const combinations = {};
      for (const row of result.rows) {
        let colour = row.colour;
        colour = colour.toUpperCase();
        colour = colour.substring(1);
        const id = row.id;
        const createdBy = row.created_by;
        const savedBy = row.saved_by;
        if (combinations[id]) {
          if (!combinations[id].colours.includes(colour))
            combinations[id].colours.push(colour);
          if (!combinations[id].savedBy.includes(savedBy) && savedBy)
            combinations[id].savedBy.push(savedBy);
          combinations[id].saves = combinations[id].savedBy.length;
        } else {
          combinations[id] = {
            id,
            createdBy,
            saves: 0,
            savedBy: [],
            colours: [colour],
          };
        }
      }
      return { combinations };
    })
    .catch((err) => console.error(err.stack));
};

const getCombination = (id) => {
  return db
    .query(
      `SELECT combinations.id AS id, colours.value AS colour, combinations.user_id AS created_by, combinations_users.user_id AS saved_by
      FROM colours_combinations
      JOIN colours ON colours.id = colours_combinations.colour_id
      JOIN combinations ON combinations.id = colours_combinations.combination_id
      LEFT JOIN combinations_users ON combinations.id = combinations_users.combination_id
      WHERE combinations.id = $1
      GROUP BY colours_combinations.combination_id, colours_combinations.id, colours.id, combinations.id, combinations_users.user_id
      ORDER BY id;`,
      [id]
    )
    .then((result) => {
      const combination = {};
      for (const row of result.rows) {
        let colour = row.colour.toUpperCase();
        colour = colour.substring(1);
        const id = row.id;
        const createdBy = row.created_by;
        const savedBy = row.saved_by;
        if (combination[id]) {
          if (!combination[id].colours.includes(colour))
            combination[id].colours.push(colour);
          if (!combination[id].savedBy.includes(savedBy) && savedBy)
            combination[id].savedBy.push(savedBy);
          combination[id].saves = combination[id].savedBy.length;
        } else {
          combination[id] = {
            id,
            createdBy,
            saves: 0,
            savedBy: [],
            colours: [colour],
          };
        }
      }
      return { combination };
    })
    .catch((err) => console.error(err.stack));
};

const getAllColours = () => {
  return db
    .query(`SELECT * FROM colours;`)
    .then((result) => {
      const colours = [];
      for (const row of result.rows) {
        colours.push(row);
      }
      return { colours };
    })
    .catch((err) => console.error(err.stack));
};

const getColour = (id) => {
  return db
    .query(
      `SELECT * FROM colours
      WHERE colours.id = $1;`,
      [id]
    )
    .then((result) => {
      const colour = [];
      for (const row of result.rows) {
        colour.push(row);
      }
      return { colour };
    })
    .catch((err) => console.error(err.stack));
};

const getCombinationsForUser = (id) => {
  return db
    .query(
      `SELECT combinations.id AS id, colours.value AS colour, users.id AS created_by, combinations_users.user_id AS saved_by
      FROM colours_combinations
      JOIN colours ON colours.id = colours_combinations.colour_id
      JOIN combinations ON combinations.id = colours_combinations.combination_id
      JOIN users ON combinations.user_id = users.id
      LEFT JOIN combinations_users ON combinations.id = combinations_users.combination_id
      WHERE users.id = $1
      GROUP BY colours_combinations.combination_id, colours_combinations.id, colours.id, combinations.id, users.id, combinations_users.user_id
      ORDER BY id;`,
      [id]
    )
    .then((result) => {
      const combinations = {};
      for (const row of result.rows) {
        let colour = row.colour.toUpperCase();
        colour = colour.substring(1);
        const id = row.id;
        const createdBy = row.created_by;
        const savedBy = row.saved_by;

        if (combinations[id]) {
          if (!combinations[id].colours.includes(colour))
            combinations[id].colours.push(colour);
          if (!combinations[id].savedBy.includes(savedBy) && savedBy)
            combinations[id].savedBy.push(savedBy);
          combinations[id].saves = combinations[id].savedBy.length;
        } else {
          combinations[id] = {
            id,
            createdBy,
            saves: 0,
            savedBy: [],
            colours: [colour],
          };
        }
      }
      return { combinations };
    })
    .catch((err) => console.error(err.stack));
};

const updateLikes = (id) => {
  return db
    .query(
      `UPDATE combinations
      SET likes = likes + 1
      WHERE combinations.id = $1
      RETURNING *;`,
      [id]
    )
    .then((result) => {
      const combination = result.rows[0];
      return { combination };
    })
    .catch((err) => console.error(err.stack));
};

const saveCombination = (combination_id, user_id) => {
  return db
    .query(
      `INSERT INTO combinations_users
      (combination_id, user_id)
      SELECT $1, $2
      WHERE
      NOT EXISTS (
        SELECT * 
        FROM combinations_users
        WHERE combination_id = $1 AND user_id = $2
        LIMIT 1
      ) RETURNING *;`,
      [combination_id, user_id]
    )
    .then((result) => {
      const combination = result.rows[0];
      return { combination };
    })
    .catch((err) => console.error(err.stack));
};

const unsaveCombination = (combination_id, user_id) => {
  return db
    .query(
      `DELETE FROM combinations_users 
      WHERE combinations_users.combination_id = $1 AND combinations_users.user_id = $2
      RETURNING *;`,
      [combination_id, user_id]
    )
    .then((result) => {
      const combination = result.rows[0];
      console.log("In unsaveCombination", combination);
      return { combination };
    })
    .catch((err) => console.error(err.stack));
};

const showSavedCombinations = (user_id) => {
  return db
    .query(
      `SELECT combinations_users.combination_id, combinations_users.user_id AS saved_by, colours.value AS colour, combinations.user_id AS created_by
      FROM combinations_users
      JOIN colours_combinations ON combinations_users.combination_id = colours_combinations.combination_id
      JOIN colours ON colours_combinations.colour_id = colours.id
      JOIN combinations ON combinations_users.combination_id = combinations.id
      WHERE combinations_users.user_id = $1;`,
      [user_id]
    )
    .then((result) => {
      const combinations = {};
      for (const row of result.rows) {
        let colour = row.colour.toUpperCase();
        colour = colour.substring(1);
        const id = row.combination_id;
        const savedBy = row.saved_by;
        const createdBy = row.created_by;

        if (combinations[id]) {
          if (!combinations[id].colours.includes(colour))
            combinations[id].colours.push(colour);
          if (!combinations[id].savedBy.includes(savedBy) && savedBy)
            combinations[id].savedBy.push(savedBy);
          combinations[id].saves = combinations[id].savedBy.length;
        } else {
          combinations[id] = {
            id,
            colours: [colour],
            savedBy:[],
            createdBy,
            saves: 0,
          };
        }
      }
      return { combinations };
    })
    .catch((err) => console.error(err.stack));
};

const getUserWithEmail = function (email) {
  return db
    .query(
      `SELECT *
    FROM users
    WHERE email = $1`,
      [email.toLowerCase()]
    )
    .then((response) => response.rows[0])
    .catch((error) => error.message);
};

const addUser = function ({ email, password }) {
  return db
    .query(
      `INSERT INTO users (email, password)
      VALUES ($1,$2)
      RETURNING *;`,
      [email.toLowerCase(), password]
    )
    .then((response) => response.rows[0])
    .catch((error) => error.message);
};

const addCombinationsForUser = async (id, colours) => {
  const colours_lowercase = colours.map((colour) => `#${colour.toLowerCase()}`);
  let addColoursQuery = `INSERT INTO colours (value, user_id)
VALUES ('${colours_lowercase[0]}', ${id})`;
  for (let i = 1; i < colours_lowercase.length; i++) {
    addColoursQuery += `, ('${colours_lowercase[i]}', ${id}) `;
  }
  addColoursQuery += "RETURNING colours.id;";

  try {
    const result = await db.query(addColoursQuery);
    const colour_ids = result.rows.map((row) => row.id);
    try {
      const result = await db.query(
        `INSERT INTO combinations (user_id, likes)
      VALUES ($1, 0) RETURNING combinations.id;`,
        [id]
      );
      const combination_id = result.rows[0].id;
      try {
        let addColourCombinationQuery = `INSERT INTO colours_combinations (colour_id, combination_id)
                  VALUES (${colour_ids[0]}, ${combination_id})`;
        for (let i = 1; i < colour_ids.length; i++) {
          addColourCombinationQuery += `, (${colour_ids[i]}, ${combination_id}) `;
        }
        addColourCombinationQuery += "RETURNING *;";

        const result = await db.query(addColourCombinationQuery);
        const combination = result.rows;
        return { combination };
      } catch (err) {
        return console.error(
          "Error adding a new colour combination",
          err.stack
        );
      }
    } catch (err) {
      return console.error("Error adding a new combination id", err.stack);
    }
  } catch (err_1) {
    return console.error("Error adding new colours", err_1.stack);
  }
};

const deleteCombination = (id) => {
  return db
    .query(
      `DELETE FROM combinations 
    WHERE combinations.id = $1
    RETURNING *;`,
      [id]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => console.error(err.stack));
};

module.exports = {
  db,
  getAllCombinations,
  getCombination,
  getAllColours,
  getColour,
  getCombinationsForUser,
  updateLikes,
  getUserWithEmail,
  addUser,
  addCombinationsForUser,
  deleteCombination,
  showSavedCombinations,
  saveCombination,
  unsaveCombination,
};
