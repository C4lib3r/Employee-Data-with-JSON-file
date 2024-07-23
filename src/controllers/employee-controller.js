const fs = require("fs");
const employeeDB = "src/model/employee.json";
const Employee = require("../model/employee-model");
const port = process.env.port || 3000;

//Reading JSON database file
const readDataFromFile = (db) => {
  let dataStr = fs.readFileSync(db);
  let dataJSON = JSON.parse(dataStr);
  return dataJSON;
};

//Write to JSON database file
const writeInFile = (db, data) => {
  fs.writeFileSync(db, JSON.stringify(data, null, 2));
};

//home page
const getHome = (req, res) => {
  res.send("Welcome to the employee home page.");
};

//Get all employyees
const getAllEmployees = (req, res) => {
  const employees = readDataFromFile(employeeDB);
  // const filteredData =
  res.status(200).json(dataJSON);
};

//Get employee by id
const getEmployeeById = (req, res) => {
  const id = req.params.id; // Extract id from request parameters

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
//request body is undefined if in postman don't set header as "content-type" as "application json"
const createEmployee = (req, res) => {
  const {
    firstName,
    lastName,
    birthDate,
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
    birthDate,
    photo,
    joiningDate,
    createdDate,
    updatedDate,
    status,
    is_deleted
  );

  employees.push(newEmployee);
  writeInFile(employeeDB, employees);

  res.status(201).json(newEmployee);
};

//Update employee By Id
const updateEmployee = (req, res) => {
  const {
    id,
    firstName,
    lastName,
    photo,
    createdDate,
    updatedDate,
    status,
    is_deleted,
  } = req.body;
  const data = [
    firstName,
    lastName,
    photo,
    createdDate,
    updatedDate,
    status,
    is_deleted,
  ];
  const employees = readDataFromFile(employeeDB);
  const employee = employees.find((emp) => emp.empID === id);
  for (item in data) {
    employee[item];
  }
  console.log(employee);
};

// Delete employee by ID
const deleteEmployee = (req, res) => {};

//Filter Employee based on created date
const filterEmployeeByCreatedDate = (req, res) => {};

//Filter Employee based on status
const filterEmployeeByStatus = (req, res) => {
  const { status } = req.query;
  const employees = readDataFromFile(employeeDB);
  // const filteredData = employees.find(emp=> emp.status.toLowercase() === status.toLowerCase())

  const statusOrder = req.query.statusOrder;
  const filteredData = employees.sort((a, b) => {
    if (statusOrder === "activeFirst") {
      if (
        a.statusOrder.toLowercase() === "active" &&
        b.statusOrder.toLowerCase() === "inactive"
      ) {
        return -1;
      } else if (
        a.statusOrder.toLowercase() === "inactive" &&
        b.statusOrder.toLowerCase() === "active"
      ) {
        return 1;
      } else {
        return 0;
      }
    } else if (statusOrder === "inActiveFirst") {
      if (
        a.statusOrder.toLowercase() === "inactive" &&
        b.statusOrder.toLowerCase() === "active"
      ) {
        return -1;
      } else if (
        a.statusOrder.toLowercase() === "active" &&
        b.statusOrder.toLowerCase() === "inactive"
      ) {
        return 1;
      } else {
        return 0;
      }
    } else {
      res.status(400).send("please enter correct status order!");
    }
  });
  res.status(200).json(filteredData);
};

//Find employee based on birthdate
const searchBybirthDate = (req, res) => {
  const birthDate = req.query.birthDate;
  const employees = readDataFromFile(employeeDB);
  const employee = employees.find((emp) => emp.birthDate === birthDate);
  console.log(employee);
  res.status(200).json(employee);
};

//Find employee based on first name
const searchByName = (req, res) => {
  const firstName = req.query.firstName;
  const employees = readDataFromFile(employeeDB);
  const employee = employees.find((emp) => emp.firstName === firstName);
  console.log(employee);
  res.status(200).json(employee);
};

module.exports = {
  getEmployeeById,
  readDataFromFile,
  getHome,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  filterEmployeeByCreatedDate,
  filterEmployeeByStatus,
  searchBybirthDate,
  searchByName,
};
