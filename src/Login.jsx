import React from 'react';

import './Login.css';

function Login(props) {
  const { onUsernameChange, onPasswordChange } = props;
  return (
    <div className="loginContainer">
      <p>API Credentials</p>
      <div className="login">
        <label htmlFor="username">User:</label>
        <input id="username" type="text" onChange={(e) => onUsernameChange(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" onChange={(e) => onPasswordChange(e.target.value)} />
      </div>
    </div>
  );
}
export default Login;
