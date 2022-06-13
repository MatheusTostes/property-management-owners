require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const db = require("./queries");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.get("/", (request, response) => {
  response.json({ info: "Nodejs, Express and Postgres API" });
});

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token']
  jwt.verify(token, SECRET, (err, decoded) => {
    if(err) return res.status(401).end()

    req.userId = decoded.userId
    next()
  })
}

app.post('/login', (req,res) => {
  if (req.body.user === 'matheus' && req.body.password === '123') {
    const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: 300 })
    return res.json({ auth: true, token })
  }

  res.status(401).end()
})

app.get("/products", db.getProducts);
app.get("/products/:id", db.getProductById);
app.post("/products", verifyJWT, db.createProduct);
app.put("/products/:id", verifyJWT, db.updateProduct);
app.delete("/products/:id", verifyJWT, db.deleteProduct);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
