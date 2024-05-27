**Overview** 

This project consists of two main parts: the client-side application (client) and the server-side application (Login). The client-side is a React application, and the server-side is built with Node.js using Express and MongoDB.

**Client**

The client-side application is a React-based frontend that interacts with the server via API calls.

**Setup**
1. Install Dependencies:
   
   cd client
   
   npm install

3. Run the Application:
   
   npm run dev

**Server**

The backend handles API requests, manages user authentication, performs CRUD operations on MongoDB, and ensures secure communication using JWT for session management.

**Setup**
1. Install Dependencies:
 
   cd Login
   
   npm install
   
3. Environment Variables:
   
   PORT=3000
   
   MONGO_URL=mongodb+srv://your_mongodb_connection_string
   
5. Run the Server:

   node index.js


**Features**

**Secure Password Handling**

    Hashing Passwords: Utilizes bcrypt to hash and salt passwords before storing them in the database, ensuring that plain text passwords are never stored.
    
**User Authentication**

    JWT (JSON Web Tokens): Implements JWT for secure and efficient user authentication. The token is generated upon login and used to authenticate API requests.
    
**Role-Based Access Control**

    User(Tenant) and Admin(Property Owners) Roles: Supports different levels of access where certain routes are protected and only accessible by users with the admin role.
    
**CRUD Operations**

    Property Management: Admins can create, read, update, and delete property listings through specific endpoints, demonstrating full CRUD capabilities.


**CORS Configuration**

The server is configured to handle CORS to accept requests from specified origins. Update the allowedOrigins array in index.js to include the domains of your client applications.


**MongoDB Connection**

Ensure that the MongoDB connection string in the .env file is correct. The server uses this string to connect to the MongoDB database.


**API Endpoints**

The server provides several API endpoints for user authentication and property management. These endpoints include:
/register and /login for user authentication.
/properties for property management.
