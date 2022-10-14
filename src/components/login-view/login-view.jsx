import React, {useState} from 'react';
import './login-view.scss';

export function LoginView(props) {
    const[ username, setUsername ] = useState('');
    const[ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    };
    return (
        <form class="login">
            <label class="username">
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>                
            <button type='button' onClick={handleSubmit}>Submit</button>
            <button type='button' onClick={''}>New User!</button>
            </form>
        );
    }