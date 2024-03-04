import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useAuthenticateMutation} from "../../api/authentication";
import {authProcess} from "../../redux/slices/authSlice";
import {Button, Container, InputLabel, TextField, Typography} from "@mui/material";

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
        <Container maxWidth="xs">
            <Typography variant="h2" align="center" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit} autoComplete="off">
                <InputLabel htmlFor="username">Username</InputLabel>
                <TextField
                    fullWidth
                    id={'username'}
                    margin="normal"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputLabel htmlFor="password">Password</InputLabel>
                <TextField
                    fullWidth
                    margin="normal"
                    id={'password'}
                    type='password'
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default AuthenticationPage;