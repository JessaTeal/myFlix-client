import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import './movie-view.scss';
import Navigation from '../../navbar';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const MovieView = ({ movies }) => {

    const { movieID } = useParams();
    const movie = movies.find((m) => m.id === movieID);

    return (
        <div>

            <Row className="movie-view text-center">
                <Col>
                    <img className='image' crossOrigin={"anonymous"} src={movie.ImagePath} />
                </Col>

                <Col className="text-center">
                    <span className="movie-title rightColumn">{movie.Title}</span>
                    <span className="rightColumn">Director: {movie.Director.Name} </span>

                    <span className="rightColumn">Genre: {movie.Genre.Name} </span>
                    <span className="rightColumn">{movie.Description}</span>
                    <Link to={'/'}>
                        <Button className='back-button'>Back</Button>
                    </Link>


                </Col>
            </Row>
        </div>
    );
}