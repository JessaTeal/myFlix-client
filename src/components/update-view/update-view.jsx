import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';

export const UpdateView = ({ user }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [email, setEmail] = useState("");

    if (!token) return (
        <LoginView />
    )


    const handleSubmit = (event) => {
        event.preventDefault();



        const data = {
            Username: username,
            Password: password,
            Email: email,
        };


        fetch('https://jessaflix.herokuapp.com/users/' + user.Username, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", user);
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
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formUsername'>
                <Form.Label>New Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='formPassword'>
                <Form.Label>New Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='formPassword'>
                <Form.Label>New Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='button' className='text-center justify-content-md-center m-2'>
                <Button variant='primary' type="submit">Submit</Button>
            </Form.Group>
        </Form>
    );
};