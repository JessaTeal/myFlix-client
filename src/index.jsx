import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { MainView } from './components/main-view/main-view';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.scss';
import { BrowserRouter } from 'react-router-dom';


class MyFlixApplication extends React.Component {

    render() {
        return (
            <Container style={{ border: "1px solid red" }}>
                <MainView />
            </Container>
        );
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);