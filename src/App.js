import './App.css';
import {Provider, useSelector} from 'react-redux';
import {store} from './redux/store';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

import React from 'react';
import AuthenticationPage from "./components/authenticationPage/AuthenticationPage";
import {jwtUtils} from "./utils/utils";
import {Header} from "./components/common/Header";
import AdminPanel from "./components/panels/adminPanel/AdminPanel";
import {Home} from "./components/homePage/Home";
import DirectorPanel from "./components/panels/director-panel/DirectorPanel";
import TeacherPanel from "./components/panels/teacherPanel/TeacherPanel";

const content = () => {
    const authorized = jwtUtils.isAuthorized(useSelector);

    return <Router>
        <Routes>
            {<Route path="/*" element={!authorized ? <Navigate to="/authentication" replace /> : <Home/>} />}
            <Route path="/authentication" element={<AuthenticationPage/>}/>
            <Route path="/admin-panel" element={<AdminPanel/>}/>
            <Route path="/director-panel" element={<DirectorPanel/>}/>
            <Route path="/teacher-panel" element={<TeacherPanel/>}/>
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
