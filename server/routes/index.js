/*File name: COMP229-F2022-MidTerm-301206792
Author's name: Sharmaine Sanchez
StudentID: 301206792
WebApp name: Employee
*/

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the game model
let employee = require("../models/employees");

/* GET home page. wildcard */
router.get("/", (req, res, next) => {
  res.render("content/index", {
    title: "Home",
    employees: "",
  });
});

module.exports = router;
