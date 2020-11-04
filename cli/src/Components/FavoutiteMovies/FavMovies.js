import React, {Component} from 'react';

import {connect} from "react-redux";
import {accountService} from "../../Services/account.service";
import './FavMovies.css';





class MovieList extends Component {


    constructor() {
        super();
        this.state = {
            showModalDesc: false,
            selectedMovie: 0
        };


    }


    loadSampleMovie() {
        this.props.loadSampleMovie();
    }


    componentDidMount() {


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

    handleShowModalDesc( movie, value) {
        this.toggleModalDesc(value);
        this.setSelectedMovie(movie);
    }

    addToWishlist(movie) {

        this.props.addMovieToWishlist(movie);

    };





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




        const user = accountService.userValue;




        return (

            <div className='movies_tab'>

                <div className='container-fluid movies_container'>
                    <div className='container'>






                        <div className={'movies'}>
                            {user.listFavMovies.length === 0 ? <p className={'notFound'}> Favourite movies not found </p> :
                                <div className='row'>
                                    {
                                        user.listFavMovies.map
                                        ((movie, index) => {
                                            return (
                                                <div className='col-sm-4' key={index}>
                                                    <div className='hovereffect'>

                                                        <h2>{movie['title']}</h2>
                                                        <h3>{movie['year']}</h3>
                                                        <h3>{movie['format']}</h3>

                                                        <img src={`${movie.picture}`}/>
                                                        <p></p>
                                                        <button className={'btn btn-primary'}
                                                                onClick={() => this.handleShowModalDesc(movie, true)}> Show
                                                            more
                                                        </button>
                                                        <p></p>
                                                        <div className={'remove-icon'}>
                                                            <a onClick={() => accountService.removeMovie(movie)}>
                                                                <svg width="1em" height="1em" viewBox="0 0 16 16"
                                                                     className="bi bi-x" fill="currentColor"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd"
                                                                          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                                </svg>
                                                            </a>
                                                        </div>


                                                    </div>
                                                </div>
                                            )
                                        })}

                                </div>

                            }
                        </div>







                        </div>


                    </div>
                </div>

        );
    }
}


const mapDispatchToProps = (dispatch) => {


};

function mapStateToProps(state) {
    return {

    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(MovieList);