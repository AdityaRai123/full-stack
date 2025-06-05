import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/forgot-password', { email });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            setMessage('');
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='shadow-lg px-8 py-5 border w-96'>
                <h2 className='text-lg font-bold mb-4'>Forgot Password</h2>
                {message && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input 
                            type="email" 
                            placeholder='Enter your email' 
                            className='w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type='submit' 
                        className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200'
                    >
                        Send Reset Link
                    </button>
                </form>
                <div className='text-center mt-4'>
                    <p>Remember your password? <Link to="/login" className="text-blue-600 underline">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword; 