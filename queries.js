require("dotenv").config();
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const Pool = require("pg").Pool;
const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(databaseConfig);

const loginOwner = (request, response) => {
  const { email, password } = request.body
  pool.query(
    `SELECT * FROM owners WHERE email = '${email}'`,
    (error, results) => {
      if (error) {
        throw error;
      }

      const id = results.rows[0].owner_id
      const email = results.rows[0].email
      const pass = results.rows[0].password

      if (pass === password) {
        const token = jwt.sign(
          {
            id,
            email,
          },
            SECRET,
          {
            expiresIn: 10800 
          }
        )
        return response.json({ auth: true, token })
      }

      response.status(401).end()
    },
    );
}

const getOwner = (request, response) => {
  const { id } = request
  pool.query(
    `SELECT * FROM owners WHERE owner_id ='${id}'`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// const getProductById = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query(
//     `SELECT * FROM products WHERE product_id = ${id}`,
//     // [id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).json(results.rows);
//     }
//   );
// };

const createOwner = (request, response) => {
  const { name, picture, company, phone, email, password } = request.body;

  pool.query(
    `INSERT INTO owners (name, picture, company, phone, email, password) VALUES ($1, $2, $3, $4, $5, $6)`,
    [name, picture, company, phone, email, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Product added with ID: ${request.id}`);
    }
  );
};

const updateOwner = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, price, description, image, category, promo } = request.body;

  pool.query(
    'UPDATE products SET name = $1, price = $2, description = $3, image = $4, category = $5, promo = $6 WHERE product_id = $7',
    [name, price, description, image, category, promo, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteOwner = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    `DELETE FROM products WHERE product_id = ${id}`,
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
  getOwner,
  createOwner,
  updateOwner,
  deleteOwner,
  loginOwner,
};
