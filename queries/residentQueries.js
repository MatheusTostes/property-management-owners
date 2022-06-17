require("dotenv").config();
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const db = require("../database/db");
const { pool } = db


const getResidents = (request, response) => {
  const { id } = request
  pool.query(
    `SELECT * FROM residents WHERE resident_id ='${id}'`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
    }
  );
};

const getResident = (request, response) => {
  const { id } = request
  pool.query(
    `SELECT * FROM residents WHERE owner_id ='${id}'`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
    }
  );
};

const createResident = (request, response) => {
  const { name, picture, company, phone, email, password } = request.body;
  
  pool.query(
    `SELECT * FROM residents WHERE email = '${email}'`,
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows[0]) {
        response.status(401).end()
      }

      if (!(results.rows[0])) {
        pool.query(
          `INSERT INTO residents (name, picture, company, phone, email, password) VALUES ($1, $2, $3, $4, $5, $6)`,
          [name, picture, company, phone, email, password],
          (error, results) => {
            if (error) {
              throw error;
            }
            response.status(201).send(`User ${name} created`);
          }
        );
      }
    },
  );
};

const updateResident = (request, response) => {
  const { id } = request
  const { name, picture, company, phone, email, password } = request.body;

  pool.query(
    'UPDATE residents SET name = $1, picture = $2, company = $3, phone = $4, email = $5, password = $6 WHERE resident_id = $7',
    [name, picture, company, phone, email, password, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteResident = (request, response) => {
  const { id } = request

  pool.query(
    `DELETE FROM residents WHERE resident_id = ${id}`,
    // [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
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
