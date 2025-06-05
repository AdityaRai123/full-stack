# User Authentication System

A secure and modern user authentication system built with the MERN stack (MySQL, Express.js, React.js, Node.js) featuring login and signup functionality.

## Features

- 🔐 Secure user authentication
- ✨ Modern and responsive UI
- 🔒 Password encryption
- 📱 Mobile-friendly design
- 🚀 Fast and efficient performance

## Tech Stack

### Frontend
- React.js
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Form validation

### Backend
- Node.js
- Express.js
- MySQL Database
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Configuration

1. Create a `.env` file in the server directory:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret_key
   ```

2. Set up the MySQL database:
   ```sql
   CREATE DATABASE your_database_name;
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication

#### Sign Up
- **POST** `/api/auth/signup`
- **Body:**
  ```json
  {
    "username": "user@example.com",
    "password": "yourpassword",
    "name": "Your Name"
  }
  ```

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "username": "user@example.com",
    "password": "yourpassword"
  }
  ```

## Features in Detail

### Sign Up Page
- Email validation
- Password strength requirements
- Real-time form validation
- Success/error notifications
- Redirect to login after successful registration

### Login Page
- Remember me functionality
- Forgot password option
- Secure password handling
- JWT token-based authentication
- Session management

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected routes
- Input sanitization
- CORS protection
- Rate limiting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-email@example.com] or open an issue in the repository. 