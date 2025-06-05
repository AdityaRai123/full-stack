import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    
    const handleChanges = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        
        // Check password match when either password field changes
        if (name === 'password' || name === 'confirmPassword') {
            if (name === 'password' && values.confirmPassword) {
                setPasswordError(value === values.confirmPassword ? '' : 'Passwords do not match');
            } else if (name === 'confirmPassword') {
                setPasswordError(value === values.password ? '' : 'Passwords do not match');
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (values.password !== values.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/auth/register', {
                username: values.username,
                email: values.email,
                password: values.password
            })
            if(response.status === 201) {
                navigate('/login')
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='shadow-lg px-8 py-5 border w-96'>
                <h2 className='text-lg font-bold mb-4'>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">Username</label>
                        <input 
                            type="text" 
                            placeholder='Enter Username' 
                            className='w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500' 
                            name="username" 
                            onChange={handleChanges}
                            required
                            pattern="^[a-zA-Z0-9_]{3,20}$"
                            title="Username must be 3-20 characters long and can only contain letters, numbers, and underscores"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input 
                            type="email" 
                            placeholder='Enter Email' 
                            className='w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500' 
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
                            className='w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500' 
                            name="password" 
                            onChange={handleChanges}
                            required
                            minLength="6"
                            title="Password must be at least 6 characters long"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
                        <input 
                            type="password" 
                            placeholder='Confirm Password' 
                            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${passwordError ? 'border-red-500' : ''}`}
                            name="confirmPassword" 
                            onChange={handleChanges}
                            required
                        />
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                        )}
                    </div>
                    <button 
                        type='submit' 
                        className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200'
                        disabled={!!passwordError}
                    >
                        Submit
                    </button>
                </form>
                <div className='text-center mt-4'>
                    <p>Already have account? <Link to="/login" className="text-blue-600 underline">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register
