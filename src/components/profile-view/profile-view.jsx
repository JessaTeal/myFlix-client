import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';


export const ProfileView = ({ movies }) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const moviesList = user.FavoriteMovies;
    const date = user.Birthday ? new Date(user.Birthday).toLocaleDateString() : "No Birthday";

    console.log(moviesList, movies);

    return (
        <div>
            <Card>
                <p>Username: {user.Username}</p>
                <p>Email: {user.Email}</p>
                <p>Birthday: {date}</p>
            </Card>

            <p>Favorite Movies: {
                movies.length && moviesList.map(movieID => {
                    const movie = movies.find(m => m._id === movieID)
                    if (movie) return <MovieCard movie={movie} />;
                })}
            </p>



        </div>
    );
}