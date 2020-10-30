import {BehaviorSubject} from 'rxjs';

import {fetchWrapper} from '../Utils/fetch-wrapper';
import {history} from "../Utils/history";
import {getFavMovies} from "../Actions";

const userSubject = new BehaviorSubject(null);
const baseUrl = `http://localhost:4000/accounts`;

export const accountService = {
    login,
    logout,
    refreshToken,
    register,
    verifyEmail,
    forgotPassword,
    addMovieToWishlist,
    validateResetToken,
    resetPassword,
    removeMovie,
    getAll,
    getById,
    create,
    update,
    user: userSubject.asObservable(),
    get userValue() {
        return userSubject.value
    }
};


function removeMovie(movie) {
    const id = userSubject.getValue().id;
    return fetchWrapper.delete(`${baseUrl}/myMovies`, {id, movie})
        .then(user => {
            userSubject.next(user);
        })
        .catch(function (error) {
            console.log(error.response);
        });
}

function login(email, password) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, {email, password})
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function addMovieToWishlist(movie) {
    const id = userSubject.getValue().id;
    return fetchWrapper.post(`${baseUrl}/myMovies`, {id, movie})
        .then(user => {
            userSubject.next(user);
        })
        .catch(function (error) {
            console.log(error.response);
        });
}

function logout() {
    // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
    fetchWrapper.post(`${baseUrl}/revoke-token`, {});
    stopRefreshTokenTimer();
    userSubject.next(null);
    history.push('/account/login');
}

function refreshToken() {
    return fetchWrapper.post(`${baseUrl}/refresh-token`, {})
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function register(params) {
    return fetchWrapper.post(`${baseUrl}/register`, params);
}

function verifyEmail(token) {
    return fetchWrapper.post(`${baseUrl}/verify-email`, {token});
}

function forgotPassword(email) {
    return fetchWrapper.post(`${baseUrl}/forgot-password`, {email});
}

function validateResetToken(token) {
    return fetchWrapper.post(`${baseUrl}/validate-reset-token`, {token});
}

function resetPassword({token, password, confirmPassword}) {
    return fetchWrapper.post(`${baseUrl}/reset-password`, {token, password, confirmPassword});
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(user => {
            // update stored user if the logged in user updated their own record
            if (user.id === userSubject.value.id) {
                // publish updated user to subscribers
                user = {...userSubject.value, ...user};
                userSubject.next(user);
            }
            return user;
        });
}



// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}
