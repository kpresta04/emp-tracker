const inquirer = require("inquirer"),
  mysql = require("mysql"),
  cTable = require("console.table");

async function main() {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "emptracker_db"
  });
  await con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  //   await con.query(
  //     'INSERT INTO employee (first_name, last_name) VALUES ("kellen","Presta")',
  //     function(error, results, fields) {
  //       if (error) {
  //         return connection.rollback(function() {
  //           throw error;
  //         });
  //       }
  //     }
  //   );

  con.query("SELECT * FROM `employee`", function(error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    console.log(results);
  });
}

main();
