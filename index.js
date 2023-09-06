const mysql = require("mysql2")
const inquirer = require("inquirer")

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'redpanda',
        database: 'employees_db'
    },
);





function init(){
    inquirer.prompt({
        name: "firstQuestion",
        type: "list",
        message: "What do you want?",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
    }).then((answers) => {
        switch(answers.firstQuestion){
            case "view all departments":
                viewAllDepartments();
                break;
        }
    })

}

function viewAllDepartments() {
    console.log("Hello");
}


init()