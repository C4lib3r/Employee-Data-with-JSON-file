const { Router } = require("express");
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
  searchBybirthDate,
  searchByName,
} = require("../controllers/employee-controller");

//Home page endpoint
router.get("/", getHome);

//Get all employees
router.get("/getallemployees", getAllEmployees);

//Get employee By ID
router.get("/employee/:id", getEmployeeById);

//create new employee
router.post("/createemployee", createEmployee);

//edit/update existing employee
//Throw error if employee does not exist
//Put or patch which one to use
router.put("/updateEmployee", updateEmployee);

//Delete existing employee
//Throw error if employee does not exist
//Hard delete or soft delete
router.put("/deleteEmployee/:id", deleteEmployee);

//Filter records based on Created date asc/ desc , Status (active / Inactive)
router.get("/filtercreateddate", filterEmployeeByCreatedDate);

router.get("/filtercreateddate", filterEmployeeByStatus);

//can search records based on Name
router.get("/employee/birthdate", searchBybirthDate);

//can search records based on Birth date
router.get("/employee/name", searchByName);

module.exports = router;
