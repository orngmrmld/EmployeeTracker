USE employees_db;

INSERT INTO department (name) VALUES 
("Sales"),
("HR"),
("IT"); 

INSERT INTO role (title,salary,department_id) VALUES
("Web Developer", 100000, 3),
("Accountant", 75000, 1);

INSERT INTO employee(first_name, last_name,role_id, manager_id ) VALUES 
("Millenium", "The Hutt", 1, 1),
("Po", "The Panda", 2, 1);