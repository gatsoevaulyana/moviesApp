import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./Reducers";
import thunk from 'redux-thunk';
import {App} from "./Components/App/AppTest";
import ErrorBoundry from "./Components/ErrorBoundry/ErrorBoundry";

import { Router } from 'react-router-dom';
import { render } from 'react-dom';

import { history } from './Utils/history';
import { accountService } from './Services/account.service';

import './styles.css';


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

accountService.refreshToken().finally(() => {
    ReactDOM.render(

        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>,

        document.getElementById('root')
    );
});


