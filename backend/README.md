# JewelCraft Spring Boot Backend

Personalized Jewellery Design & Showroom Appointment Platform for **REDDY JEMS AND JEWELLERY**.

## Technologies
- Java 17
- Spring Boot 3.2.3
- Spring Web / REST APIs
- Spring Data JPA
- Spring Security + JWT Authentication
- MySQL Database
- Maven
- Lombok

## Project Package Architecture
```
com.jewelcraft
├── controller/         # REST API endpoints (Auth, Jewellery, Designs, Metals, Diamonds, Customization, Showrooms, Appointments, Quotations, Admin)
├── service/            # Core business logic & PriceCalculationService
├── repository/         # Spring Data JPA repositories
├── entity/             # Relational entity mappings (User, Jewellery, Design, Metal, Diamond, Showroom, Appointment, Quotation)
├── dto/                # Request & Response Data Transfer Objects
├── security/           # Spring Security configuration & JWT utilities
├── config/             # CORS and MVC configurations
└── JewelCraftApplication.java
```

## Database Setup (MySQL)
1. Ensure MySQL server is running on `localhost:3306`.
2. Create database:
```sql
CREATE DATABASE jewelcraft;
```
3. Update database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jewelcraft?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```
4. On startup, Hibernate automatically creates tables according to JPA entities. You can also execute `src/main/resources/schema.sql` and `src/main/resources/data.sql` to populate initial demo data.

## Running the Backend

Run with Maven:
```bash
mvn spring-boot:run
```

Or build the executable JAR:
```bash
mvn clean package
java -jar target/jewelcraft-backend-1.0.0.jar
```

The Spring Boot REST API will start at:
`http://localhost:8080/api`

## REST Endpoints Overview
- `POST /api/auth/login` - User authentication (Customer, Salesman, Admin)
- `POST /api/auth/register` - Customer registration
- `GET /api/jewellery` - Catalog of jewellery archetypes
- `GET /api/designs` - Mounting designs
- `GET /api/metals` - Precious metals with live rates
- `GET /api/diamonds` - Certified natural diamonds
- `POST /api/customizations/calculate-price` - Live valuation calculation formula
- `GET /api/showrooms` - Showroom salon details
- `POST /api/appointments` - Book appointment with complete configuration
- `POST /api/quotations` - Issue final certified quotation
- `GET /api/admin/stats` - Operations metrics
