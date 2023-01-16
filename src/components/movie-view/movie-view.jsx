import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import './movie-view.scss';
import Navigation from '../../navbar';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div>
                <Navigation />

                <Row className="movie-view text-center">
                    <Col>
                        <img className='image' crossOrigin={"anonymous"} src={movie.ImagePath} />
                    </Col>

                    <Col className="text-center">
                        <span className="movie-title rightColumn">{movie.Title}</span>
                        <span className="rightColumn">Director: {movie.Director.Name} </span>

                        <span className="rightColumn">Genre: {movie.Genre.Name} </span>
                        <span className="rightColumn">{movie.Description}</span>
                        <button onClick={() => { onBackClick(null); }}>Back</button>


                    </Col>
                </Row>
            </div>
        );
    }
}