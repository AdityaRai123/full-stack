import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-semibold">Dashboard</div>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Profile</h2>
              <p className="text-gray-600">View and edit your profile information</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Statistics</h2>
              <p className="text-gray-600">Check your activity statistics</p>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Settings</h2>
              <p className="text-gray-600">Manage your account settings</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 