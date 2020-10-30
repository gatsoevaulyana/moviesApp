import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-modal';
import {addMovie} from "../../Actions/MoviesActions";
import {connect} from "react-redux";

class AddMovieModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            year: '',
            format: '',
            stars: '',
            image: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleChange(e) {
        this.setState(
            {[e.target.name]: e.target.value}
        );
        console.log(this.state);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addMovie(this.state);
        this.props.showModal(false)
    }


    render() {


        return (
            <div>
                <Modal isOpen={this.props.showModal} style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        height: '400px'
                    }
                }}>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="example-text-input" className="col-2 col-form-label">Title</label>
                            <div className="col-10">
                                <input onChange={this.handleChange} required  pattern={"[A-Za-z ]+"} className="form-control" name='title'
                                       placeholder='Movie title' type="text" id="example-text-input"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="example-text-input" className="col-2 col-form-label">Year</label>
                            <div className="col-10">
                                <input onChange={this.handleChange} required pattern={"[0-9]{4}"} className="form-control" name='year'
                                       placeholder='Release year' type="text" id="example-text-input"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="example-text-input" className="col-2 col-form-label">Format</label>
                            <div className="col-10">
                                <input onChange={this.handleChange} name='format' required className="form-control"
                                       placeholder='Format' type="text" id="example-text-input"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="example-text-input" className="col-2 col-form-label">Actors</label>
                            <div className="col-10">
                                <input onChange={this.handleChange} required pattern={"[A-Za-z ,]+"} name='stars' className="form-control"
                                       placeholder='Actors, with comma(e.g. Adam Smith, Bob Marley)' type="text"
                                       id="example-text-input"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="example-text-input" className="col-2 col-form-label">Image</label>
                            <div className="col-10">
                                <input onChange={this.handleChange} name='image' defaultValue={'Default poster image'}
                                       className="form-control" placeholder='Poster image url' type="text"
                                       id="example-text-input"/>
                            </div>
                        </div>
                        <button className="btn btn-block btn-primary" data-dismiss="modal"
                                onClick={() => this.props.showModal(false)}>Close
                        </button>
                        <button type='submit' className="btn btn-block btn-default btn-success">Add Movie</button>
                    </form>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        addMovie: (newMovie) => {
            dispatch(addMovie(newMovie));
        }


    }
};

function mapStateToProps(state) {
    return {
        movies: state.movies,
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(AddMovieModal);
