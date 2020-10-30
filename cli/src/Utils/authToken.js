import axios from 'axios';

const authToken = token => {
    if (token) {
        // apply to every request
        axios.defaults.headers.common['auth-token'] = token;
    } else {
        // delete auth header
        delete axios.defaults.headers.common['auth-token'];
    }
};

export default authToken;
