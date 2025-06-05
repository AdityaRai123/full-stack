import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {  
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        setError('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/auth/login', values)
            if(response.status === 201) {
                localStorage.setItem('token', response.data.token)
                navigate('/dashboard')
            }
        } catch(err) {
            if (err.response) {
                // Handle specific error messages from the server
                switch(err.response.status) {
                    case 409:
                        setError('User does not exist');
                        break;
                    case 401:
                        setError('Invalid password');
                        break;
                    default:
                        setError('Invalid login credentials');
                }
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='shadow-lg px-8 py-5 border w-96'>
                <h2 className='text-lg font-bold mb-4'>Login</h2>
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
                            placeholder='Enter Email' 
                            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
                            name="email" 
                            onChange={handleChanges}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            title="Please enter a valid email address"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <input 
                            type="password" 
                            placeholder='Enter Password' 
                            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
                            name="password" 
                            onChange={handleChanges}
                            required
                            minLength="6"
                            title="Password must be at least 6 characters long"
                        />
                    </div>
                    <button type='submit' className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200'>Submit</button>
                </form>
                <div className='text-center mt-4'>
                    <p>Dont have an account? <Link to="/register" className="text-blue-600 underline">Signup</Link></p>
                    <p className="mt-2"><Link to="/forgot-password" className="text-blue-600 underline">Forgot Password?</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login