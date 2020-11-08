import axios from 'axios';
import {parseFile} from "../parseSampleMovies";
import { MOVIES_ERROR, MOVIES_LOADED, MOVIES_REQUESTED, FAV_MOVIES_ERROR, FAV_MOVIES_LOADED, FAV_MOVIES_REQUESTED , DELETE_MOVIE, SET_SEARCH_BY_ACTOR, SET_SEARCH_BY_TITLE, CLEAR_SEARCH_BY_ACTOR, SORT_MOVIES } from './types';
import {alertService} from "../Services/alert.service";

export const getMovies = () => dispatch => {
    dispatch({
        type: MOVIES_REQUESTED
    });
    axios.get('http://localhost:4000/movies').then(res => {
        dispatch({
            type: MOVIES_LOADED,
            payload: res.data,
        });
    })
        .catch((err) => dispatch({
            type: MOVIES_ERROR,
            payload: err
        }))

};



export const addMovie = (newMovie) => dispatch => {
    axios
        .post('http://localhost:4000/movies', newMovie)
        .then((res) => {
            alertService.success(res.data.msg);
            dispatch(getMovies())
        })
        .catch(function (error) {
            alertService.error(error.response.data.msg);
        });

};


export const deleteMovie = (id) => dispatch => {
    axios
        .delete(`http://localhost:4000/movies/${id}`)
        .then(() => {
                dispatch({
                    type: DELETE_MOVIE,
                    payload: id
                })
            }
        )
        .catch(function (error) {
            console.log(error.response);
        });

};


export const sortMovies = () => {
    return {
        type: SORT_MOVIES
    }
};

export const setSearchByActor = (value) => {
    return {
        type: SET_SEARCH_BY_ACTOR,
        value
    }
}

export const setSearchByTitle = (value) => {
    return {
        type: SET_SEARCH_BY_TITLE,
        value
    }
}




export const clearSearchByActor = () => {
    return {
        type: CLEAR_SEARCH_BY_ACTOR,
    }
}


export const loadSampleMovie = (file) => dispatch => {

    parseFile(file).then(data => {
        data.result.forEach(movie => {
            if (movie.title) {
                dispatch(addMovie(movie));
            }
        });
    });

};




