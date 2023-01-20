import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';

export const UpdateView = (user) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const currentUser = storedUser.Username
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState("");


    console.log(currentUser);


    const handleSubmit = (event) => {
        event.preventDefault();

        if (!token) return;

        console.log(token);


        const data = {
            Username: username,
            Password: password,
            Email: email,
        };


        fetch('https://jessaflix.herokuapp.com/users/' + currentUser, {
            headers: { Authorization: `Bearer ${token}` },
            method: "PUT",
            body: JSON.stringify(data)
        })
            .then((response) => response.json(data))
            .then(
                alert('update successful'),
            )
    };

    //method: "PUT",
    //headers: { Authorization: `Bearer ${token}` },
    //body: JSON.stringify(data)

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