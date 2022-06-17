const Pool = require("pg").Pool;
const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(databaseConfig);

module.exports = {
  pool
};