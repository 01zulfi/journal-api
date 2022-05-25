# Journal API

#### Link: https://journal-rest-api.herokuapp.com/journal

## About

A RESTful API that serves my [Journal Admin](https://journal-admin.netlify.app/) and [Journal](https://01zulfi.github.io/journal) frontend applications. It allows to create a user for the database to safely interact with the admin app via JWT tokens. And utilizes a RESTful architecture to perform CRUD operations for the journals.

## Technologies

- Written in a NodeJS Framework: [Express](https://expressjs.com/)
- Uses a RESTful architecture 
- Utilizes [MongoDB](https://www.mongodb.com/) for database needs
- Leverages [JSON Web Tokens](https://jwt.io/) and [Passport.js](https://www.passportjs.org/) for authentication
- Hosted on [Heroku](https://www.heroku.com/)

## Getting Started

1. Clone the repository: 
```bash
git clone git@github.com:01zulfi/journal-api.git
```
2. Install dependencies:
```bash
npm install
```
3. Spin up a database on [MongoDB](https://www.mongodb.com/)
4. Add a `.env` file with the following:
```
MONGODB_URL="your mongodb connection url here"
SESSION="any random long string here"
```
5. Create a user (don't include spaces in username and password):
```bash
node create-user.js <username_here> <password_here>
```
6. Start the server:
```bash
npm run serverstart
```

