# MERN Stack Authentication System

A complete authentication system built with the MERN stack (MySQL, Express.js, React.js, Node.js) featuring user registration, login, and password reset functionality.

## Features

- 🔐 User Registration and Login
- ✨ Password Reset via Email
- 🔒 JWT Authentication
- 📧 Email Notifications using Nodemailer
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive Design
- 🔄 Form Validation
- 🔒 Secure Password Hashing

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn
- Gmail Account (for password reset functionality)

## Project Structure

```
project-root/
├── frontend/          # React frontend
├── server/           # Node.js backend
└── README.md
```

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE authentication;
```

2. The application will automatically create the required tables when you first run it.

### 3. Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure Email Settings:
   - Open `server/routes/authRoutes.js`
   - Update the email configuration with your Gmail credentials:
   ```javascript
   const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
           user: 'your-email@gmail.com',
           pass: 'your-app-password'
       }
   });
   ```
   Note: You need to use an App Password from your Google Account, not your regular Gmail password.

### 4. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### 1. Start the Backend Server

```bash
cd server
npm start
```
The server will run on http://localhost:3000

### 2. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:5173

## API Endpoints

### Authentication

#### Register
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "username": "example",
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

#### Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

#### Forgot Password
- **POST** `/auth/forgot-password`
- **Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```

#### Reset Password
- **POST** `/auth/reset-password`
- **Body:**
  ```json
  {
    "token": "reset-token",
    "newPassword": "newpassword"
  }
  ```

## Features in Detail

### User Registration
- Email validation
- Password strength requirements
- Username validation
- Duplicate email check

### Login
- JWT token-based authentication
- Error handling for invalid credentials
- Remember me functionality

### Password Reset
- Email-based password reset
- Secure token generation
- Token expiration (1 hour)
- Password confirmation

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected routes
- Input sanitization
- CORS protection
- Secure password reset flow

## Troubleshooting

### Common Issues

1. **Email Not Sending**
   - Ensure you're using an App Password from Google Account
   - Check if 2-Step Verification is enabled
   - Verify email configuration in authRoutes.js

2. **Database Connection Issues**
   - Verify MySQL server is running
   - Check database credentials in db.js
   - Ensure database 'authentication' exists

3. **Frontend Not Connecting to Backend**
   - Verify both servers are running
   - Check CORS configuration
   - Ensure correct API endpoints

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email [your-email@example.com] or open an issue in the repository. 