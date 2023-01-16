import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Navigation from '../../navbar.jsx';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider';


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

    return (
        <BrowserRouter>

        <Navigation
            user={(user, token)}
            onLoggedOut={() => {
                setUser(null);
                setToken(null)
            }}
        />

        <Row className='justify-content-md-center'>
            <Routes>
                <Route
                path="/signup"
                element={
                    <>
                    {user ? (
                        <Navigate to="/" />
                    ) : (
                        <Col md={5}>
                            <SignupView />
                        </Col>
                    )}
                    </>
                } />
                <Route
                path="/login"
                element={
                    <>
                    {user ? (
                        <Navigate to ="/" />
                    ) : (
                        <Col md={5}>
                            <LoginView onLoggedIn={(user, token) => {setUser(user); setToken(token);}} />
                        </Col>
                    )}
                    </>
                } />
                <Route
                path="/movies/:movie"
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
                path="/"
                element={
                    <>
                    {!user ? (
                        <Navigate to="/login" replace />
                    ) : movies.length === 0 ?  (
                        <Col>The list is empty!</Col>
                    ) : (
                        <>
                        {movies.map((movie) => (
                        <Col className='mb-5' key={movie._id} md={3}>
                        <MovieCard
                            movie={movie}
                        />
                        </Col>
                        ))}
                        </>
                    )}
                    </>
                }
                />
            </Routes>
            </Row>
            </BrowserRouter>
    )}

//             {!user ? (
//                 <>
//                     <h1 className='text-center'> jessaFlix! </h1>
//                     <Col md={5}>
//                         <h1 className='text-center m-5'>Login</h1>
//                         <LoginView
//                             onLoggedIn={(user, token) => {
//                                 setUser(user);
//                                 setToken(token);
//                             }}
//                         />
//                         <h1 className='text-center m-5'>Register Today!</h1>
//                         <SignupView />
//                     </Col>
//                     {movies.map((movie) => (
//                     <Col className='mb-5' key={movie._id} md={3}>
//                     <MovieCard
//                         movie={movie}
//                         onMovieClick={(newSelectedMovie) => {
//                         setSelectedMovie(newSelectedMovie);
//                         }}
//                     />
                    
//                 </>

//             ) : selectedMovie ? (
//                 <MovieView
//                     movie={selectedMovie}
//                     onBackClick={() => setSelectedMovie(null)} />
//             ) : movies.length === 0 ? (
//                 <div> The list is empty </div>
//             ) : (
//                 <>
//                     <Navigation />
//                     {movies.map((movie) => (
//                         <Col className='mb-5' key={movie._id} md={3}>
//                             <MovieCard
//                                 movie={movie}
//                                 onMovieClick={(newSelectedMovie) => {
//                                     setSelectedMovie(newSelectedMovie);
//                                 }}
//                             />
//                         </Col>
//                     ))}
//                 </>
//             )
//             }</Row>
//             </BrowserRouter>
//     )
// }