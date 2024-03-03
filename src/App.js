import './App.css';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import React from 'react';
import HomePage from "./components/HomePage/HomePage";
import AuthenticationPage from "./components/AuthenticationPage/AuthenticationPage";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/authentication" element={<AuthenticationPage/>}/>
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
