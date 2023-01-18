import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';



export const MovieCard = ({ movie }) => {


    return (
        <Card className='card h-100'>

            <Link>
                <Card.Img className='gridContainer' variant='top' src={movie.ImagePath} />
            </Link>
            <Card.Body className='text-center'>
                <Card.Title> {movie.Title} </Card.Title>
                <Card.Text> {movie.Genre.Name} </Card.Text>
                <Link to={'/movies/' + (movie._id)}>
                    <Button>View</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
        }).isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }).isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired
};
