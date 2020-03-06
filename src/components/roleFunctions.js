const { alphaValidator, intValidator } = require("./validators"),
  inquirer = require("inquirer");

exports.addNewRole = async connection => {
  const answers = await inquirer.prompt([
    {
      name: "roleName",
      type: "input",
      message: "Enter role name: ",
      validate: alphaValidator
    },
    {
      name: "salary",
      type: "input",
      message: "Enter the role's salary: ",
      validate: intValidator
    },
    {
      name: "depID",
      type: "input",
      message: "Enter the role's department ID: ",
      validate: intValidator
    }
  ]);

  //   promptAnswers = await promptAnswers;
  // console.log("Answers:", promptAnswers);

  // Employee columns: first_name, last_name, role_id, manager_id
  connection.query(
    `INSERT into role (title,salary,department_id) VALUES ("${answers.roleName}",${answers.salary},${answers.depID})`,
    function(err, result) {
      if (err) throw err;
      // console.log("Press arrow key to bring up the menu");
      connection.end();
    }
  );
};
exports.viewRoles = connection => {
  connection.query("SELECT * FROM role", function(err, result) {
    if (err) throw err;
    //   console.log(result);
    result.forEach(el => {
      console.table({
        id: el.id,
        Title: el.title,
        Salary: el.salary,
        Dep_ID: el.department_id
      });
    });
  });
  connection.end();
};
exports.updateEmployeeRole = (connection, empID, roleID) => {
  connection.query(
    `UPDATE employee SET role_id =${roleID} WHERE id =${empID} ;`,
    function(err, result) {
      if (err) throw err;
      //   console.log(result);

      connection.end();
    }
  );
};
