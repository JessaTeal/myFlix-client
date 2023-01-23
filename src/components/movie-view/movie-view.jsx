import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import './movie-view.scss';
import Navigation from '../../navbar';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

export const MovieView = ({ movies }) => {
    const { movieID } = useParams();
    const movie = movies.find((m) => m._id === movieID);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState("");
    const storedToken = localStorage.getItem("token")
    const token = storedToken;

    if (!token) return;

    fetch('https://jessaflix.herokuapp.com/users/' + storedUser.Username, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
        .then((response) => response.json(user))
        .then(user => {
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
        })

    const moviesList = storedUser.FavoriteMovies



    const addToFavorites = () => {

        if (!token) return;

        fetch('https://jessaflix.herokuapp.com/users/' + storedUser.Username + '/movies/' + movieID, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                alert("Movie has been added to favorites");
                return response.json(),
                    console.log(storedUser.FavoriteMovies)
            })
            .then(
                document.getElementById('favoritesButton').innerHTML = "Remove from Favorites"
            )
            .catch((error) => {
                alert("Something went wrong");
            })
    };

    const removeFromFavorites = () => {

        if (!token) return;

        fetch('https://jessaflix.herokuapp.com/users/' + storedUser.Username + '/movies/' + movieID, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                alert("Movie has been removed from favorites");
                return response.json(),
                    console.log(storedUser.FavoriteMovies)
            })
            .then(
                document.getElementById('favoritesButton').innerHTML = "Add to Favorites"
            )
            .catch((error) => {
                alert("Something went wrong");
            })
    };


    return (
        <div>
            <Row className="movie-view text-center">
                <Col>
                    <img className='image' crossOrigin={"anonymous"} src={movie.ImagePath} />
                </Col>
                <Col className="text-center movieInfoView">
                    <span className="movie-title rightColumn mb-3">{movie.Title}</span>
                    <span className="rightColumn mb-3">Director: {movie.Director.Name} </span>

                    <span className="rightColumn mb-3">Genre: {movie.Genre.Name} </span>
                    <span className="rightColumn mb-3">{movie.Description}</span>
                    <Link to={'/'}>
                        <Button className='back-button'>Back</Button>
                    </Link>
                    <Button
                        onClick={
                            ((moviesList.includes(movieID)) ?
                                (removeFromFavorites)
                                :
                                (addToFavorites))}
                        className='favoritesButton m-3'
                        id='favoritesButton'>
                        {
                            ((moviesList.includes(movieID)) ?
                                ("Remove from Favorites")
                                :
                                ("Add to Favorites"))}
                    </Button>
                </Col>
            </Row>
        </div>
    );
}