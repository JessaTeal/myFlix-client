import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../../navbar';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            token: null,
            setToken: null
        };
    }
    componentDidMount() {
        axios.get('https://jessaflix.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error)
            });
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {

        const { movies, selectedMovie, user, token } = this.state;

        if (!user) {
            return (
                <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }}
                />
            );
        }

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div>
                <Navigation />
                <Row className="main-view justify-content-md-center">
                    {selectedMovie
                        ? (
                            <Col md={5}>
                                <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        )
                        : (
                            movies.map((movie) => (
                                <Col md={2}>
                                    <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
                                </Col>
                            ))
                        )
                    }
                </Row>
            </div>
        )
    }
};