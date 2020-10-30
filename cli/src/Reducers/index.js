/**
 * rootReducer
 */
import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import MovieReducer from './MovieReducer';

const rootReducer = combineReducers({
    user: UserReducer,
    movies: MovieReducer
});


export default rootReducer;
