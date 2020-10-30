import isEmpty from "../isEmpty";

const userReducer = (state = {
        user: null,
        isAuthenticated: false,
        favMovies: []

    }, action) => {

        // eslint-disable-next-line default-case
        if (action.type === 'AUTH') {
            return {
                ...action.payload,
                user: action.payload,
                isAuthenticated: true
            };
        }

        if (action.type === 'FAV_MOVIES_LOADED') {

            return Object.assign(
                {},
                state,
                {
                    favMovies: action.payload,
                    loading: false,
                    error: null
                }
            );
        }
        if (action.type === 'FAV_MOVIES_REQUESTED') {
            return Object.assign(
                {},
                state,
                {
                    favMovies: [],
                    loading: true,
                    error: null
                }
            );
        }

        if (action.type === 'FAV_MOVIES_ERROR') {
            return Object.assign(
                {},
                state,
                {
                    favMovies: [],
                    loading: false,
                    error: action.payload
                }
            );
        }
        return state;
    }
;

export default userReducer;