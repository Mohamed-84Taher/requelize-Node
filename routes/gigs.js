const express = require("express");
const router = express.Router();
const db = require("../config/db");
const Gig = require("../models/Gig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", (req, res) => {
  Gig.findAll()
    .then(gigs => {
      res.render("gigs", { gigs });
    })
    .catch(err => console.log(err));
});

// get form data
router.get("/add", (req, res) => res.render("add"));

// add new gig
router.post("/add", (req, res) => {
  let { title, technologies, description, budget, contact_email } = req.body;
  const errors = [];
  // check fields
  if (!title) {
    errors.push({ text: "Enter a title" });
  }
  if (!technologies) {
    errors.push({ text: "Enter a technologies" });
  }
  if (!description) {
    errors.push({ text: "Enter a description" });
  }
  if (!contact_email) {
    errors.push({ text: "Enter a contact email" });
  }
  // check errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      description,
      contact_email,
    });
  } else {
    if (!budget) {
      budget = "unknow";
    } else {
      budget = `$${budget}`;
    }
    technologies.toLowerCase().replace(/, /g, /,/);
    // insert into Table
    Gig.create({
      title,
      technologies,
      description,
      budget,
      contact_email,
    })
      .then(gig => res.redirect("/gigs"))
      .catch(err => console.log(err));
  }
});

// Search
router.get("/search", (req, res) => {
  let { term } = req.query;
  term = term.toLocaleLowerCase();
  Gig.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
    .then(gigs => res.render("gigs", { gigs }))
    .catch(err => console.log(err));
});

module.exports = router;
