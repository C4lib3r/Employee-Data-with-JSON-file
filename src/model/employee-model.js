class Employee {
  constructor(
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
  ) {
    (this.empID = empID), (this.firstName = firstName);
    (this.lastName = lastName),
      (this.birthdDate = birthdDate),
      (this.photo = photo),
      (this.joiningDate = joiningDate),
      (this.createdDate = createdDate || new Date()),
      (this.updatedDate = updatedDate || new Date()),
      (this.status = status || "Active"),
      (this.is_deleted = is_deleted || false);
  }
}

module.exports = Employee;
