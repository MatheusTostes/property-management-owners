require("dotenv").config();
// const jwt = require('jsonwebtoken')
// const SECRET = process.env.SECRET

const db = require("../database/db");
const { pool } = db

const getResidents = (request, response) => {
  const { owner_id } = request
  console.log(owner_id);
  pool.query(
    `SELECT * FROM residents WHERE owner_id ='${owner_id}'`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getResident = (request, response) => {
  const { owner_id } = request

  pool.query(
    `SELECT * FROM residents WHERE resident_id ='${resident_id}'`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
    }
  );
};

const createResident = (request, response) => {
  const { name, phone, email, cpf, dependents } = request.body;
  const { owner_id } = request

	// owner_id NUMERIC ( 10 ) NOT NULL,
	// name VARCHAR ( 50 ) NOT NULL,
	// phone NUMERIC ( 13 ) NOT NULL,
	// email VARCHAR ( 50 ),
  //       cpf NUMERIC ( 11 ) NOT NULL,
	// dependents VARCHAR ( 255 )

  pool.query(
    `INSERT INTO residents (owner_id, name, phone, email, cpf, dependents) VALUES ($1, $2, $3, $4, $5, $6)`,
    [owner_id, name, phone, email, cpf, dependents],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Resident ${name} created`);
    }
  );
};

const updateResident = (request, response) => {
  const { owner_id } = request
  const { name, picture, company, phone, email, password } = request.body;

  pool.query(
    'UPDATE residents SET name = $1, picture = $2, company = $3, phone = $4, email = $5, password = $6 WHERE resident_id = $7',
    [name, picture, company, phone, email, password, owner_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${owner_id}`);
    }
  );
};

const deleteResident = (request, response) => {
  const { owner_id } = request

  pool.query(
    `DELETE FROM residents WHERE resident_id = ${owner_id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${owner_id}`);
    }
  );
};

module.exports = {
  getResidents,
  getResident,
  createResident,
  updateResident,
  deleteResident,
};
