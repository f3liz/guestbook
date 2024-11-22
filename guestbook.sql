-- Create database
CREATE DATABASE guestbook;

USE guestbook;

-- Create table
CREATE TABLE contacts (
	
    contact_id INT(10) PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    jobTitle VARCHAR(255),
    company VARCHAR(255),
    linkedin VARCHAR(255),
    email VARCHAR(255),
    how VARCHAR(255),
    message VARCHAR(500),
    timestamp DATETIME DEFAULT NOW()
    
);

INSERT INTO contacts (firstName, lastName, jobTitle, company, linkedin, email, how, message) VALUES
(
	"Steve", "Jobs", "CEO", "Apple", "https://www.linkedin.com/company/apple/", "stevejobs@apple.com", "online", "hi"
);

SELECT * FROM contacts;

