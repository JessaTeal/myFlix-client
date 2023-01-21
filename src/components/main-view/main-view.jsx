import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import Navigation from '../../navbar.jsx';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import { UpdateView } from '../update-view/update-view';
import './main-view.scss';


export function MainView() {

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
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


    return (
        <BrowserRouter>

            <Navigation
                user={(user, token)}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear()
                }}
            />

            <Row className='justify-content-md-center'>
                <Routes>
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" />
                                ) : (
                                    <>
                                        <ProfileView movies={movies} user={user}
                                            onLoggedOut={() => {
                                                setUser(null);
                                                setToken(null);
                                                localStorage.clear()
                                            }}
                                            onLoggedIn={(user, token) => { setUser(user); setToken(token); }}
                                        />
                                    </>
                                )
                                } </>
                        } />
                    <Route
                        path="/profile/:user"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" />
                                ) : (
                                    <>
                                        <Col className='mb-5' md={3}>
                                            <ProfileView movies={movies} user={user}
                                                onLoggedOut={() => {
                                                    setUser(null);
                                                    setToken(null);
                                                    localStorage.clear()
                                                }}
                                            />
                                        </Col>
                                        {movies.map((movie) => (
                                            <Col className='mb-5' key={movie._id} md={3}>
                                                <MovieCard movie={movie}
                                                />
                                            </Col>
                                        ))}
                                    </>

                                )
                                }
                            </>
                        } />

                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
                                    </Col>
                                )}
                            </>
                        } />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
                                    </Col>
                                )}
                            </>
                        } />
                    <Route
                        path="/movies/:movieID"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        } />
                    <Route
                        path="/users/:user"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={8}>
                                        <UpdateView user={user}
                                            onLoggedIn={(user, token) => { setUser(user); setToken(token); }}
                                        />
                                    </Col>
                                )}
                            </>
                        } />

                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        <div className='text-center mb-5'>
                                            <h1 className='welcomeBack'>Welcome Back!</h1>
                                        </div>

                                        {movies.map((movie) => (
                                            <Col className='mb-5' key={movie._id} md={3}>
                                                <MovieCard movie={movie}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        } />
                </Routes>
            </Row>
        </BrowserRouter>
    )
}