import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import './movie-view.scss';
import Navigation from '../../navbar';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export const MovieView = ({ movies }) => {
    const { movieID } = useParams();
    const movie = movies.find((m) => m._id === movieID);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token")
    const token = storedToken;



    const addToFavorites = () => {
        if (!token) return;

        fetch('https://jessaflix.herokuapp.com/users/:Username/movies/:MovieID', {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then(
                console.log(storedUser)
            )
            .catch((e) => {
                alert("Something went wrong");
            });
    };

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
                    <Button onClick={addToFavorites} className='favoritesButton'>Add To Favorites</Button>


                </Col>
            </Row>
        </div>
    );
}