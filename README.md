# Property Management

A powerful and user-friendly software solution for managing properties. This software provides a centralized platform for landlords, property managers and tenants to manage all aspects of property rental. 

## Features
- Property Listing: Easily list and manage all of your properties in one place
- Tenant Management: Keep track of tenant information, rental agreements, and payments
- Maintenance Request Management: Streamline maintenance requests and track their status
- Financial Management: Monitor property income and expenses, generate financial reports
- Communication Platform: Enable easy communication between landlords, property managers and tenants

## Tech Stack
[![Node.js](https://img.shields.io/badge/Node.js-18.13.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0-2C8EBF.svg)](https://vitejs.dev/)
[![MaterialUI](https://img.shields.io/badge/MaterialUI-5.11.6-0081CB.svg)](https://material-ui.com/)
[![Express](https://img.shields.io/badge/Express-4.18.2-1948D1.svg)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.28.0-FECE44.svg)](http://docs.sequelizejs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1.svg)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-20.10.23-0DB7ED.svg)](https://www.docker.com/)
[![ContextApi](https://img.shields.io/badge/ContextApi--61DAFB.svg)](https://reactjs.org/docs/context.html)


## Routes
### User
- `GET /users`: Retrieve a list of users
- `GET /users/:id`: Retrieve a specific user by id
- `POST /users`: Create a new user
- `PUT /users/:id`: Update a specific user by id
- `DELETE /users/:id`: Delete a specific user by id

### Admin
- `GET /admins`: Retrieve a list of admins
- `GET /admins/:id`: Retrieve a specific admin by id
- `POST /admins`: Create a new admin
- `PUT /admins/:id`: Update a specific admin by id
- `DELETE /admins/:id`: Delete a specific admin by id

### Aparts
- `GET /aparts`: Retrieve a list of aparts
- `GET /aparts/:id`: Retrieve a specific apart by id
- `POST /aparts`: Create a new apart
- `PUT /aparts/:id`: Update a specific apart by id
- `DELETE /aparts/:id`: Delete a specific apart by id

### Contracts
- `GET /contracts`: Retrieve a list of contracts
- `GET /contracts/:id`: Retrieve a specific contract by id
- `POST /contracts`: Create a new contract
- `PUT /contracts/:id`: Update a specific contract by id
- `DELETE /contracts/:id`: Delete a specific contract by id


## Development and Contribution

### Prerequisites
- Node.js and npm installed on your local machine
- MySQL database setup and running on your local machine (Docker recommended)

## Project Structure:

```
Property Management
├── Backend
│   └── backend/
│       ├── src/
│       │   ├── config/
│       │   ├── controllers/
│       │   ├── middlewares/
│       │   ├── models/
│       │   └── routes/
│       └── Dockerfile
├── Frontend
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── contexts/
│       │   ├── hooks/
│       │   ├── helpers/
│       │   └── pages/
│       └── package.json
│
├── .env
├── .env.example
├── .sequelizerc
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
└── yarn.lock
```




### Getting Started
1. Clone the repository to your local machine
2. Run `npm install` to install all dependencies
3. Rename the `.env.example` file to `.env` and update the environment variables with your own values
4. Run `npm run dev` to start the development server

### Contributing
1. Fork the repository
2. Create a new branch for the changes you want to make
3. Make the changes and commit them to your branch
4. Open a pull request to the main repository for review

Note: Always follow the project's coding style and write clear and concise commit messages.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Give a :coffee:

If this project helped you in any way, consider giving a :coffee: to keep me going!

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/yourusername)
