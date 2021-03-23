USE database_db;

INSERT INTO departments (name)
VALUES
    ("Sales"),
    ("Marketing"),
    ("HR"),
    ("IT");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Sales Manager", 100000, 1),
    ("Sales Associate", 50000, 1),
    ("Marketing Manager", 80000, 2),
    ("Marketing Employee", 45000, 2),
    ("HR Representative", 60000, 3),
    ("IT Manager", 150000, 4),
    ("Front-End Developer", 100000, 4),
    ("Back-End Developer", 110000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Lord", "Gaben", 1, 1),
    ("Albert", "Einstein", 2, 1),
    ("Neils", "Bohr", 2, 2),
    ("Will", "Smith", 3, null),
    ("Ada", "Lovelace", 3, null),
    ("Maynard", "Keenan", 4, 4),
    ("Luke", "Smith", 4, null),
    ("Jimmy", "Buffett", 4, null);
    
    
    