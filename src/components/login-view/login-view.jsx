import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();



        const data = {
            Username: username,
            Password: password
        };


        fetch('https://jessaflix.herokuapp.com/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    };

    return (
        <div>
            <Card className='card logincard'>
                <h1 className='text-center justify-content-md-center m-5'>Login!</h1>
                <Form className='justify-content-md-center m-2' onSubmit={handleSubmit}>
                    <Form.Group controlId='formUsername'>
                        <Form.Label className='label'>Username:</Form.Label>
                        <Form.Control
                            className='typeSpace'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId='formPassword'>
                        <Form.Label className='label'>Password:</Form.Label>
                        <Form.Control
                            className='typeSpace'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId='button' className='text-center justify-content-md-center m-4'>
                        <Button className='button' variant='primary' type="submit">Submit</Button>
                    </Form.Group>
                </Form>
            </Card>
            <h3 className='text-center justify-content-md-center m-3'>New to jessaFlix?</h3>
            <h5 className='text-center justify-content-md-center m-3'>SIGN UP TODAY!</h5>
            <Form.Group controlId='button' className='text-center justify-content-md-center m-2'>
                <Button href="/signup" className='button registerButton' variant='primary' type="submit">Register</Button>
            </Form.Group>
        </div>

    );
};