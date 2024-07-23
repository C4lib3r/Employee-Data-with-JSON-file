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
  searchByBDorName,
} = require("../controllers/employee-controller");

//Home page endpoint
router.get("/", getHome);

//Get all employees
router.get("/getallemployees", getAllEmployees);

//Get employee By ID
router.get("/employeeByID/:id", getEmployeeById);

//create new employee
router.post("/createemployee", createEmployee);

//edit/update existing employee
//Throw error if employee does not exist
//Put or patch which one to use
router.put("/updateEmployee", updateEmployee);

//Delete existing employee
//Throw error if employee does not exist
//Hard delete or soft delete
router.delete("/deleteEmployee/:id", deleteEmployee);

//Filter records based on Created date asc/ desc , Status (active / Inactive)
router.get("/filtercreateddate", filterEmployeeByCreatedDate);

router.get("/filteremployeebystatus", filterEmployeeByStatus);

//can search records based on Name, birthdate
router.get("/employee/search", searchByBDorName);


module.exports = router;
