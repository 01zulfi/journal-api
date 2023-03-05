# Journal API

#### Link: https://journal-rest-api.herokuapp.com/

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
SECRET="any random long string here"
```
5. Create a user (don't include spaces in username and password):
```bash
node create-user.js <username_here> <password_here>
```
6. Start the server:
```bash
npm run serverstart
```

## API Endpoints

### Unprotected Routes

#### 1. `/login`
   - Accepts POST HTTP request
   - Requires a `username` and `password` in request body (`req.body`)
   - Sends a jwt token (accessible with `token` property). The token should be saved client side (localStorage), since they are required to access the protected routes
   
#### 2. `/published`
   - A GET HTTP request sends back the list of published journals (accessible with `journals` property)
  
#### 3. `/published/:urlName`
   - A GET HTTP request sends back a journal (`journal`) with the corresponding `urlName` property

### Protected Routes

Note: All requests to the following routes must be accompanied with a Authorization Header set to `"bearer ${jwt_token_here}"`

#### 4. `/journal`
   - A GET HTTP request sends back the list of all journals (`journals`) in the database
   - A POST HTTP request saves journal in the database. Requires following properties in the request body: `title`, `urlName`, `content`. `publish` is an optional property. Afterwards, the new `journal` is sent back 

#### 5. `/journal/:id`
  - A PUT HTTP request updates a journal with the corresponding `_id` property. Works similarly to the POST `/journal`
  - A DELETE HTTP request deletes a journal with the corresponding `_id` property
