/*File name: COMP229-F2022-MidTerm-301206792
Author's name: Sharmaine Sanchez
StudentID: 301206792
WebApp name: Employee
*/

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the employee model
let employee = require("../models/employees");

/* GET employee List page. READ */
router.get("/", (req, res, next) => {
  // find all employee in the employee_detail collection
  employee.find((err, employees) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("employees/index", {
        title: "Employees",
        employees: employees,
      });
    }
  });
});

//  GET the Employee Details page in order to add a new employee
router.get("/add", (req, res, next) => {
  res.render("employees/add", {
    title: "Add Employee",
    displayName: req.user ? req.user.displayName : "",
  });
});

// POST process the Employee Details page and create a new Employee - CREATE
router.post("/add", (req, res, next) => {
  let newEmployee = employee({
    Employeeid: req.body.Employeeid,
    Employeename: req.body.Employeename,
    Department: req.body.Department,
    Designation: req.body.Designation,
    Salary: req.body.Salary,
  });
  employee.create(newEmployee, (err, employee) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the employee list
      res.redirect("/employees");
    }
  });
});

// GET the Employee Details page in order to edit an existing Employee
router.get("/details/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object

  employee.findById(id, (err, employeetoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("employees/details", { title: "Edit Employee", employees: employeetoedit });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/details/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updateemployee = employee({
    _id: id,
    Employeeid: req.body.Employeeid,
    Employeename: req.body.Employeename,
    Department: req.body.Department,
    Designation: req.body.Designation,
    Salary: req.body.Salary,
  });
  employee.updateOne({ _id: id }, updateemployee, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the employee list
      res.redirect("/employees");
    }
  });
});

// GET - process the delete by specific employeename
router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  employee.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh employee list
      res.redirect("/employees");
    }
  });
});

module.exports = router;
