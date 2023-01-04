import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import './movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            
            <div className="movie-view">
                <Col className="movie-title">
                    <span className="value">{movie.Title}</span>
                </Col>
                <Col className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                </Col>
                <Col className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </Col>
            <Row>
               <Col className="movie-poster">
                    <img crossOrigin={"anonymous"} src= {movie.ImagePath} />
                </Col>
                <Col className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </Col>
            </Row>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}