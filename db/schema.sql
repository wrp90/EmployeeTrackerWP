DROP DATABASE IF EXISTS database_db;
CREATE DATABASE database_db;

USE database_db;

CREATE TABLE department (
    ID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(30) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE roles (
    ID INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_ID INT NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE employees (
    ID INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_ID INT NOT NULL,
    manager_ID INT NULL,
    PRIMARY KEY (ID)
);

