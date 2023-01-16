import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import { Col, Row } from 'react-bootstrap';



export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return (
            <Card className=' card h-100'>

                <Card.Img className='gridContainer' variant='top' src={movie.ImagePath} onClick={() => onMovieClick(movie)} />
                <Card.Title className='text-center'> {movie.Title} </Card.Title>
                <Card.Body> {movie.Genre.Name} </Card.Body>
                <Button className='movieButton' onClick={() => onMovieClick(movie)}>View Movie</Button>
            </Card>
        );
    }
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
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};