import React, {Component} from 'react';
import MovieListItem from "../MovieListItem/MovieListItem";
import {connect} from "react-redux";
import withMoviestoreService from "../HOC/withMoviestoreService";
import {
    getMovies,
    sortMovies,
    clearSearchByActor,
    setSearchByActor,
    setSearchByTitle,

} from '../../Actions/MoviesActions';

import {addMovieToWishlist} from '../../Actions/AuthActions';

import './MovieList.css';
import Spinner from "../Spinner/Spinner";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import {bindActionCreators} from "redux";
import ModalDesc from "../ModalDesc/ModalDesc";
import AddMovieModal from "../AddMovie/AddMovieModal";
import './MovieList.css';
import sortMoviesSelector from "../../Selectors/Movies";
import Header from "../Header/Header";
import Navbar from "../Header/Navbar";
import {accountService} from "../../Services/account.service";
import {NavLink} from "react-router-dom";

class MovieList extends Component {


    constructor() {
        super();
        this.state = {
            showModalDesc: false,
            selectedMovie: 0,
            user: null
        };

        this.handleShowModalDesc = this.handleShowModalDesc.bind(this);
        this.sortMovies = this.sortMovies.bind(this);
        this.toggleModalDesc = this.toggleModalDesc.bind(this);
        this.setSelectedMovie = this.setSelectedMovie.bind(this);
        this.searchByActorName = this.searchByActorName.bind(this);

        this.searchByMovieName = this.searchByMovieName.bind(this);
        this.addMovieToWishlist = this.addMovieToWishlist.bind(this);


    }



    setUser(value) {
        this.setState({
            user: value
        })
    };




    addMovieToWishlist(movie) {
        this.props.addMovieToWishlist(movie);
    }


    componentDidMount() {
        const subscription = accountService.user.subscribe(x => this.setUser(x));
        this.props.getMovies();
        this.props.clearSearch();
        return subscription.unsubscribe;

    }

    searchByMovieName(e) {
        this.props.setSearchByTitle(e.target.value.toLowerCase());
    }

    searchByActorName(e) {
        this.props.setSearchByActor(e.target.value.toLowerCase());
    }

    sortMovies() {
        this.props.sortMovies();
    }

    toggleModalDesc(value) {
        this.setState({
            showModalDesc: value
        });
    }

    setSelectedMovie(movie) {
        this.setState({selectedMovie: movie});
    }

    handleShowModalDesc(movie, value) {
        this.toggleModalDesc(value);
        this.setSelectedMovie(movie);
    }


    onFileInput = (e) => {
        const file = e.target.files[0];
        this.props.loadSampleMovie(file);
    };


    searchByActors(text, searchValue) {
        let lines = text.split(', ');
        let include = false;


        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith(searchValue)) {
                include = true;
            }
        }
        return include;
    }


    render() {

        const {movies, searchValueByActorName, searchValueByMovieName, error, loading} = this.props;

        const spinner = loading ? <Spinner/> : null;
        const err = error ? <ErrorIndicator/> : null;


        this.movies = movies.filter(
            (movie) =>
                movie['stars'].toLowerCase().startsWith(searchValueByActorName) &&
                movie['title'].toLowerCase().startsWith(searchValueByMovieName)
        );


        if (searchValueByActorName !== '') {
            this.movies = movies.filter(
                (movie) =>
                    this.searchByActors(movie['stars'].toLowerCase(), searchValueByActorName)
            );
        }

        if (searchValueByMovieName !== '') {
            this.movies = movies.filter(
                (movie) =>
                    movie['title'].toLowerCase().startsWith(searchValueByMovieName)
            );
        }


        return (

            <div className='movies_tab'>

                <div className='container-fluid movies_container'>
                    <div className='container'>


                        <Header
                            sortMovies={this.sortMovies}
                            onFileInput={this.onFileInput}
                            searchByActorName={this.searchByActorName}
                            searchByMovieName={this.searchByMovieName}
                        />
                        <p></p>


                        <div className={'movies'}>

                            {spinner}
                            {error}

                            <div className='row'>
                                {

                                    this.movies.map
                                    ((movie, index) => {
                                        return (
                                            <div className='col-sm-4' key={index}>
                                                <div className='hovereffect'>

                                                    <h2>{movie['title']}</h2>
                                                    <h5>{movie['year']}</h5>
                                                    <img src={`${movie.picture}`}/>
                                                    <p></p>
                                                    <button className={'btn btn-primary'}
                                                            onClick={() => this.handleShowModalDesc(movie, true)}> Show
                                                        more
                                                    </button>
                                                    <p></p>
                                                    {!this.state.user ?
                                                        null
                                                        :
                                                        <React.Fragment>
                                                            <div className={'wishlist-icon'}>
                                                                <a  className={'btn heart'} onClick={() => accountService.addMovieToWishlist(movie)}>
                                                                    <svg width="1em" height="1em" viewBox="0 0 16 16"
                                                                         className="bi bi-suit-heart-fill" fill="currentColor"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </React.Fragment>}



                                                </div>
                                            </div>
                                        )
                                    })}

                            </div>

                            {this.state.showModalDesc ?
                                <ModalDesc
                                    showModal={this.toggleModalDesc}
                                    selectedMovie={this.state.selectedMovie}
                                /> :
                                null
                            }


                        </div>


                    </div>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getMovies: () => {
            dispatch(getMovies())
        },
        sortMovies: () => {
            dispatch(sortMovies());
        },
        setSearchByActor: (value) => {
            dispatch(setSearchByActor(value))
        },
        setSearchByTitle: (value) => {
            dispatch(setSearchByTitle(value))
        },
        clearSearch: () => {
            dispatch(clearSearchByActor())
        },

        addMovieToWishlist: (movie) => {
            dispatch(addMovieToWishlist(movie))
        }

    }
};

function mapStateToProps(state) {
    return {
        movies: sortMoviesSelector(state.movies),
        isAuthenticated: state.user.isAuthenticated,
        err: state.movies.error,
        loading: state.movies.loading,
        searchValueByActorName: state.movies.searchValueByActorName,
        searchValueByMovieName: state.movies.searchValueByMovieName
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(MovieList);