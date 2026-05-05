# Pet Haven Backend

A Spring Boot REST API for the Pet Haven pet adoption platform.

## Features

- **User Authentication & Authorization** (JWT-based)
- **Complete CRUD Operations** for Pets
- **Search & Filtering** capabilities
- **Role-based Access Control** (USER/ADMIN)
- **H2 Database** for local development
- **CORS Support** for frontend integration

## Technologies Used

- **Spring Boot 3.2.0**
- **Spring Security** with JWT
- **Spring Data JPA**
- **H2 Database** (local) / PostgreSQL (production)
- **Maven** for dependency management
- **Jakarta Validation**

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Pets (CRUD)
- `GET /api/pets` - Get all pets
- `GET /api/pets/{id}` - Get pet by ID
- `GET /api/pets/status/{status}` - Get pets by status (AVAILABLE/ADOPTED/MISSING)
- `GET /api/pets/owner/{ownerId}` - Get pets by owner (authenticated)
- `GET /api/pets/search?keyword={keyword}` - Search pets
- `POST /api/pets` - Create new pet (authenticated)
- `PUT /api/pets/{id}` - Update pet (authenticated)
- `DELETE /api/pets/{id}` - Delete pet (authenticated)
- `GET /api/pets/count/{status}` - Get pet count by status

## Database Schema

### Users Table
- id (Primary Key)
- username (Unique)
- email (Unique)
- password (Encrypted)
- first_name, last_name
- phone, address, city
- role (USER/ADMIN)
- created_at, updated_at

### Pets Table
- id (Primary Key)
- name, age, location, breed
- status (AVAILABLE/ADOPTED/MISSING)
- description, image_url
- owner_name, contact_number
- owner_id (Foreign Key)
- created_at, updated_at

## Setup & Running

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Local Development (H2 Database)

1. **Clone and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

3. **Access H2 Console:**
   - URL: http://localhost:8080/h2-console
   - JDBC URL: jdbc:h2:mem:pethaven
   - Username: sa
   - Password: password

4. **API Base URL:**
   - http://localhost:8080/api

### Production Setup (PostgreSQL)

1. **Update application.properties:**
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/pethaven
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
   spring.jpa.hibernate.ddl-auto=update
   ```

2. **Add PostgreSQL dependency to pom.xml:**
   ```xml
   <dependency>
       <groupId>org.postgresql</groupId>
       <artifactId>postgresql</artifactId>
       <scope>runtime</scope>
   </dependency>
   ```

## Sample API Usage

### Register a new user:
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "firstName": "John"
  }'
```

### Login:
```bash
curl -X POST http://localhost:8080/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

### Get all pets:
```bash
curl -X GET http://localhost:8080/api/pets
```

### Create a pet (requires JWT token):
```bash
curl -X POST http://localhost:8080/api/pets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Fluffy",
    "age": 2,
    "location": "Cebu City",
    "breed": "Persian Cat",
    "status": "AVAILABLE",
    "description": "Very friendly cat",
    "imageUrl": "/images/cat1.jpg",
    "ownerName": "John Doe",
    "contactNumber": "09171234567"
  }'
```

## Security

- JWT tokens required for protected endpoints
- Password encryption using BCrypt
- Role-based access control
- CORS configuration for frontend integration

## Default Users

The application creates sample data on startup:
- **Admin:** username: `admin`, password: `admin123`
- **Users:** `johndoe`/`password`, `janesmith`/`password`

## Frontend Integration

The backend is designed to work with the React frontend. Make sure to:
1. Update CORS origins in `application.properties`
2. Use JWT tokens in Authorization headers for authenticated requests
3. Handle API responses appropriately in the frontend