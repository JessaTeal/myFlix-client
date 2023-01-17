import React from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


export const ProfileView = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const moviesList = JSON.stringify(user.FavoriteMovies);
    const date = new Date(user.Birthday).toLocaleDateString();


    return (
        <div>
            <Card>
                <p>Username: {user.Username}</p>
                <p>Email: {user.Email}</p>
                <p>Birthday: {date}</p>
            </Card>

            <Card>
                <p>Favorite Movies: {moviesList} </p>
            </Card>



        </div>
    );
}
