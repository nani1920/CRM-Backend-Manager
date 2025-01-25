# CRM-Backend-Manager

This project implements a RESTful API for a basic CRM (Customer Relationship Management) system. It allows for managing customer data, user authentication, and provides search and filtering capabilities.

## Project Description

This backend API provides the core functionality for a CRM application. It enables users to manage customer data (contacts, companies), register and login, and tracks interactions. The API is designed to be scalable, secure, and well-documented, making it suitable for consumption by a separate frontend application.

## Technologies Used

*   **Node.js:** JavaScript runtime environment
*   **Express.js:** Web application framework for Node.js
*   **PostgreSQL/MySQL:** Relational database
*   **Sequelize/TypeORM:** ORM for database interaction
*   **JSON Web Token (JWT):** For user authentication
*   **bcrypt:** For password hashing
*   **dotenv:** For managing environment variables

## Features

*   **Customer Management:**
    *   Create, read, update, and delete customer data.
    *   Customer data includes: `id`, `name`, `email`, `phone`, `company`, `created_at`, and `updated_at`.
    *   Unique email constraints.
    *   Timestamps for creation and updates.
*   **User Authentication:**
    *   User registration and login endpoints.
    *   Secure password hashing using bcrypt.
    *   JWT-based authentication for protected API routes.
*   **Database Design:**
    *   Relational database ( MySQL).
    *   Database schema with appropriate tables and relationships.
*   **Search and Filtering:**
    *   Search customers by name, email, or phone.
    *   Filter customers by the associated company.
*   **Error Handling and Validation:**
    *   Input data validation for fields like email format and required data.
    *   Proper HTTP status codes and error messages.
*   **API Documentation:**
    *   Comprehensive API documentation generated with AI.

## Installation

To set up and run the API locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    cd YOUR_REPOSITORY_NAME
    ```
    *  Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your github username and repository name respectively.
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up your database:**
    *   Create a PostgreSQL or MySQL database.
    *   Configure your database connection details in a `.env` file.
    *   Run database migrations/schema setup (see below).
4.  **Create a `.env` file in the root directory.** Include the following environment variables (replace the placeholders):
    ```
    DB_HOST="your_db_host"
    DB_USER="your_db_user"
    DB_PASSWORD="your_db_password"
    DB_NAME="your_db_name"
    DB_PORT=5432 (or your MySQL port)
    JWT_SECRET="your_jwt_secret_key"
    PORT=4000
    ```
    *   `DB_HOST`: Your database host.
    *   `DB_USER`: Your database username.
    *   `DB_PASSWORD`: Your database password.
    *   `DB_NAME`: Your database name.
    *  `DB_PORT`: Your database port.
    *   `JWT_SECRET`: A secret key for JWT token generation.
    *   `PORT`: The port number the server will listen on (default 4000).
5.  **Run database migrations:**
     * If using Sequelize: `npx sequelize db:migrate`
     * If using TypeORM: `npx typeorm migration:run`

## Usage

1.  **Start the server:**
    ```bash
    npm run dev
    ```
2. The API will be accessible at `http://localhost:4000` (or the port specified in your `.env` file).

3.  **API Endpoints:**

# API Endpoints: Authentication

This section describes the authentication-related API endpoints for the CRM system.

*   **Authentication:**

    ### Registration Endpoint

    **POST** `/auth/register`

    #### Description:
    This endpoint allows a user to register by providing their `username`, `email`, `password`, and `role`.  If the role is `user`, additional fields `name`, `phone`, and `company` are also required. It validates the input data (e.g., ensures the email is correctly formatted).

    #### Request Format:

    **URL**: `/auth/register`

    **Method**: `POST`

    **Request Body (JSON)**:
    ```json
    {
        "username": "john_doe",
        "email": "john.doe@example.com",
        "password": "password123",
        "role": "user",
        "name": "John Doe",
        "phone": "123-456-7890",
        "company": "Acme Corp"
    }
    ```
    or for admin user
       ```json
    {
        "username": "admin_user",
        "email": "admin.user@example.com",
        "password": "admin_password",
         "role": "admin"
    }
    ```

* `username` (required, string): The username of the user. Must be unique.
    * `email` (required, string): The email address of the user. Must be unique and in valid format.
    * `password` (required, string): The password for the user account.
    * `role` (required, string): The role of the user. Options: `admin`, `user`.
    * `name` (required if `role` is `user`, string): The name of the customer (only for user role).
     * `phone` (required if `role` is `user`, string): The phone number of the customer (only for user role).
    * `company` (required if `role` is `user`, string): The company the customer is associated with (only for user role).
        

    **Example Request:**
    ```bash
    POST /auth/register HTTP/1.1
    Host: your-api-domain.com
    Content-Type: application/json

    {
        "username": "john_doe",
        "email": "john.doe@example.com",
        "password": "password123",
         "role": "user",
        "name": "John Doe",
        "phone": "123-456-7890",
        "company": "Acme Corp"
    }
    ```
    or for admin user
     ```bash
    POST /auth/register HTTP/1.1
    Host: your-api-domain.com
    Content-Type: application/json

   {
        "username": "admin_user",
        "email": "admin.user@example.com",
        "password": "admin_password",
        "role": "admin"
    }
    ```

    #### Expected Responses:

    *   **201 Created**: User registration successful. Returns a success message.
        
        **Response (for user role):**
        ```json
        {
            "message": "Customer-user created Successfully"
        }
        ```
          **Response (for admin role):**
        ```json
        {
            "message": "Admin-User created Successfully"
        }
        ```

    *   **400 Bad Request**: One or more fields are missing or invalid, including existing username, email, or incorrect input format.
          **Example Responses:**
         * if username is not provided:
            ```json
            {
                "message": "Invalid - Username field required"
             }
           ```
         * If email is not provided:
            ```json
            {
               "message": "Invalid - Email field required"
            }
          ```

    * if password is not provided:
        ```json
            {
              "message":"Invalid - Password field required"
            }
        ```

    * if role is not provided:
        ```json
              {
                "message":"Invalid - Role field required"
              }
        ```
         * If the name is not provided for user-role:
            ```json
             {
               "message": "Invalid - Name field required"
            }
            ```
         * If the phone is not provided for user-role:
             ```json
             {
              "message": "Invalid - PhoneNo field required"
             }
            ```
       * If the company is not provided for user-role:
            ```json
             {
               "message":"Invalid - Company field required"
              }
             ```
        * If the username already exists:
         ```json
                {
                    "message": "User already Exists"
                }
         ```
        * If the email already exists:
             ```json
                {
                    "message": "User already Exists with this Email"
                }
             ```
        *   If the email format is invalid:
            ```json
                {
                "message": "Invalid email format"
                }
             ```

    *   **500 Internal Server Error**: A server error occurred, such as a database failure or unexpected error.
        
        **Example Response:**
        ```json
        {
            "message": "Internal Server Error"
        }
        ```

    ### Login Endpoint

    **POST** `/auth/login`

    #### Description:
    This endpoint allows a user to log in by providing their `username` and `password`. It checks if the user exists in the database and verifies the provided password against the stored hash. Upon successful authentication, it returns a JWT token for subsequent authorized requests.

    #### Request Format:

    **URL**: `/auth/login`

    **Method**: `POST`

    **Request Body (JSON)**:
    ```json
    {
        "username": "john_doe",
        "password": "password123"
    }
    ```
    *   `username` (required, string): The username of the user.
    *   `password` (required, string): The password for the user account.

    **Example Request:**
    ```bash
    POST /auth/login HTTP/1.1
    Host: your-api-domain.com
    Content-Type: application/json

    {
        "username": "john_doe",
        "password": "password123"
    }
    ```

    #### Expected Responses:

    *   **200 OK**: Login successful. Returns a JWT token.
        
        **Response:**
        ```json
        {
            "jwtToken": "your_jwt_token"
        }
        ```

    *   **400 Bad Request**: Invalid input (e.g., missing username or password) or password mismatch.
        
        **Example Responses:**
            *   If the username is missing or invalid:
            ```json
            {
                "message": "Invalid - Username field required"
            }
            ```
            * If the password is missing or invalid:
            ```json
            {
                "message": "Invalid - Password field required"
            }
           ```
           * If the password doesn't matched:
             ```json
             {
               "message":"Password Doesn't Matched"
               }
             ```
    *   **404 Not Found**:  If the username doesn't exist.
         
         **Response:**
            ```json
            {
               "message":"Username Doesn't Exist"
             }
            ```

    *   **500 Internal Server Error**: A server error occurred, such as a database failure or unexpected error.
        
        **Example Response:**
        ```json
        {
            "message": "Internal Server Error"
        }
        ```


*   **Customers:**

    ### Get All Customers Endpoint

    **GET** `/customers`

    #### Description:
    This endpoint retrieves a list of customers, with options for searching by name, email, or phone, and filtering by company. It also supports pagination.

    #### Request Format:

    **URL**: `/customers`

    **Method**: `GET`

    **Authorization**: Requires a valid JWT token in the `Authorization` header with "Bearer " prefix.

    **Query Parameters:**
    *   `name` (optional, string): Search customers by name (case-insensitive, partial match).
    *   `email` (optional, string): Search customers by email (case-insensitive, partial match).
    *   `phone` (optional, string): Search customers by phone number (case-insensitive, partial match).
    *   `company` (optional, string): Filter customers by company name (case-insensitive, partial match).
    *   `page` (optional, integer): Page number for pagination (default is 1).
    *   `limit` (optional, integer): Number of customers per page (default is 10).

    **Example Request:**
    ```bash
    GET /customers?name=john&company=Acme&page=2&limit=20 HTTP/1.1
    Host: your-api-domain.com
    Authorization: Bearer your_jwt_token
    ```

    #### Expected Responses:

    *   **200 OK**: Returns a paginated list of customers matching the search and filter criteria.
        
        **Response:**
        ```json
        {
            "customers": [
                {
                    "id": "customer_id",
                    "name": "John Doe",
                    "email": "john.doe@example.com",
                    "phone": "123-456-7890",
                    "company": "Acme Corp",
                     "created_at": "date",
                     "updated_at": "date"
                },
                // ... more customers
            ],
            "totalCustomers": 150,
            "totalPages": 15,
            "currentPage": 2
        }
        ```
            *  `customers`: Array of customers for the current page.
           *  `totalCustomers`: Total number of matching customers.
          * `totalPages`: Total number of pages.
         * `currentPage`: Current page number.

    *   **401 Unauthorized**: If the user is not authenticated.

    *   **404 Not Found**: If no customers match the search/filter criteria.
        
        **Response:**
        ```json
        {
            "message": "No customers Found"
        }
        ```

    *   **500 Internal Server Error**: A server error occurred, such as a database failure or unexpected error.
        
        **Example Response:**
        ```json
        {
            "message": "Internal Server Error"
        }
        ```

    ### Get Customer by ID Endpoint

    **GET** `/customers/:customerId`

    #### Description:
    This endpoint retrieves a specific customer's data by their ID.

    #### Request Format:

    **URL**: `/customers/:customerId`

    **Method**: `GET`

    **Authorization**: Requires a valid JWT token in the `Authorization` header with "Bearer " prefix.
    
 **URL Parameters:**
        
*  `customerId` (required, string): The ID of the customer to retrieve.

    **Example Request:**
    ```bash
     GET /customers/123 HTTP/1.1
    Host: your-api-domain.com
    Authorization: Bearer your_jwt_token
    ```

    #### Expected Responses:

    *   **200 OK**: Returns the customer data.
        
        **Response:**
        ```json
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "123-456-7890",
            "company": "Acme Corp"
         }
        ```

    *  **400 Bad Request**: If the `customerId` format is invalid.
          
       **Response:**
            ```json
            {
                "message":"Invalid Customer Id"
            }
            ```
    *   **401 Unauthorized**: If the user is not authenticated.

    *   **403 Forbidden**:  If the user is not authorized to access other users' details(unless the user is an admin).
    
      **Response:**
         ```json
        {
           "message": "Access Denied- You can only Access your details"
          }
         ```

    *   **404 Not Found**: If the customer with the given ID is not found.
        
        **Response:**
        ```json
        {
            "message": "Customer-User not Found"
        }
        ```

    *   **500 Internal Server Error**: A server error occurred, such as a database failure or unexpected error.
        
        **Example Response:**
        ```json
        {
            "message": "Internal Server Error"
        }
        ```

    ### Update Customer Endpoint

    **PUT** `/customers/:customerId`

    #### Description:
    This endpoint allows an authenticated user to update a customer's data by their ID. Only `name`, `phone`, and `company` fields are updatable.

    #### Request Format:

    **URL**: `/customers/:customerId`

    **Method**: `PUT`

    **Authorization**: Requires a valid JWT token in the `Authorization` header with "Bearer " prefix.
    
   **URL Parameters:**
        
    *  `customerId` (required, string): The ID of the customer to be updated.
        
    **Request Body (JSON)**:
    ```json
    {
        "name": "Updated John Doe",
        "phone": "987-654-3210",
        "company": "Updated Acme Corp"
    }
    ```
    * `name` (optional, string): The updated name of the customer.
    * `phone` (optional, string): The updated phone number of the customer.
    * `company` (optional, string): The updated company of the customer.

    **Example Request:**
    ```bash
     PUT /customers/123 HTTP/1.1
    Host: your-api-domain.com
    Content-Type: application/json
    Authorization: Bearer your_jwt_token
    {
        "name": "Updated John Doe",
        "phone": "987-654-3210",
        "company": "Updated Acme Corp"
    }
    ```

    #### Expected Responses:

    *   **200 OK**: Customer updated successfully. Returns a success message.
        
        **Response:**
        ```json
        {
            "message": "User details updated Successfully"
         }
        ```
    *   **401 Unauthorized**: If the user is not authenticated.
    
    *   **403 Forbidden**: If the user is not authorized to update other user details(unless user is an admin).
        
       **Response:**
         ```json
         {
           "message":"Access Denied- You can only Update your details"
           }
           ```
    *   **404 Not Found**: If the customer with the given ID is not found.
        
        **Response:**
        ```json
        {
            "message": "User Not Found"
        }
        ```

    *   **500 Internal Server Error**: A server error occurred, such as a database failure or unexpected error.
        
        **Example Response:**
        ```json
        {
            "message": "Internal Server Error"
        }
        ```

     ### Delete Customer Endpoint

    **DELETE** `/customers/:customerId`

    #### Description:
    This endpoint allows deleting a customer by their ID. Only accessible to authenticated users.

    #### Request Format:

    **URL**: `/customers/:customerId`

    **Method**: `DELETE`

    **Authorization**: Requires a valid JWT token in the `Authorization` header with "Bearer " prefix.
    
    **URL Parameters:**
        
    *  `customerId` (required, string): The ID of the customer to be deleted.

    **Example Request:**
    ```bash
      DELETE /customers/123 HTTP/1.1
       Host: your-api-domain.com
       Authorization: Bearer your_jwt_token
    ```
    #### Expected Responses:

    *   **200 OK**: Customer deleted successfully. Returns a success message.
    
        **Response:**
        ```json
        {
           "message": "Customer Deleted Successfully"
         }
        ```
    *   **400 Bad Request**: If the `customerId` is invalid.
        
         **Response:**
            ```json
            {
               "message":"Invalid - customerId"
             }
            ```
    *   **401 Unauthorized**: If the user is not authenticated.

    *   **404 Not Found**: If the customer with the given ID is not found.
        
        **Response:**
        ```json
        {
            "message": "Customer not found"
        }
        ```

    *   **500 Internal Server Error**: A server error occurred, such as a database failure or unexpected error.
        
        **Example Response:**
        ```json
        {
            "message": "Internal Server Error"
        }
        ```
        
     ### Search Customers Endpoint
    
 **GET** `/customers/search`

 #### Description:
   This endpoint allows searching for customers based on name, email, or phone and filtering by company.
 #### Request Format:
      
   **URL**: `/customers/search`
        
**Method**: `GET`

**Authorization**: Requires a valid JWT token in the `Authorization` header with "Bearer " prefix.

**Query Parameters:**
        *  `query` (optional, string): The search term for name, email, or phone.
        *  `company` (optional, string): The company name to filter by.
        
 **Example Request:**
       ```bash
        GET /customers/search?query=john&company=Acme HTTP/1.1
        Host: your-api-domain.com
        Authorization: Bearer your_jwt_token
       ```
        #### Expected Responses:
        
*   **200 OK**: Returns an array of customer data matching the search and filter criteria.
            
        **Response:**
              ```json
              {
                "customers": [
                 {
                  "id": "customer_id",
                   "name": "John Doe",
                    "email": "john.doe@example.com",
                     "phone": "123-456-7890",
                     "company": "Acme Corp",
                     "created_at": "date",
                     "updated_at": "date"
                   }
                 ]
                }
              ```
*   **401 Unauthorized**: If the user is not authenticated.

  *   **404 Not Found**: If no customers match the criteria.
            
                **Response:**
              ```json
                {
                    "message": "No customers found matching the criteria"
                }
              ```

        *   **500 Internal Server Error**: A server error occurred, such as a database failure or unexpected error.
          
          **Response:**
          ```json
          {
              "message": "Internal Server Error"
          }
         ```   
      *   Use tools like Postman or CURL to interact with the API endpoints.

# API Endpoints: Interaction Management

This section describes the API endpoints for managing customer interactions within the CRM system.

*   **Interactions:**

 ### Create Interaction Endpoint

 **POST** `/customers/:customerId/interactions`

#### Description:
This endpoint allows creating a new interaction (e.g., note, follow-up reminder) for a specific customer.

 #### Request Format:

**URL**: `/customers/:customerId/interactions`

**Method**: `POST`

**Authorization**: Requires a valid JWT token in the `Authorization` header with "Bearer " prefix.

**URL Parameters:**
* `customerId` (required, string): The ID of the customer to add the interaction for.

    **Request Body (JSON)**:
    ```json
    {
        "note": "Called customer for follow up.",
        "followUpDate": "2024-03-15T10:00:00Z"
    }
    ```
    * `note` (required, string): The note or details of the interaction.
    * `followUpDate` (optional, string): Date and time for a follow-up (ISO format).

    **Example Request:**
    ```bash
    POST /customers/123/interactions HTTP/1.1
    Host: your-api-domain.com
    Content-Type: application/json
     Authorization: Bearer your_jwt_token
    {
        "note": "Called customer for follow up.",
        "followUpDate": "2024-03-15T10:00:00Z"
    }
    ```

    #### Expected Responses:

    *   **201 Created**: Interaction logged successfully. Returns a success message and the created interaction data.

        **Response:**
       ```json
       {
           "message": "Interaction logged successfully",
            "interaction": {
               "id":"interaction_id",
                "note": "Called customer for follow up.",
                "followUpDate": "2024-03-15T10:00:00Z",
                "customerId":"customer_id",
                "created_at":"date",
                "updated_at":"date"
                }
            }
       ```

    *   **401 Unauthorized**: If the user is not authenticated.

    *   **404 Not Found**: If the customer with the given ID is not found.
        
        **Response:**
        ```json
        {
            "message": "Customer not found"
        }
        ```

    *   **500 Internal Server Error**: A server error occurred, such as a database failure or unexpected error.
        
        **Example Response:**
        ```json
        {
            "message": "Internal Server Error"
        }
        ```
 ### Get Interactions by Customer ID Endpoint

**GET** `/customers/:customerId/interactions`

#### Description:
This endpoint retrieves all interactions for a specific customer, ordered by the most recent first.

#### Request Format:

**URL**: `/customers/:customerId/interactions`

**Method**: `GET`

**Authorization**: Requires a valid JWT token in the `Authorization` header with "Bearer " prefix.

**URL Parameters:**
*   `customerId` (required, string): The ID of the customer to retrieve interactions for.

    **Example Request:**
    ```bash
    GET /customers/123/interactions HTTP/1.1
    Host: your-api-domain.com
    Authorization: Bearer your_jwt_token
    ```

    #### Expected Responses:

    *   **200 OK**: Returns an array of interactions for the customer.

         **Response:**
            ```json
            {
              "interactions": [
                 {
                    "id":"interaction_id",
                     "note": "Called customer for follow up.",
                    "followUpDate": "2024-03-15T10:00:00Z",
                    "customerId":"customer_id",
                    "created_at":"date",
                     "updated_at":"date"
                   },
                  // ... more interactions
                 ]
                }
             ```
    *   **401 Unauthorized**: If the user is not authenticated.

    *   **404 Not Found**: If the customer with the given ID is not found, or if no interactions are found for the customer.
        
        **Example Response:**
          *If the customer is not found:
             ```json
            {
                "message": "Customer not found"
            }
            ```
          * If no interactions are found for customer:
              ```json
              {
                "message": "No interactions found for this customer"
              }
              ```
    *   **500 Internal Server Error**: A server error occurred, such as a database failure or unexpected error.
        
        **Example Response:**
        ```json
        {
            "message": "Internal Server Error"
        }
        ```
        
 ### Get All Interactions Endpoint

   **GET** `/interactions`

#### Description:
This endpoint retrieves all interactions from all the customers  ordered by the most recent first..

#### Request Format:
**URL**: `/interactions`

**Method**: `GET`

**Authorization**: Requires a valid JWT token in the `Authorization` header with "Bearer " prefix.
   
**Example Request:**
         ```bash
        GET /interactions HTTP/1.1
        Host: your-api-domain.com
        Authorization: Bearer your_jwt_token
        ```

 #### Expected Responses:

   *  **200 OK**: Returns an array of all the interactions.
        
      **Response:**
         ```json
               {
                 "interactions": [
                   {
                     "id":"interaction_id",
                      "note": "Called customer for follow up.",
                      "followUpDate": "2024-03-15T10:00:00Z",
                       "customerId":"customer_id",
                       "created_at":"date",
                       "updated_at":"date"
                       },
                  // ... more interactions
                 ]
                }
              ```
*   **401 Unauthorized**: If the user is not authenticated.

*  **404 Not Found**: If no interactions are found.
     **Response:**
      ```json
            {
                "message": "No interactions found"
            }
       ```

 *   **500 Internal Server Error**: A server error occurred, such as a database failure or unexpected error.
            
    
**Example Response:**      
   ```json
            {
               "message": "Internal Server Error"
            }
```

## Deployment

1.  **Platform:** Deployed the application to Railway.

2.  **Environment Variables:** Configured the environment variables on the chosen deployment platform to match your `.env` file.

3.  **Deploy:** Followed the platform's deployment instructions.

4.  **Test:** Verify the live API endpoints by making requests via Postman or a similar tool to make sure everything is working.

## Contributing

Contributions are always welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature/your-feature-name` or `git checkout -b fix/your-fix-name`.
3.  Make your changes and commit: `git commit -m "Descriptive commit message"`.
4.  Push your changes to your fork: `git push origin feature/your-feature-name`.
5.  Create a pull request to the `main` branch of this repository.

Please ensure your code follows the existing style guidelines and includes relevant tests.

## License

[MIT](https://choosealicense.com/licenses/mit/)
