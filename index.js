require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const ownerActions = require("./queries/ownerQueries");
const residentActions = require("./queries/residentQueries");
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
    if(err) {
      return response.status(401).end()
    }
    request.owner_id = decoded.owner_id
    next()
  })
}

app.post('/login', ownerActions.loginOwner);
app.get("/owner", verifyJWT, ownerActions.getOwner);
app.post("/owner", ownerActions.createOwner);
app.put("/owner", verifyJWT, ownerActions.updateOwner);
app.delete("/owner", verifyJWT, ownerActions.deleteOwner);

app.get("/residents", verifyJWT, residentActions.getResidents);
app.get("/resident/:resident_id", verifyJWT, residentActions.getResident);
app.post("/resident", verifyJWT, residentActions.createResident);
app.put("/resident/:resident_id", verifyJWT, residentActions.updateResident);
app.delete("/resident/:resident_id", verifyJWT, residentActions.deleteResident);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
