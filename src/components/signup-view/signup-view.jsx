import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { render } from 'react-dom';
import { LoginView } from '../login-view/login-view';

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
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formUsername'>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} required
                    minLength="3"
                />
            </Form.Group>
            <Form.Group controlId='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} required
                    minLength="3"
                />
            </Form.Group>
            <Form.Group controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} required
                />
            </Form.Group>
            <Form.Group controlId='formEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} required
                />
            </Form.Group>
            <Form.Group controlId='formBirthday'>
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)} required
                />
            </Form.Group>
            <Form.Group controlId='button' className='text-center justify-content-md-center m-2'>
                <Button type="submit">Register</Button>
            </Form.Group>
        </Form>
    );
}