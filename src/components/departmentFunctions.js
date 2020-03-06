const { alphaValidator } = require("./validators"),
  inquirer = require("inquirer");

exports.viewDepartments = connection => {
  connection.query("SELECT * FROM department", function(err, result) {
    if (err) throw err;
    //   console.log(result);
    result.forEach(el => {
      console.table({
        id: el.id,
        Name: el.name
      });
    });
  });
  connection.end();
};

exports.addNewDepartment = async connection => {
  const answers = await inquirer.prompt([
    {
      name: "depName",
      type: "input",
      message: "Enter department name: ",
      validate: alphaValidator
    }
  ]);

  //   promptAnswers = await promptAnswers;
  // console.log("Answers:", promptAnswers);

  // Employee columns: first_name, last_name, role_id, manager_id
  connection.query(
    `INSERT into department (name) VALUES ("${answers.depName}")`,
    function(err, result) {
      if (err) throw err;
      // console.log("Press arrow key to bring up the menu");
      connection.end();
    }
  );
};
