import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/UseAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };
  const logo = "https://www.go-yubi.com/wp-content/uploads/2022/12/Yubi-900x0-1.png";
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
         
        }}
      >
         <img 
    src={logo} 
    alt="Yubi Logo" 
    className="w-32 h-auto"
  />
        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full  py-3 rounded-md text-white font-bold"
            style={{ 
              backgroundColor: '#fd7149',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff3366'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fd7149'}
          >
  Continue
          </button>

          <div className="text-center mt-4">
            <p>
              Don't have an account? {' '}
              <Link 
                to="/signup" 
                className="font-bold"
                style={{ color: '#fd7149' }}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;