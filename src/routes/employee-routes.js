const { Router } = require("express");
const passport = require("passport");

const router = Router();

const {
  getAllEmployees,
  getHome,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  filterEmployeeByCreatedDate,
  filterEmployeeByStatus,
  searchByBDorName,
} = require("../controllers/employee-controller");

//Home page endpoint
router.get("/", getHome);

//Get all employees
router.get("/getallemployees", passport.authenticate("local", {session: true}), getAllEmployees);

//Get employee By ID
router.get("/employeeByID/:id", passport.authenticate("local", {session: true}), getEmployeeById);

//create new employee
router.post("/createemployee", passport.authenticate("local", {session: true}), createEmployee);

//edit/update existing employee
//Throw error if employee does not exist
//Put or patch which one to use
router.put("/updateEmployee", passport.authenticate("local", {session: true}), updateEmployee);

//Delete existing employee
//Throw error if employee does not exist
//Hard delete or soft delete
router.delete("/deleteEmployee/:id", passport.authenticate("local", {session: true}), deleteEmployee);

//Filter records based on Created date asc/ desc , Status (active / Inactive)
router.get("/filtercreateddate", passport.authenticate("local", {session: true}), filterEmployeeByCreatedDate);

router.get("/filteremployeebystatus", passport.authenticate("local", {session: true}), filterEmployeeByStatus);

//can search records based on Name, birthdate
router.get("/employee/search", passport.authenticate("local", {session: true}), searchByBDorName);

module.exports = router;
