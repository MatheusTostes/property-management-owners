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

function verifyJWT(request, response, next) {
  const token = request.headers['x-access-token']
  jwt.verify(token, SECRET, (err, decoded) => {
    if(err) return response.status(401).end()
    // console.log(decoded);
    request.id = decoded.id
    next()
  })
}

// app.post('/login', (req,res) => {
//   if (req.body.user === 'matheus' && req.body.password === '123') {
//     const token = jwt.sign(
//       {
//         userId: 3 
//       },
//         SECRET,
//       {
//         expiresIn: 10800 
//       }
//     )
//     return res.json({ auth: true, token })
//   }

//   res.status(401).end()
// })

app.post('/login', db.loginOwner);
app.get("/owner", verifyJWT, db.getOwner);
app.post("/owner", db.createOwner);
app.put("/owner", verifyJWT, db.updateOwner);
app.delete("/owner", verifyJWT, db.deleteOwner);
// app.get("/products/:id", db.getProductById);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
