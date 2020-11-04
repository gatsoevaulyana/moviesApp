import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import parseSampleBooks from "../../parseSampleMovies";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import './Header.css';
import {
    loadSampleMovie
} from '../../Actions/MoviesActions';
import AddBookModal from "../AddMovie/AddMovieModal";
import Login from "../Login/Login";
import Navbar from "./Navbar";
import RegModal from "../RegModal/RegModal";
import {logoutUser} from "../../Actions/AuthActions";
import {connect} from "react-redux";
import {Account} from '../../Account/Index';
import Modal from "react-modal";

class Header extends Component {


    constructor() {
        super();

        this.state = {
            searchBy: 'title',
            showAddModal: false,
            showLoginModal: false,
            showRegModal: false,
            isAuth: false
        };

        this.handleShowAddModal = this.handleShowAddModal.bind(this);
        this.loadSampleMovie = this.loadSampleMovie.bind(this);
        this.handleShowLoginModal = this.handleShowLoginModal.bind(this);
        this.handleShowRegModal = this.handleShowRegModal.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.changeSearchBy = this.changeSearchBy.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

    }


    changeSearchBy() {

        if (this.state.searchBy === 'title') {
            this.setState({
                searchBy: 'actor'
            })
        }

        if (this.state.searchBy === 'actor') {
            this.setState({
                searchBy: 'title'
            })
        }

    }

    handleKeyDown = (e) => {

        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    loadSampleMovie() {
        this.props.loadSampleMovie();
    }

    onFileInput = (e) => {
        const file = e.target.files[0];
        this.props.loadSampleMovie(file);
    };


    handleLogout = e => {
        e.preventDefault();

        console.log('logout')
    };

    handleShowAddModal(value) {
        this.setState({showAddModal: value});
    }

    handleShowLoginModal(value) {
        this.setState({showLoginModal: value});
    }

    handleShowRegModal(value) {
        this.setState({showRegModal: value});
    }


    render() {

        return (
            <div>

                <div className={'header'}>


                    <button className={'btn btn-primary'} onClick={this.props.sortMovies}>

                        <i className="icon fa fa-sort" aria-hidden="true"></i>
                        <span>Sort by name</span>
                    </button>
                    <p></p>


                    <p></p>

                    <button className={'btn btn-primary'} onClick={() => this.handleShowAddModal(true)}> Add Movie
                    </button>




                    <div className={'searchBlock'}>

                        <p className={'searchBy'}> Search by: </p>

                        <ToggleButtonGroup className={'toggleGroup'} defaultValue={'bold'} name={'searchBy'}
                                           onChange={this.changeSearchBy} aria-label="text formatting">
                            <ToggleButton className={'toggleBut'} value="bold" aria-label="bold">
                                Title
                            </ToggleButton>
                            <ToggleButton className={'toggleBut'} value="italic" aria-label="italic">
                                Actor
                            </ToggleButton>
                        </ToggleButtonGroup>


                        <div className={'search_input'}>
                            {this.state.searchBy === 'title' ?
                                <div>
                                    <form className="form-inline my-2 my-lg-0">
                                        <input onChange={this.props.searchByMovieName} onKeyDown={this.handleKeyDown}
                                               onSubmit={this.props.searchByMovieName} className="form-control mr-sm-2"
                                               type="text"
                                               placeholder="Search"/>

                                    </form>
                                </div> :
                                <div>
                                    <form className="form-inline">
                                        <input onChange={this.props.searchByActorName} onKeyDown={this.handleKeyDown}
                                               onSubmit={this.props.searchByActorName} className="form-control mr-sm-2"
                                               type="text"
                                               placeholder="Search"/>

                                    </form>
                                </div>
                            }
                        </div>


                    </div>


                    <div className={'addBlock'}>
                        {this.state.showAddModal ?
                            <AddBookModal showModal={this.handleShowAddModal}
                                          onFileInput={this.onFileInput}/> :

                            null
                        }
                    </div>

                    <div>
                        {this.state.showLoginModal ?
                            <Login showModal={this.handleShowLoginModal}/> :
                            null
                        }
                    </div>

                    <div className={'addBlock'}>
                        {this.state.showRegModal ?
                            <RegModal showModal={this.handleShowRegModal}/> :
                            null
                        }
                    </div>

                </div>
            </div>
        )
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => {
            dispatch(logoutUser());
        },
        loadSampleMovie:
            (fileText) => {
                dispatch(loadSampleMovie(fileText))
            }
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Header);