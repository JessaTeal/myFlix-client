import React, { useEffect, useState } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { MovieCard } from '../movie-card/movie-card';
import { UpdateView } from '../update-view/update-view';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import Col from 'react-bootstrap/Col';



export const ProfileView = ({ movies, onLoggedOut }) => {

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState("");
    const moviesList = user.FavoriteMovies;
    const date = currentUser.Birthday ? new Date(currentUser.Birthday).toLocaleDateString() : "No Birthday";
    const token = localStorage.getItem("token");


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

    useEffect(() => {
        if (!token) return;

        fetch('https://jessaflix.herokuapp.com/users/' + currentUser.Username, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json(user))
            .then((user) => {
                setUser(user);
                localStorage.setItem("user", JSON.stringify(user));
            })
    });



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
                <p>Favorite Movies:
                    {/* <p className='favorites'>
                        {
                            movies.length && moviesList.map(movieID => {
                                const movie = movies.find(m => m._id === movieID)
                                if (movie) return <MovieCard movie={movie} />;
                            })}
                    </p> */}
                </p>
            </div>
        </div>
    );
}