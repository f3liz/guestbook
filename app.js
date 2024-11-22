// Get express package and mariadb
const { compile } = require("ejs");
const express = require("express");
const mariadb = require("mariadb");

// configure database connection
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "605023",
  database: "guestbook",
});

// connect to database
async function connect() {
  try {
    let conn = await pool.getConnection();
    console.log("Connected to the database");
    return conn;
  } catch (err) {
    console.log("Error connecting to the database: " + err);
  }
}

// instantiate an express (web) app
const app = express();

// Define port number for app to listen on
const PORT = 3000;

// Tell app to encode data into JSON format
app.use(express.urlencoded({ extended: false }));

// Tell app to use public folder to serve static files
app.use(express.static("public"));

// Set view (templating) engine to EJS
// templating engine to create dynamic web pages
app.set("view engine", "ejs");

// Define default route
app.get("/", (req, res) => {
  // log message to server's console
  console.log("Hello, world, server!");

  // return home page
  res.render("home");
});

// Define a "confirm" route, using the GET method
app.get("/confirm", (req, res) => {
  // Send a response to the client
  res.send("You need to post to this page!");
});

app.post("/confirm", async (req, res) => {
  console.log(req.body);

  // get data from form that was submitted from body for request object
  /*
  fname: 'Felix',
  lname: 'Chen',
  jobtitle: '',
  company: '',
  linkedin: '',
  email: '',
  how: [ 'linkedin', '' ],
  message: '',
  button: 'edit'
  */
  const data = {
    firstName: req.body.fname,
    lastName: req.body.lname,
    jobTitle: req.body.jobtitle,
    company: req.body.company,
    linkedin: req.body.linkedin,
    email: req.body.email,
    how: req.body.how,
    message: req.body.message,
  };

  console.log(data);

  // connect to database
  const conn = await connect();

  // insert the data into the database
  await conn.query(`INSERT INTO contacts (firstName, lastName, jobTitle, company, linkedin, email, how, message) VALUES
(
	"${data.firstName}", "${data.lastName}", "${data.jobTitle}", "${data.company}", "${data.linkedin}", "${data.email}", "${data.how}", "${data.message}"
);`);

  res.render("confirm", { details: data });
});

app.get("/admin", async (req, res) => {
  const conn = await connect();
  const rows = await conn.query("SELECT * FROM contacts;");
  res.render("admin", { contacts: rows });
});

// Tell app to listen for requests on designated port
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
