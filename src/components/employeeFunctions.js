const inquirer = require("inquirer"),
  { intValidator, alphaValidator } = require("./validators");

const runEmployeePrompts = async () => {
  let answers = await inquirer.prompt([
    {
      name: "first_name",
      message: "Enter employee's first name: ",
      type: "input",
      validate: alphaValidator
    },
    {
      name: "last_name",
      message: "Enter employee's last name: ",
      type: "input",
      validate: alphaValidator
    },
    {
      name: "role_id",
      message: "Enter employee's role ID: ",
      type: "list",
      choices: ["1: Manager", "2: Engineer", "3: Intern"]
    },
    {
      name: "manager_id",
      message: "Enter the ID of the employee's manager: ",
      type: "input",
      validate: intValidator,
      default: "Enter a number or press Enter to skip"
    }
  ]);
  // Transform answers

  answers.role_id = Number(answers.role_id.slice(0, 1)); // We only want the integer
  if (answers.manager_id === "Enter a number or press Enter to skip") {
    // Remove if default
    answers.manager_id = null;
  } else answers.manager_id = Number(answers.manager_id);
  return answers;
};

exports.addNewEmployee = async connection => {
  const promptAnswers = await runEmployeePrompts();
  //   promptAnswers = await promptAnswers;
  console.log("Answers:", promptAnswers);

  //Employee columns: first_name, last_name, role_id, manager_id
  //   connection.query(
  //     "INSERT into employee (first_name, last_name, role_id) VALUES ('Joe','Myers', 2)",
  //     function(err, result) {
  //       if (err) throw err;
  //     }
  //   );
};
