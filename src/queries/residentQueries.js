require('dotenv').config();

const db = require('../database/db');
const {pool} = db;

const getResidents = (request, response) => {
	const {ownerId} = request;
	console.log(ownerId);
	pool.query(
		`SELECT * FROM residents WHERE owner_id ='${ownerId}'`,
		(error, results) => {
			if (error) {
				throw error;
			}

			response.status(200).json(results.rows);
		},
	);
};

const getResident = (request, response) => {
	const residentId = parseInt(request.params.residentId, 10);
	const {ownerId} = request;

	pool.query(
		`SELECT * FROM residents WHERE (resident_id ='${residentId}' AND owner_id = '${ownerId}')`,
		(error, results) => {
			if (error) {
				throw error;
			}

			response.status(200).json(results.rows[0]);
		},
	);
};

const createResident = (request, response) => {
	const {ownerId} = request;
	const {name, phone, email, cpf, dependents} = request.body;

	pool.query(
		'INSERT INTO residents (owner_id, name, phone, email, cpf, dependents) VALUES ($1, $2, $3, $4, $5, $6)',
		[ownerId, name, phone, email, cpf, dependents],
		error => {
			if (error) {
				throw error;
			}

			response.status(201).send(`Resident ${name} created`);
		},
	);
};

const updateResident = (request, response) => {
	const {ownerId} = request;
	const residentId = parseInt(request.params.residentId, 10);
	const {name, phone, email, cpf, dependents} = request.body;

	pool.query(
		'UPDATE residents SET name = $1, phone = $2, email = $3, cpf = $4, dependents = $5 WHERE (resident_id = $6 AND owner_id = $7)',
		[name, phone, email, cpf, dependents, residentId, ownerId],
		error => {
			if (error) {
				throw error;
			}

			response.status(200).send(`Resident ${name} modified with ID: ${residentId}`);
		},
	);
};

const deleteResident = (request, response) => {
	const {ownerId} = request;
	const residentId = parseInt(request.params.residentId, 10);

	pool.query(
		`DELETE FROM residents WHERE (resident_id = ${residentId} AND owner_id = ${ownerId})`,
		error => {
			if (error) {
				throw error;
			}

			response.status(200).send(`Resident deleted with ID: ${residentId}`);
		},
	);
};

module.exports = {
	getResidents,
	getResident,
	createResident,
	updateResident,
	deleteResident,
};
