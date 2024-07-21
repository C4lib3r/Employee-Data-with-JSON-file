const fs = require("fs");
const Employee = require("../model/employee-model");
const employeeDB = "src/model/employee.json";
const port = process.env.port || 3000;

//Reading JSON database file
const readDataFromFile = (db) => {
  let dataStr = fs.readFileSync(db);
  let dataJSON = JSON.parse(dataStr);
  console.log(dataJSON);
  return dataJSON;
};

//Write to JSON database file
const writeintofile = (db, data) => {
  fs.writeFileSync(db, JSON.stringify(data, null, 2));
};

//home page
const getHome = (req, res) => {
  res.send("Welcome to the employee home page.");
};

//Get all employyees
const getAllEmployees = (req, res) => {
  const dataJSON = readDataFromFile(employeeDB);
  res.status(200).json(dataJSON)
};

//Get employee by id
const getEmployeeById = (req, res) => {
  const { id } = req.params; // Extract id from request parameters

  try {
    const employees = readDataFromFile(employeeDB);
    const employee = employees.find((emp) => emp.empID === parseInt(id)); // Assuming id is a number in your JSON data

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    res.json(employee); // Send JSON data of the employee as response
  } catch (error) {
    console.error("Error fetching employee by id:", error);
    res.status(500).send("Error fetching employee data");
  }
};

//Creating new Employee
//request body is undefined
const createEmployee = (req, res) => {
  console.log(req.body)
  const {
    firstName,
    lastName,
    birthdDate,
    photo,
    joiningDate,
    createdDate,
    updatedDate,
    status,
    is_deleted,
  } = req.body;
  const employees = readDataFromFile(employeeDB);

  const maxID = employees.reduce(
    (max, emp) => (emp.empID > max ? emp.empID : max),
    0
  );
  const empID = maxID + 1;

  const newEmployee = new Employee(
    empID,
    firstName,
    lastName,
    birthdDate,
    photo,
    joiningDate,
    createdDate,
    updatedDate,
    status,
    is_deleted
  );

  employees.push(newEmployee);
  writeintofile(employeeDB, employees);

  res.status(201).json(newEmployee);
};

module.exports = {
  getEmployeeById,
  readDataFromFile,
  getHome,
  getAllEmployees,
  createEmployee,
};
