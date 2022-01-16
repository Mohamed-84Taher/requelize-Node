const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// connect database
const db = require("./config/db");
//Test db
db.authenticate()
  .then(() => console.log("db connected..."))
  .catch(err => console.log(err));
// handlebars
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// body Parser
app.use(express.urlencoded({ extended: false }));

// Index
app.get("/", (req, res) => res.render("index", { layout: "landing" }));

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// gigs routes
app.use("/gigs", require("./routes/gigs"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
