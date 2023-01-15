import React from 'react';
import { useState, useEffect } from 'react';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Navigation from '../../navbar.jsx';


export function MainView() {

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);

    useEffect(() => {
        if (!token) return;


        fetch('https://jessaflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((movies) => {
                setMovies(movies);
            });
    }, [token]);

    if (!user) {
        return (
            <LoginView
                onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }}
            />
        );
    }

    if (selectedMovie) {
        return (
            <div>
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)} />
            </div>
        )
    }

    if (movies.length === 0) {
        return <div> The list is empty! </div>;
    }


    return (
        <div>
            <Navigation />
            <button onClick={() => { setUser(null); }}>Logout</button>

            {movies.map((movie) => {
                return <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            })}
        </div>
    )
}