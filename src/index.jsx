import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { MainView } from './components/main-view/main-view';
import './index.scss';
import Navigation from './navbar';
import { BrowserRouter } from 'react-router-dom';


class MyFlixApplication extends React.Component {

    render() {
        return (
            <Container fluid>
                <Navigation />
                <MainView />
            </Container>
        );
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);