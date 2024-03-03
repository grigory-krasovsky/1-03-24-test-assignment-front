import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useAuthenticateMutation} from "../../api/authentication";
import {authProcess} from "../../redux/slices/authSlice";

const AuthenticationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [authenticate, authenticateResponse] = useAuthenticateMutation();


    useEffect(() => {
        authProcess(dispatch, authenticateResponse, navigate)
    }, [authenticateResponse]);

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticate({username, password})
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AuthenticationPage;