import React, { useReducer, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Navigation from '../../navbar';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { Card } from 'react-bootstrap';

// const storedUser = JSON.parse(localStorage.getItem("user"));
// const user = useState(storedUser ? storedUser : null);

export function ProfileView(user) {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            <Card className='card h-100'>
                <Card.Body>
                    <Card.Title className='text-center'> Username: {storedUser.Username} </Card.Title>
                    <Card.Text className='text-center'>Email: {storedUser.Email}</Card.Text>
                    <Card.Text className='text-center'>Birthday: {storedUser.Birthday}</Card.Text>
                    <Card.Text className='text-center'>Favorite Movies: {storedUser.FavoriteMovies}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

