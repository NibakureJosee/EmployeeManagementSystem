import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

export default function Register() {
  // Error state
  const [error, setError] = useState(null);

  // Handle the user input
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the user exists
      const user = await axios.post(`http://localhost:5000/api/users`, formData);
      navigate('/dashboard');
    } catch (error) {
      setError(error);
      console.log('Error message::', error);
    }
  };

  return (
    <section className='flex flex-col lg:flex-row justify-center items-center w-[100vw] h-[100vh]'>
      {/* Left Section */}
      <div className='bg-blue-900 text-white flex flex-col justify-center items-center w-full lg:w-1/2 h-[50vh] lg:h-full p-8'>
        <h1 className='text-3xl font-bold mb-4'>Welcome to Book Management</h1>
        <p className='text-lg text-center'>
          Student management system where you can manage and control all the students available.
        </p>
      </div>

      {/* Right Section */}
      <div className='flex flex-col justify-center items-center w-full lg:w-1/2 p-8'>
        <h1 className='text-2xl font-bold text-blue-900 mb-4'>Sign up</h1>
        <p className='mb-6 text-gray-600'>Happy to have you here</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-md gap-4'>
          <input type="text" placeholder="Enter your firstname" name="firstname" onChange={handleChange} className='py-4 px-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
          <input type="text" placeholder="Enter your lastname" name="lastname" onChange={handleChange} className='py-4 px-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
          <input type="email" placeholder="Enter your email" name="email" onChange={handleChange} className='py-4 px-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
          <input type="password" placeholder="Enter your password" name="password" onChange={handleChange} className='py-4 px-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-800 placeholder:text-lg'/>
          
          <button type="submit" className='w-full bg-blue-900 text-white py-4 rounded-md hover:opacity-75 font-bold text-xl'>Continue</button>
        </form>

        <p className='mt-4'>Already have an account? <Link to="/" className='text-blue-900'>Sign in</Link></p>
        {error && <Alert msg={error.response.data.error} />}
      </div>
    </section>
  );
}
