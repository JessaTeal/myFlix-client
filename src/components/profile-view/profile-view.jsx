import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { MovieCard } from '../movie-card/movie-card';
import { UpdateView } from '../update-view/update-view';
import { Link } from 'react-router-dom';
import './profile-view.scss';



export const ProfileView = ({ movies, user, onLoggedOut }) => {

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const moviesList = currentUser.FavoriteMovies;
    const date = currentUser.Birthday ? new Date(currentUser.Birthday).toLocaleDateString() : "No Birthday";
    const token = localStorage.getItem("token");

    const favoriteMovies = movies.filter(m => currentUser.FavoriteMovies.includes(m._id));

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

        let favoriteMovies = movies.filter(m => currentUser.FavoriteMovies.includes(m._id));


        // fetch('https://jessaflix.herokuapp.com/', {
        //     headers: { Authorization: `Bearer ${token}` },
        // })
        //     .then(
        //         alert(favoriteMovies),
        //     )
    }





    return (
        <div className='body'>
            <h1 className='header mb-5'>Welcome, {currentUser.Username}!</h1>
            <h3>Account Information:</h3>
            <div className='mb-5'>
                <p>
                    <strong>Username: </strong> {currentUser.Username} <br />
                    <strong>Email: </strong> {currentUser.Email} <br />
                    <strong>Birthday: </strong> {date}</p>
            </div>
            <div className='mb-5'>
                <Link className='buttons' to={'/users/' + currentUser.Username}>
                    <Button>Update</Button>
                </Link>
                <Button className='buttons' onClick={deleteAccount}>Delete Account</Button>
            </div>
            <div>
                <h3>Favorite Movies:</h3>
                <p></p>
            </div>
        </div>
    );
}