DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT NOT NULL,
    employee_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
    PRIMARY KEY (id)
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE CASCADE
);

