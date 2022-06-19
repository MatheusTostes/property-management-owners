require("dotenv").config();
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const db = require("../database/db");
const { pool } = db

const loginOwner = (request, response) => {
  const { email, password } = request.body
  pool.query(
    `SELECT * FROM owners WHERE email = '${email}'`,
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows[0]) {
        const owner_id = results.rows[0].owner_id
        const name = results.rows[0].name
        const pass = results.rows[0].password
  
        if (pass === password) {
          const token = jwt.sign(
            {
              owner_id,
              name,
            },
              SECRET,
            {
              expiresIn: 10800 
            }
          )
          return response.json({ auth: true, token })
        }
      }

      response.status(401).end()
    },
    );
}

const getOwner = (request, response) => {
  const { owner_id } = request
  pool.query(
    `SELECT * FROM owners WHERE owner_id ='${owner_id}'`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
    }
  );
};

const createOwner = (request, response) => {
  const { name, picture, company, phone, email, password } = request.body;
  
  pool.query(
    `SELECT * FROM owners WHERE email = '${email}'`,
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows[0]) {
        response.status(401).end()
      }

      if (!(results.rows[0])) {
        pool.query(
          `INSERT INTO owners (name, picture, company, phone, email, password) VALUES ($1, $2, $3, $4, $5, $6)`,
          [name, picture, company, phone, email, password],
          (error, results) => {
            if (error) {
              throw error;
            }
            response.status(201).send(`Owner ${name} created`);
          }
        );
      }
    },
  );

};

const updateOwner = (request, response) => {
  const { owner_id } = request
  const { name, picture, company, phone, email, password } = request.body;

  pool.query(
    `SELECT * FROM owners WHERE email = '${email}'`,
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows[0]) {
        response.status(401).end()
      }

      if (!(results.rows[0])) {
        pool.query(
          'UPDATE owners SET name = $1, picture = $2, company = $3, phone = $4, email = $5, password = $6 WHERE owner_id = $7',
          [name, picture, company, phone, email, password, owner_id],
          (error, results) => {
            if (error) {
              throw error;
            }
            response.status(200).send(`Owner modified with ID: ${owner_id}`);
          }
        );
      }
    },
  );

  
};

const deleteOwner = (request, response) => {
  const { owner_id } = request

  pool.query(
    `DELETE FROM owners WHERE owner_id = ${owner_id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Owner deleted with ID: ${owner_id}`);
    }
  );
};

module.exports = {
  getOwner,
  createOwner,
  updateOwner,
  deleteOwner,
  loginOwner,
};
