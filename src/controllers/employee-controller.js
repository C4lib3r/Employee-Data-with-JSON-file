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
  const filteredData = employees
    .filter((emp) => !is_deleted)
    .sort((a, b) => {
      if (a.createdDate < b.createdDate) {
        return 1;
      } else if (a.createdDate > b.createdDate) {
        return -1;
      } else {
        return 0;
      }
    });
  res.status(200).json(filteredData);
};

//Get employee by id
const getEmployeeById = (req, res) => {
  const id = parseInt(req.params.id); // Extract id from request parameters

  try {
    const employees = readDataFromFile(employeeDB);
    const employee = employees.find(
      (emp) => emp.empID === parseInt(id) && !emp.is_deleted
    ); // Assuming id is a number in your JSON data

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    res.status(200).json(employee); // Send JSON data of the employee as response
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
    empID,
    firstName,
    lastName,
    photo,
    createdDate,
    updatedDate,
    status,
    is_deleted,
  } = req.body;

  const employees = readDataFromFile(employeeDB);
  const employee = employees.find((emp) => emp.empID === empID);
  if (!employee) {
    res.status(400).send("Employee not found.");
  }

  if (firstName) employee.firstName = firstName;
  if (lastName) employee.lastName = lastName;
  if (photo) employee.photo = photo;
  if (createdDate) employee.createdDate = createdDate;
  if (updatedDate) employee.updatedDate = updatedDate;
  if (status) employee.status = status;
  if (is_deleted) employee.is_deleted = is_deleted;

  //Try using for loop

  console.log(employee);
  writeInFile(employeeDB, employees);
  res.status(200).json(employee);
};

// Delete employee by ID
const deleteEmployee = (req, res) => {
  const { id } = req.body;
  const employees = readDataFromFile(employeeDB);

  const employee = employees.find((emp) => emp.empID === id);

  if (!employee) {
    res.status(400).send("Employee not found");
  }

  employees.is_deleted = true;
  writeInFile(employeeDB, employees);

  res.status(200).json({ message: "Employee soft deleted successfully" });
};

//Filter Employee based on created date
const filterEmployeeByCreatedDate = (req, res) => {
  const employees = readDataFromFile(employeeDB);
  const filteredData = employees
    .filter((emp) => !emp.is_deleted)
    .sort((a, b) => {
      if (a.createdDate < b.createdDate) {
        return -1;
      } else if (a.createdDate > b.createdDate) {
        return 1;
      } else {
        return 0;
      }
    });
  res.status(200).json(filteredData);
};

//Filter Employee based on status
const filterEmployeeByStatus = (req, res) => {
  const { status } = req.query;
  const employees = readDataFromFile(employeeDB);
  // const filteredData = employees.find(emp=> emp.status.toLowercase() === status.toLowerCase())

  const statusOrder = req.query.statusOrder;
  const filteredData = employees
    .filter((emp) => !emp.is_deleted)
    .sort((a, b) => {
      if (statusOrder === "activeFirst") {
        if (
          a.status.toLowerCase() === "active" &&
          b.status.toLowerCase() === "inactive"
        ) {
          return -1;
        } else if (
          a.status.toLowerCase() === "inactive" &&
          b.status.toLowerCase() === "active"
        ) {
          return 1;
        } else {
          return 0;
        }
      } else if (statusOrder === "inActiveFirst") {
        if (
          a.status.toLowerCase() === "inactive" &&
          b.status.toLowerCase() === "active"
        ) {
          return -1;
        } else if (
          a.status.toLowerCase() === "active" &&
          b.status.toLowerCase() === "inactive"
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
const searchByBDorName = (req, res) => {
  const { birthDate, firstName } = req.query;
  if (!birthDate && !firstName) {
    return res.status(400).json({
      message:
        "At least one query parameter (birthdate or first name is required)",
    });
  }

  try {
    const employees = readDataFromFile(employeeDB);
    const employee = employees.filter(
      (emp) =>
        (!emp.is_deleted && birthDate && emp.birthDate === birthDate) ||
        (firstName && emp.firstName === firstName)
    );

    if (employee.length === 0) {
      return res
        .status(400)
        .json({ message: "No employee found matching the criteris." });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error reading data from file:", error);
    res.status(500).json({ message: "Server error" });
  }
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
  searchByBDorName,
};
