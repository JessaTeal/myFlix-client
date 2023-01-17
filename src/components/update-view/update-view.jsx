import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export const UpdateView = ({ user }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    console.log(user)

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://jessaflix.herokuapp.com/users/:user", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Update Successful");
                window.location.reload();
            } else {
                alert("Update Failed");
            }
        });
    };

    console.log(user)
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formUsername'>
                <Form.Label>New Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} required
                    minLength="3"
                />
            </Form.Group>
            <Form.Group controlId='formPassword'>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} required
                />
            </Form.Group>
            <Form.Group controlId='formEmail'>
                <Form.Label>New Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} required
                />
            </Form.Group>
            <Form.Group controlId='button' className='text-center justify-content-md-center m-2'>
                <Button type="submit">Update Information</Button>
            </Form.Group>
        </Form>
    );
};