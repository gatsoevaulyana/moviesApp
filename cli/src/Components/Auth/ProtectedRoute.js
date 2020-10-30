import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Test from '../Test/Test';

function ProtectedRoute({ component: Component, user, ...rest }){
    return (
        <Route
            {...rest}
            render={props =>
                user.isAuthenticated ? (
                    <div>
                    <Component {...props} />
                    </div>
                ) : (

                        <Test/>

                )
            }
        />
    );
}

export default ProtectedRoute;