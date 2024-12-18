// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
// import { useAuth } from '../Auth/UseAuth';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate(); // Add navigate hook

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       await login(email, password);
//     } catch (err) {
//       setError('Invalid credentials. Please try again.');
//     }
//   };

//   // Add a handler for signup navigation
//   const handleSignupNavigation = (e) => {
//     e.preventDefault(); // Prevent default link behavior
//     console.log('Signup link clicked'); // Debug log
//     try {
//       navigate('/signup'); // Programmatic navigation
//     } catch (error) {
//       console.error('Navigation error:', error);
//     }
//   };

//   const logo = "https://www.go-yubi.com/wp-content/uploads/2022/12/Yubi-900x0-1.png";
//   return (
//     <div 
//       className="min-h-screen flex items-center justify-center p-6"
//       style={{ 
//         backgroundColor: '#f5f5f5',
//         color: '#333'
//       }}
//     >
//       <div 
//         className="w-full max-w-md p-8 rounded-lg shadow-lg"
//         style={{ 
//           backgroundColor: 'white',
//         }}
//       >
//          <img 
//           src={logo} 
//           alt="Yubi Logo" 
//           className="w-32 h-auto mb-6" // Added margin bottom
//         />
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label 
//               htmlFor="email" 
//               className="block mb-2 font-semibold"
//               style={{ color: '#fd7149' }}
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded-md"
//               style={{ 
//                 borderColor: '#fd7149',
//                 focusOutline: `1px solid #fd7149`
//               }}
//             />
//           </div>

//           <div>
//             <label 
//               htmlFor="password" 
//               className="block mb-2 font-semibold"
//               style={{ color: '#fd7149' }}
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded-md"
//               style={{ 
//                 borderColor: '#fd7149',
//                 focusOutline: `1px solid #fd7149`
//               }}
//             />
//           </div>

//           {error && (
//             <div 
//               className="text-red-600 text-center mb-4"
//               style={{ color: '#fd7149' }}
//             >
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full py-3 rounded-md text-white font-bold"
//             style={{ 
//               backgroundColor: '#fd7149',
//               transition: 'background-color 0.3s ease'
//             }}
//             onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff3366'}
//             onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fd7149'}
//           >
//             Continue
//           </button>

//           <div className="text-center mt-4">
//             <p>
//               Don't have an account? {' '}
//               <a 
//                 href="/signup" 
//                 onClick={handleSignupNavigation} 
//                 className="font-bold"
//                 style={{ color: '#fd7149' }}
//               >
//                 Sign Up
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Auth/UseAuth';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Handle login
        await login(email, password);
      } else {
        // Handle signup
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        await register(name, email, password);
      }
    } catch (err) {
      setError(isLogin ? 'Invalid credentials. Please try again.' : 'Registration failed. Please try again.');
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Reset form state when switching
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
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
        className="w-full max-w-md p-8 rounded-lg shadow-lg relative overflow-hidden"
        style={{ 
          backgroundColor: 'white',
          border: '1px solid #fd7149'
        }}
      >
        {/* Tab Buttons */}
       
        <AnimatePresence mode="wait">
          <motion.form 
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: isLogin ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? -50 : 50 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit} 
            className="space-y-4"
          >
            {!isLogin && (
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
                  required={!isLogin}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{ 
                    borderColor: '#fd7149',
                    outline: 'none',
                    boxShadow: 'none'
                  }}
                />
              </div>
            )}

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
                  outline: 'none',
                  boxShadow: 'none'
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
                  outline: 'none',
                  boxShadow: 'none'
                }}
              />
            </div>

            {!isLogin && (
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
                  required={!isLogin}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{ 
                    borderColor: '#fd7149',
                    outline: 'none',
                    boxShadow: 'none'
                  }}
                />
              </div>
            )}

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
              {isLogin ? 'Login' : 'Sign Up'}
            </button>

            <div className="text-center mt-4">
              <p>
                {isLogin 
                  ? "Don't have an account? " 
                  : "Already have an account? "}
                <button 
                  type="button"
                  onClick={toggleAuthMode}
                  className="font-bold ml-1"
                  style={{ color: '#fd7149' }}
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </div>
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthPage;