const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./Controllers/register")
const signIn = require("./Controllers/signin")
const profile = require("./Controllers/profile")
const image = require("./Controllers/image")

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "sylon23",
    database: "image-recognition"
  }
});

db.select("*")
  .from("users")
  .then(data => {});

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send(database.users);
});

//res.json comes with extra features
// app.post("/signin", (req, res) => {signIn.handleSignin(req, res, db, bcrypt)});

app.post("/signin", signIn.handleSignin(db, bcrypt)); //automatically recives req and res

app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)}) //dependency injection

app.get("/profile/:id", (req, res) =>{ profile.handleProfileGet(req, res, db)});

app.put("/image", (req, res) => {image.handleImage(req, res, db)});

app.post("/imageurl", (req, res) => {image.handleApiCall(req, res)});

app.listen(3000, () => {
  console.log("app is running");
});

/*
endpoints
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user


*/
//Variables cannot persist information, this is why databases are important
