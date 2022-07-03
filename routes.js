const routes = require('express').Router();

const ownerActions = require('./src/queries/ownerQueries');
const residentActions = require('./src/queries/residentQueries');
const authActions = require('./src/authenticate/authOwner');

routes.get('/', (request, response) => {
	response.json({info: 'Nodejs, Express and Postgres API'});
});

routes.post('/login', ownerActions.loginOwner);
routes.get('/owner', authActions.verifyJWT, ownerActions.getOwner);
routes.post('/owner', ownerActions.createOwner);
routes.put('/owner', authActions.verifyJWT, ownerActions.updateOwner);
routes.delete('/owner', authActions.verifyJWT, ownerActions.deleteOwner);

routes.get('/residents', authActions.verifyJWT, residentActions.getResidents);
routes.get('/resident/:resident_id', authActions.verifyJWT, residentActions.getResident);
routes.post('/resident', authActions.verifyJWT, residentActions.createResident);
routes.put('/resident/:resident_id', authActions.verifyJWT, residentActions.updateResident);
routes.delete('/resident/:resident_id', authActions.verifyJWT, residentActions.deleteResident);

module.exports = routes;
