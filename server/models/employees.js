/*File name: COMP229-F2022-MidTerm-301206792
Author's name: Sharmaine Sanchez
StudentID: 301206792
WebApp name: comp229-f2022-midterm-30120679
*/

let mongoose = require("mongoose");

// create a model class
let Employee = mongoose.Schema(
  {
    Employeeid: Number,
    Employeename: String,
    Department: String,
    Designation: String,
    Salary: Number,
  },
  {
    collection: "employees",
  }
);

module.exports = mongoose.model("Employee", Employee);
