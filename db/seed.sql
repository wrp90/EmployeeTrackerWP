USE database_db;

INSERT INTO department (Name)
VALUES
    ("Sales"),
    ("Marketing"),
    ("HR"),
    ("IT");

INSERT INTO role (Title, Salary, Department_ID)
VALUES
    ("Sales Manager", 100000.00, 1),
    ("Sales Associate", 50000.00, 1),
    ("Marketing Manager", 80000.00, 2),
    ("Marketing Employee", 45000.00, 2),
    ("HR Representative", 60000.00, 3),
    ("IT Manager", 150000.00, 4),
    ("Front-End Developer", 100000.00, 4),
    ("Back-End Developer", 110000.00, 4);

INSERT INTO employee (First_Name, Last_Name, Role_ID, Manager_ID)
VALUES
    ("Lord", "Gaben", 1, null),
    ("Albert", "Einstein", 2, null),
    ("Neils", "Bohr", 3, null),
    ('Paul', 'Dirac', 4, null),
    ("Will", "Smith", 5, 1),
    ("John", "Wick", 5, 2),
    ("Maynard", "Keenan", 6, 2),
    ("Luke", "Smith", 6, 3),
    ("Stevie", "Nicks", 7, 3),
    ("Tom", "Brady", 7, 4),
    ("John", "Stamos", 8, 4);
    
    
    