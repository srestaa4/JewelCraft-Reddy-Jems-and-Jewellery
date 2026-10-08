-- JewelCraft Relational Schema for MySQL
CREATE DATABASE IF NOT EXISTS jewelcraft;
USE jewelcraft;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL,
    phone VARCHAR(30),
    city VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS showrooms (
    id VARCHAR(50) PRIMARY KEY,
    showroom_name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    email VARCHAR(100),
    opening_time VARCHAR(20),
    closing_time VARCHAR(20),
    status VARCHAR(20) DEFAULT 'OPEN'
);

CREATE TABLE IF NOT EXISTS jewellery (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    base_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'AVAILABLE'
);

CREATE TABLE IF NOT EXISTS designs (
    id VARCHAR(50) PRIMARY KEY,
    design_name VARCHAR(100) NOT NULL,
    jewellery_type VARCHAR(50) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    base_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE'
);

CREATE TABLE IF NOT EXISTS metals (
    id VARCHAR(50) PRIMARY KEY,
    metal_name VARCHAR(100) NOT NULL,
    purity VARCHAR(50) NOT NULL,
    price_per_gram DECIMAL(10, 2) NOT NULL,
    color_code VARCHAR(20),
    availability BOOLEAN DEFAULT TRUE,
    status VARCHAR(20) DEFAULT 'ACTIVE'
);

CREATE TABLE IF NOT EXISTS diamonds (
    id VARCHAR(50) PRIMARY KEY,
    shape VARCHAR(50) NOT NULL,
    carat DECIMAL(4, 2) NOT NULL,
    color VARCHAR(30) NOT NULL,
    clarity VARCHAR(30) NOT NULL,
    cut VARCHAR(30) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 1,
    image VARCHAR(255),
    status VARCHAR(20) DEFAULT 'AVAILABLE'
);

CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_phone VARCHAR(30),
    salesman_id VARCHAR(50),
    salesman_name VARCHAR(100),
    showroom_id VARCHAR(50) NOT NULL,
    showroom_name VARCHAR(100),
    date DATE NOT NULL,
    time VARCHAR(30) NOT NULL,
    status VARCHAR(30) DEFAULT 'BOOKED',
    customer_notes TEXT,
    salesman_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (showroom_id) REFERENCES showrooms(id)
);

CREATE TABLE IF NOT EXISTS quotations (
    id VARCHAR(50) PRIMARY KEY,
    appointment_id VARCHAR(50) NOT NULL,
    customer_id VARCHAR(50) NOT NULL,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    salesman_id VARCHAR(50) NOT NULL,
    salesman_name VARCHAR(100),
    jewellery VARCHAR(100),
    design VARCHAR(100),
    metal VARCHAR(100),
    diamond VARCHAR(100),
    diamond_shape VARCHAR(50),
    size VARCHAR(20),
    customization_details TEXT,
    estimated_price DECIMAL(10, 2) NOT NULL,
    additional_charges DECIMAL(10, 2) DEFAULT 0.00,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    final_price DECIMAL(10, 2) NOT NULL,
    salesman_notes TEXT,
    valid_until_date DATE,
    status VARCHAR(30) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);
