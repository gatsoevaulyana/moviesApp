

const movieReducer = (state = {
    movies: [],
    loading: true,
    error: null,
    shouldBeSorted: false,
    searchValueByActorName: '',
    searchValueByMovieName: '',
    isAuthenticated: true,
    text: 'test1'

}, action) => {

    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'MOVIES_LOADED':

            return Object.assign(
                {},
                state,
                {
                    movies: action.payload,
                    loading: false,
                    error: null
                }
            );
        case 'MOVIES_REQUESTED':
            return Object.assign(
                {},
                state,
                {
                    movies: [],
                    loading: true,
                    error: null
                }
            );

        case 'MOVIES_ERROR':
            return Object.assign(
                {},
                state,
                {
                    movies: [],
                    loading: false,
                    error: action.payload
                }
            );



        case 'ADD_MOVIE':
            return {
                movies: [action.payload, ...state.movies],
                loading: false,
                error: null
            };

        case 'DELETE_MOVIE':

            return (
                {
                    ...state,
                    movies: state.movies.filter((movie) => movie._id !== action.payload)

                });

        case 'LOAD_FROM_FILE':

            return (
                {
                    ...state,
                    movies: action.movies

                });

        case 'SORT_MOVIES': {
            return Object.assign(
                {},
                state,
                {
                    shouldBeSorted: true
                }
            )
        }
        case 'SET_SEARCH_BY_ACTOR': {
            return Object.assign(
                {},
                state,
                {
                    searchValueByActorName: action.value
                }
            );

        }

        case 'SET_SEARCH_BY_TITLE': {
            return Object.assign(
                {},
                state,
                {
                    searchValueByMovieName: action.value
                }
            );

        }

        case 'AUTH': {
            return Object.assign(
                {},
                state,
                {
                    text: action.value
                }
            );
            }


        case 'CLEAR_SEARCH_BY_ACTOR': {
            return Object.assign(
                {},
                state,
                {
                    searchValueByActorName: ''
                }
            );
        }



    }
    return state;
};

export default movieReducer;

