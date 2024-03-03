import './App.css';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

import React from 'react';
import AuthenticationPage from "./components/authenticationPage/AuthenticationPage";
import {jwtUtils} from "./utils/utils";
import {Header} from "./components/common/Header";
import HomePage from "./components/homePage/HomePage";

const content = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/authentication" element={<AuthenticationPage/>}/>
            {!jwtUtils.getFromStorage() && <Route path="/*" element={<Navigate to="/authentication" replace />} />}
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
