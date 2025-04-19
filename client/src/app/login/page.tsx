'use client';
import React, { useState } from 'react';
import './login.scss';

export default function LoginPage () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      // Handle the response data
    };
  return (
    <main className="l-main">
	<div className='l-login-page'>
	  <h1>Login Page</h1>
	  <form className='l-login-page__form' onSubmit={handleSubmit}>
		<label htmlFor="username">Username:</label>
		<input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
		
		<label htmlFor="password">Password:</label>
		<input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
		
		<button type="submit">Login</button>
	  </form>
	</div>
    </main>
  );
};