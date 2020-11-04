const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server');
const {expect} = chai;
chai.should();


// Middlewares
chai.use(chaiHttp);

describe('Tasks API', () => {


    // Test [Get all movies]
    describe('GET /books', () => {
        it('It has to return all movies', done => {
            chai.request(app)
                .get('/books')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        });

        it('It has NOT to return all movies (wrong uri)', done => {
            chai.request(app)
                .get('/book')
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });

    describe('CREATE and a film', () => {
        describe('POST /books', () => {
            const newMovieSuccess = {
                title: 'test',
                releaseYear: 2000,
                format: 'VSH',
                stars: ['star1', 'star2', 'star3'],
                picture: 'default.jpg'
            };

            const newMovieFailure = 12121 ;

            it('It has to add one more movie', done => {
                chai.request(app)
                    .get('/books')
                    .set('content-type', 'application/json')
                    .send(newMovieSuccess)
                    .end((error, response) => {
                        expect(response.status).to.equal(200);
                        done();
                    });
            });

            it('It NO has to add one more movie (invalid type of request body)', done => {
                chai.request(app)
                    .get('/books')
                    .set('content-type', 'application/json')
                    .send(newMovieFailure)
                    .end((error, response) => {
                        response.should.have.status(500);
                        done();
                    });
            });

            it('It NO has to get favourite movies', done => {
                chai.request(app)
                    .get('/accounts/myMovies')
                    .set('content-type', 'application/json')
                    .send()
                    .end((error, response) => {
                        response.should.have.status(500);
                        done();
                    });
            });


        });

    });
});




