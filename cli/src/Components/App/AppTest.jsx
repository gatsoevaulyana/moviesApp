import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect, useLocation} from 'react-router-dom';
import {accountService} from '../../Services/account.service';
import {Nav} from '../UserComponents/Nav';
import {PrivateRoute} from "../UserComponents/PrivateRoute";
import {Alert} from "../UserComponents/Alert";
import {Home} from '../../home';
import {Profile} from '../../profile';
import {Account} from '../../Account';
import HomePage from "../Pages/HomePage";
import Navbar from "../Header/Navbar";
import './App.css';
import FavMovies from "../FavoutiteMovies/FavMovies";

function App() {
    const {pathname} = useLocation();
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    return (
        <div className={'app-container' + (user && ' bg-light')}>
            <Alert/>
            <Navbar
            />

                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)}/>
                    <PrivateRoute exact path="/home" component={Home}/>
                    <Route exact path="/" component={HomePage}/>
                    <PrivateRoute path="/profile" component={Profile}/>
                    <PrivateRoute path="/myMovies" component={FavMovies}/>
                    <Route path="/account" component={Account}/>
                    <Redirect from="*" to="/"/>
                </Switch>

        </div>
    );
}

export {App};