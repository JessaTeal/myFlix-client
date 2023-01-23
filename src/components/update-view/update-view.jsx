import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';

export const UpdateView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const currentUser = storedUser.Username
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [user, setUser] = useState("");



    if (!token) return;

    console.log(currentUser);


    const handleSubmit = (event) => {
        event.preventDefault();

        if (!token) return;

        const data = {
            Username: (username ? username : storedUser.Username),
            Password: (password ? username : storedUser.Password),
            Email: (email ? email : storedUser.Email),
        };


        fetch('https://jessaflix.herokuapp.com/users/' + currentUser, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(data)
        }).then(response => response.json(data))
            .then(
                alert("update successful!"),
            )
            .then(
                fetch('https://jessaflix.herokuapp.com/users/' + data.Username, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                })
                    .then((response) => response.json(user))
                    .then((user) => {
                        setUser(user);
                        localStorage.setItem("user", JSON.stringify(user));
                    })
            )
    };

    return (
        <div>
            <Card className='card'>
                <h1 className='text-center justify-content-md-center m-5'>Something changed?</h1>
                <Form className='justify-content-md-center m-2' onSubmit={handleSubmit}>
                    <Form.Group controlId='formUsername'>
                        <Form.Label className='label'>New Username:</Form.Label>
                        <Form.Control
                            className='typeSpace'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='formPassword'>
                        <Form.Label className='label'>New Password:</Form.Label>
                        <Form.Control
                            className='typeSpace'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='formEmail'>
                        <Form.Label className='label'>New Email:</Form.Label>
                        <Form.Control
                            className='typeSpace'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='button' className='text-center justify-content-md-center m-2'>
                        <Button className='button' variant='primary' type="submit">Submit</Button>
                    </Form.Group>
                </Form>
            </Card>
        </div>
    );
};