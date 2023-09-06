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
        choices: [
            "view all departments", 
            "view all roles", 
            "view all employees", 
            "add a department", 
            "add a role", 
            "add an employee", 
            "update an employee role",
            "EXIT",
    ]
    }).then((answers) => {
        switch(answers.firstQuestion){
            case "view all departments":
                viewAllDepartments();
                break;
            case "view all roles":
                viewAllRoles();
                break;
            case "view all employees":
                viewAllEmployees();
                break;
            case "add department":
                addDepartment();
                break;
            case "add role":
                addRole();
                break;
            case "add employee":
                addEmployee();
                break;
            case "update employee":
                updateEmployee();
                break;
            case "EXIT":
                break;
        }
    })

}

function viewAllDepartments() {
    console.log("Hello");
}

function viewAllRoles(){
    console.log("Roles");
}

function viewAllEmployees(){
    console.log("Employees")
}

function addDepartment(){

}

function addRole(){

}

function addEmployee(){

}

function updateEmployee(){

}

init()