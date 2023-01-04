import React, { useState } from 'react';
import './login-view.scss';
import PropTypes from 'prop-types';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    };
    return (
        <form className="login">
            <label className="username">
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type='button' onClick={handleSubmit}>Submit</button>
            <button type='button' onClick={handleSubmit}>New User!</button>
        </form>
    );
}