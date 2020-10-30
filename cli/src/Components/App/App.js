import React, {Component} from "react";
import {Route, Switch} from 'react-router-dom';
import HomePage from "../Pages/HomePage";
import {BrowserRouter} from "react-router-dom";
import Link from "react-router-dom/Link";
import Profile from "../Profile/Profile";
import Spinner from "../Spinner/Spinner";
import Header from "../Header/Header";
import ProtectedRoute from "../Auth/ProtectedRoute";
import * as actions from '../../Actions';
import {connect} from "react-redux";
import {Account} from "../../Account";

class App extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const { user} = this.props;
        return (
            <BrowserRouter>
                <div>

                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <ProtectedRoute path="/profile" user={user} component={Profile}
                                        />
                        <ProtectedRoute path="/myMovies" user={user} component={Spinner}
                                        />
                        <ProtectedRoute path="/account" user={user} component={Account}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );

    };
}

const mapStateToProps = state => ({ user: state.user });



export default connect(
    mapStateToProps,
    actions
)(App);
