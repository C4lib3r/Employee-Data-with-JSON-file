const { Router } = require("express");
const router = Router();

const {
  getAllEmployees,
  getHome,
  getEmployeeById,
  createEmployee,
} = require("../controllers/employee-controller");

//Home page endpoint
router.get("/", getHome);

//Get all employees
router.get("/getallemployees", getAllEmployees);

//Get employee By ID
router.get("/employee/:id", getEmployeeById);

//create new employee
router.post("/createEmployee", createEmployee);


//edit/update existing employee
//Throw error if employee does not exist
//Put or patch which one to use

//Delete existing employee
//Throw error if employee does not exist
//Hard delete or soft delete

//Filter records based on Created date asc/ desc , Status (active / Inactive)

//can search records based on Name , Birth date

module.exports = router;
