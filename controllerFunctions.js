const mysql = require("mysql"),
  cTable = require("console.table");

class Controller {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "emptracker_db"
    });

    this.connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
  }
  viewEmployees() {
    this.connection.query("SELECT * FROM employee", function(err, result) {
      if (err) throw err;
      //   console.log(result);
      result.forEach(el => {
        console.table({
          id: el.id,
          First_Name: el.first_name,
          Last_Name: el.last_name,
          role_id: el.role_id,
          manager_id: el.manager_id
        });
      });
    });
  }
  viewRoles() {
    this.connection.query("SELECT * FROM role", function(err, result) {
      if (err) throw err;
      //   console.log(result);
      result.forEach(el => {
        console.table({
          id: el.id,
          Title: el.title,
          Salary: el.salary,
          Department_id: el.department_id
        });
      });
    });
  }
}

module.exports = Controller;
