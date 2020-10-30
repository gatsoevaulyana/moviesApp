import {Component, useEffect, useState} from "react";
import React from "react";
import './Header.css';
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Link from "react-router-dom/Link";
import {NavLink} from "react-router-dom";
import {accountService} from "../../Services/account.service";


export default class Navbar extends Component {

    constructor() {
        super();


        this.state = {
            searchBy: 'title',
            user: null
        };


    }

    setUser(value) {
        this.setState({
            user: value
        })
    };


    componentDidMount(prevProps, prevState, snapshot) {
        const subscription = accountService.user.subscribe(x => this.setUser(x));
        return subscription.unsubscribe;

    }


    render() {
        return (
            <div className={'custom_navbar'}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">MoviesApp</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <NavLink exact to="/" className="nav-item nav-link">All Movies</NavLink>

                            <div className={'navbar-nav mr-auto nav_user_components'}>
                                {!this.state.user ?
                                    <React.Fragment>
                                        <NavLink to="/account/login" className="nav-item nav-link">Login</NavLink>
                                        <NavLink to="/account/register" className="nav-item nav-link">Register</NavLink>

                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>
                                        <NavLink exact to="/myMovies" className="nav-item nav-link">My Movies</NavLink>
                                        <NavLink exact to="/" onClick={accountService.logout}
                                                 className="nav-item nav-link">Logout</NavLink>
                                    </React.Fragment>}
                            </div>

                        </ul>


                    </div>
                </nav>
            </div>
        )
    }
}