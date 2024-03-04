import './App.css';
import {Provider, useSelector} from 'react-redux';
import {store} from './redux/store';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

import React from 'react';
import AuthenticationPage from "./components/authenticationPage/AuthenticationPage";
import {jwtUtils} from "./utils/utils";
import {Header} from "./components/common/Header";
import HomePage from "./components/homePage/HomePage";

const content = () => {
    const authorized = jwtUtils.isAuthorized(useSelector);

    return <Router>
        <Routes>
            {<Route path="/*" element={!authorized ? <Navigate to="/authentication" replace /> : <HomePage/>} />}
            <Route path="/authentication" element={<AuthenticationPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
        </Routes>
    </Router>
}

function App() {
    return (
        <Provider store={store}>
            <Header/>
            {content()}
        </Provider>
    );
}

export default App;
