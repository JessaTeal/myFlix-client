import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { MovieCard } from '../movie-card/movie-card';
import { UpdateView } from '../update-view/update-view';
import { Link } from 'react-router-dom';


export const ProfileView = ({ movies, users }) => {

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const moviesList = currentUser.FavoriteMovies;
    const date = currentUser.Birthday ? new Date(currentUser.Birthday).toLocaleDateString() : "No Birthday";


    return (
        <div>
            <Card>
                <p>Username: {currentUser.Username}</p>
                <p>Email: {currentUser.Email}</p>
                <p>Birthday: {date}</p>
            </Card>
            <Link to={'/profile/' + (currentUser.Username)}>
                <Button>Update</Button>
            </Link>

            <p>Favorite Movies: {
                movies.length && moviesList.map(movieID => {
                    const movie = movies.find(m => m._id === movieID)
                    if (movie) return <MovieCard movie={movie} />;
                })}
            </p>



        </div>
    );
}