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
  const resident_id = parseInt(request.params.resident_id);
  const { owner_id } = request

  pool.query(
    `SELECT * FROM residents WHERE (resident_id ='${resident_id}' AND owner_id = '${owner_id}')`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
    }
  );
};

const createResident = (request, response) => {
  const { owner_id } = request
  const { name, phone, email, cpf, dependents } = request.body;

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
  const resident_id = parseInt(request.params.resident_id);
  const { name, phone, email, cpf, dependents } = request.body;

  pool.query(
    'UPDATE residents SET name = $1, phone = $2, email = $3, cpf = $4, dependents = $5 WHERE (resident_id = $6 AND owner_id = $7)',
    [name, phone, email, cpf, dependents, resident_id, owner_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Resident ${name} modified with ID: ${resident_id}`);
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
