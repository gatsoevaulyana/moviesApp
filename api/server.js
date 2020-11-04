require('rootpath')();
const movies = require('./Rootes/Api/Movie');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('../api/_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.use('/accounts', require('./accounts/accounts.controller'));
app.get('/movies', movies.listBooks);
app.post('/movies', movies.addBook);
app.delete('/movies/:id', movies.deleteBook);
app.post('/samplePush', movies.addSampleBooks);

// swagger docs route
app.use('/api-docs', require('../api/_helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});

module.exports = app;