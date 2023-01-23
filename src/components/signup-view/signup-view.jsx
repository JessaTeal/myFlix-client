import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { render } from 'react-dom';
import { LoginView } from '../login-view/login-view';
import './signup-view.scss';


export const SignupView = ({ onLoggedIn }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [name, setName] = useState("")


    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Name: name,
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://jessaflix.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }

        }).then((response) => {
            if (response.ok) {
                alert("Signup Successful");
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
            } else {
                alert("Signup Failed");
            }
        })
            .then((data) => {
                console.log(JSON.stringify(data))
            }
            );
    };


    return (
        <div>
            <Card className='card'>
                <h1 className='text-center justify-content-md-center m-4'>Register Today!</h1>
                <Form className='form justify-content-md-center m-2' onSubmit={handleSubmit}>
                    <Form.Group controlId='formUsername'>
                        <Form.Label className='label'>Name:</Form.Label>
                        <Form.Control
                            className='typeSpace'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)} required
                            minLength="3"
                        />
                    </Form.Group>
                    <Form.Group controlId='formUsername'>
                        <Form.Label className='label'>Username:</Form.Label>
                        <Form.Control
                            className='typeSpace'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} required
                            minLength="3"
                        />
                    </Form.Group>
                    <Form.Group controlId='formPassword'>
                        <Form.Label className='label'>Password</Form.Label>
                        <Form.Control
                            className='typeSpace'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} required
                        />
                    </Form.Group>
                    <Form.Group controlId='formEmail'>
                        <Form.Label className='label'>Email</Form.Label>
                        <Form.Control
                            className='typeSpace'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} required
                        />
                    </Form.Group>
                    <Form.Group controlId='formBirthday'>
                        <Form.Label className='label'>Birthday</Form.Label>
                        <Form.Control
                            className='typeSpace'
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)} required
                        />
                    </Form.Group>
                    <Form.Group controlId='button' className='text-center justify-content-md-center m-2'>
                        <Button className='button' type="submit">Register</Button>
                    </Form.Group>
                </Form>
            </Card>
            <h3 className='text-center justify-content-md-center m-2'>Already a member?</h3>
            <h5 className='text-center justify-content-md-center m-2'>Login!</h5>
            <Form.Group controlId='button' className='text-center justify-content-md-center'>
                <Button href="/login" className='button registerButton mb-5' variant='primary' type="submit">Login</Button>
            </Form.Group>
        </div>
    );
}