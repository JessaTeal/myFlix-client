import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { MovieCard } from '../movie-card/movie-card';
import { UpdateView } from '../update-view/update-view';
import { Link } from 'react-router-dom';


export const ProfileView = ({ movies, user, onLoggedOut }) => {

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const moviesList = currentUser.FavoriteMovies;
    const date = currentUser.Birthday ? new Date(currentUser.Birthday).toLocaleDateString() : "No Birthday";
    const token = localStorage.getItem("token");

    let favoriteMovies = movies.filter(m => currentUser.FavoriteMovies.includes(m._id));

    const deleteAccount = () => {
        if (!token) return;

        fetch('https://jessaflix.herokuapp.com/users/' + currentUser.Username + '/delete', {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(
                alert("account deleted")
            )
            .then(
                onLoggedOut
            )
    }

    const getFavorite = () => {
        if (!token) return;


        fetch('https://jessaflix.herokuapp.com/', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(
                alert(favoriteMovies),
            )
    }





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
            <Button onClick={deleteAccount}>Delete Account</Button>
        </div>
    );
}