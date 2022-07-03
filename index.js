require('dotenv').config();

const express = require('express');
const cors = require('cors');
const ownerActions = require('./src/queries/ownerQueries');
const residentActions = require('./src/queries/residentQueries');
const authActions = require('./src/authenticate/authOwner');
const app = express();
const port = 3000;

app.use(cors({
	origin: '*',
}));

app.use(express.json());

app.get('/', (request, response) => {
	response.json({info: 'Nodejs, Express and Postgres API'});
});

app.post('/login', ownerActions.loginOwner);
app.get('/owner', authActions.verifyJWT, ownerActions.getOwner);
app.post('/owner', ownerActions.createOwner);
app.put('/owner', authActions.verifyJWT, ownerActions.updateOwner);
app.delete('/owner', authActions.verifyJWT, ownerActions.deleteOwner);

app.get('/residents', authActions.verifyJWT, residentActions.getResidents);
app.get('/resident/:resident_id', authActions.verifyJWT, residentActions.getResident);
app.post('/resident', authActions.verifyJWT, residentActions.createResident);
app.put('/resident/:resident_id', authActions.verifyJWT, residentActions.updateResident);
app.delete('/resident/:resident_id', authActions.verifyJWT, residentActions.deleteResident);

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
