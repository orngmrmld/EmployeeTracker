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

async function queryRoles() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM role", function (err, results) {
            if (err) return reject(err);
            resolve(results);
        });
    })
}

async function queryEmployees() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM employee", function (err, results) {
            if (err) return reject(err);
            resolve(results);
        });
    })
}


function init() {
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
        switch (answers.firstQuestion) {
            case "view all departments":
                viewAllDepartments();
                break;
            case "view all roles":
                viewAllRoles();
                break;
            case "view all employees":
                viewAllEmployees();
                break;
            case "add a department":
                addDepartment();
                break;
            case "add a role":
                addRole();
                break;
            case "add an employee":
                addEmployee();
                break;
            case "update an employee":
                updateEmployee();
                break;
            case "EXIT":
                db.end();
                break;
        }
    })

}

function viewAllDepartments() {
    db.query("SELECT * FROM department", function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log("All Departments")
        console.table(res);
    });
    init();
}

function viewAllRoles() {
    db.query("SELECT * FROM role", function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log("Viewing all roles");
        console.table(res);
    });
    init();

}

function viewAllEmployees() {
    db.query("SELECT * FROM employee", function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log("Viewing all employees");
        console.table(res);
    });
    init();
}

function addDepartment() {
    console.log("hi");
    inquirer.prompt({

        type: "input",
        name: "deptName",
        message: "What is the name of the department?"

    }).then((answer) => {
        console.log(answer.deptName);
        db.query("INSERT INTO department (name) VALUES (?)",
            [answer.deptName],
            function (err) {
                if (err) throw err;
                init();
            }
        )

        init();
    });

}

function addRole() {
    console.log("hi");
}

async function addEmployee() {
    const Roles = await queryRoles();
    const employees = await queryEmployees();
    console.log(employees)
    console.log(Roles)
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the last name?"
        },
        {
            name: "roleId",
            type: "list",
            message: "What is the role id?",
            choices: Roles.map((role) => ({ name: role.title, value: role.id }))
        },
        {
            name: "managerId",
            type: "input",
            message: "What is the manager id?"
        }

    ]).then((answers) => {
        console.log(answers);
        db.query("INSERT INTO employee SET ?",
            {
                id: 0,
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.roleId,
                manager_id: answers.managerId
            },
            function (err) {
                if (err) throw err;
                init();
            }
            
        )
    });

}

function updateEmployee() {

}

init()