import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/UseAuth';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(name, email, password);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };
  const handleSignupLinkClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    console.log('Signup link clicked'); // Add console log
    navigate('/login'); // Programmatic navigation
  };
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{ 
        backgroundColor: '#f5f5f5',
        color: '#333'
      }}
    >
      <div 
        className="w-full max-w-md p-8 rounded-lg shadow-lg"
        style={{ 
          backgroundColor: 'white',
          border: '1px solid #fd7149' 
        }}
      >
        <h2 
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: '#fd7149' }}
        >
          Sign Up
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="name" 
              className="block mb-2 font-semibold"
              style={{ color: '#fd7149' }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
              style={{ 
                borderColor: '#fd7149',
                focusOutline: `1px solid #fd7149`
              }}
            />
          </div>

          <div>
            <label 
              htmlFor="email" 
              className="block mb-2 font-semibold"
              style={{ color: '#fd7149' }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
              style={{ 
                borderColor: '#fd7149',
                focusOutline: `1px solid #fd7149`
              }}
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block mb-2 font-semibold"
              style={{ color: '#fd7149' }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
              style={{ 
                borderColor: '#fd7149',
                focusOutline: `1px solid #fd7149`
              }}
            />
          </div>

          <div>
            <label 
              htmlFor="confirm-password" 
              className="block mb-2 font-semibold"
              style={{ color: '#fd7149' }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
              style={{ 
                borderColor: '#fd7149',
                focusOutline: `1px solid #fd7149`
              }}
            />
          </div>

          {error && (
            <div 
              className="text-red-600 text-center mb-4"
              style={{ color: '#fd7149' }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-md text-white font-bold"
            style={{ 
              backgroundColor: '#fd7149',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff3366'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fd7149'}
          >
            Sign Up
          </button>

          <div className="text-center mt-4">
            <p>
              Already have an account? {' '}
              <Link 
                to="/login" 
                 onClick={handleSignupLinkClick} 
                className="font-bold"
                style={{ color: '#fd7149' }}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;