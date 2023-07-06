import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();



  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    // Implement login logic here, e.g., make API request to validate credentials
    // You can use the fetch or axios library to make the request
    // Password validation logic
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/;
    if (!passwordRegex.test(password)) {
    // Set an error state to display the error message
    setError('Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character');
    return;
  }

    try {
        const response = await axios.post('/api/login', {
          username,
          password,
        });
    
        // Assuming the server responds with a success message or token
        const { success, token } = response.data;
    
        if (success) {
          // Store the token in local storage or global state for future use
          localStorage.setItem('token', token);
    
          // Redirect the user to the game page or desired route
          history.push('/Games')
          // You can use the useHistory hook from 'react-router-dom' for redirection
         
        } else {
          // Handle login failure, display error message, etc.
          setError('Invalid username or password');
        }
      } catch (error) {
        // Handle any error that occurred during the API request
        console.error('Login error:', error);
      }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
