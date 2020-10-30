import React, {Component} from 'react';

import {connect} from "react-redux";
import {accountService} from "../../Services/account.service";





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
                                                    <p onClick={() => {}}
                                                       className='info nullbutton' data-toggle="modal"
                                                       data-target="#exampleModal">
                                                        Show more
                                                    </p>
                                                    <p onClick={() => accountService.removeMovie(movie)}
                                                       className='info nullbutton' data-toggle="modal"
                                                       data-target="#exampleModal">
                                                        Remove
                                                    </p>

                                                </div>
                                            </div>
                                        )
                                    })}

                            </div>


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