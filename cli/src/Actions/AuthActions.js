import axios from 'axios';
import jwt_decode from 'jwt-decode';
import authToken from "../Utils/authToken";
import {AUTH, FAV_MOVIES_ERROR, FAV_MOVIES_LOADED, FAV_MOVIES_REQUESTED} from './types';

// Login User
export const loginUser = (userData) => dispatch => {
    axios
        .post('http://localhost:8080/login', userData)
        .then(res => {
            // save token to local storage
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            // set token to auth header
            authToken(token);
            // decode token to get user data
            const decoded = jwt_decode(token);
            // set current user
            dispatch({type: AUTH, payload: decoded});
        })
        .catch(function (error) {
            console.log(error.response);
        })
};



export const registerUser = (userData) => dispatch => {
    axios
        .post('http://localhost:8080/register', userData)
        .then(res => {
            // save token to local storage
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            // set token to auth header
            authToken(token);
            // decode token to get user data
            const decoded = jwt_decode(token);
            // set current user
            dispatch({type: AUTH, payload: decoded});
        })
        .catch(function (error) {
            console.log(error.response);
        })
};


// logout user
export const logoutUser = () => dispatch => {
    // remove token from storage
    localStorage.removeItem('jwtToken');
    // remove auth header
    authToken(false);
    // set current user to empty {} which will set isAuthenticated to false
    dispatch((decoded) => {
        return {
            type: AUTH,
            payload: decoded,
        };
    });
};

export const getFavMovies = () => dispatch => {
    dispatch({
        type: FAV_MOVIES_REQUESTED
    });
    axios.get('http://localhost:4000/accounts/myMovies').then(res => {
        dispatch({
            type: FAV_MOVIES_LOADED,
            payload: res.data,
        });
    })
        .catch((err) => dispatch({
            type: FAV_MOVIES_ERROR,
            payload: err
        }))

};

export const addMovieToWishlist = (newMovie) => dispatch => {
    axios
        .post('http://localhost:4000/accounts/myMovies', newMovie)
        .then(() => {
            dispatch(getFavMovies())
        })
        .catch(function (error) {
            console.log(error.response);
        });

};
