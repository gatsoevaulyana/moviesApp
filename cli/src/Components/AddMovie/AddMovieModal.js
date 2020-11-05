import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-modal';
import {addMovie} from "../../Actions/MoviesActions";
import {connect} from "react-redux";
import './AddMovieModal.css'
import {accountService} from "../../Services/account.service";
import {alertService} from "../../Services/alert.service";

class AddMovieModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            year: '',
            format: '',
            stars: '',
            picture: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        this.setState(
            {[e.target.name]: e.target.value}
        );

    }

    handleSubmit(e) {
        e.preventDefault();

        try {
            this.props.addMovie(this.state);
        } catch (err) {
           alert(err);
        }


        this.props.showModal(false)
    }

    onFileInput(e) {
        this.props.onFileInput(e);
        this.props.showModal(false);
    }


    render() {


        return (
            <div>
                <Modal isOpen={this.props.showModal} style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        height: '550px'
                    }
                }}>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="example-text-input" className="col-2 col-form-label">Title</label>
                            <div className="col-10">
                                <input onChange={this.handleChange} title={'Некорректное название'} required
                                       pattern={"[A-Za-z А-Яа-я,:]+"}
                                       className="form-control" name='title'
                                       placeholder='Movie title' type="text" id="example-text-input"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="example-text-input" className="col-2 col-form-label">Year</label>
                            <div className="col-10">
                                <input onChange={this.handleChange}
                                       title={'Допустимы только цифры в четырезначном виде (например 2020)'} required
                                       pattern={"[0-9]{4}"}
                                       className="form-control" name='year'
                                       placeholder='Release year' type="text" id="example-text-input"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="example-text-input" className="col-2 col-form-label">Format</label>
                            <div className="col-10">
                                <select onChange={this.handleChange} on name='format' required className="form-control"
                                        placeholder='Format' id="example-text-input">
                                    <option > </option>
                                    <option  value={'VSH'}>VHS</option>
                                    <option value={'DVD'}>DVD</option>
                                    <option value={'Blu-Ray'}>Blu-Ray</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="example-text-input" className="col-2 col-form-label">Actors</label>
                            <div className="col-10">
                                <input onChange={this.handleChange} required pattern={"[A-Za-z ,]+"} name='stars'
                                       className="form-control"
                                       placeholder='Actors, with comma(e.g. Adam Smith, Bob Marley)' type="text"
                                       id="example-text-input"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="example-text-input" className="col-2 col-form-label">Picture</label>
                            <div className="col-10">
                                <input onChange={this.handleChange}
                                       title={'Допустим только формат ссылки на изображение'} name='picture'
                                       className="form-control" placeholder='Poster image url' type="text"
                                       id="example-text-input"/>
                            </div>
                        </div>
                        <div className={'upload-file common-row '}>
                            <p><br/>Or you can upload file with movies <br/></p>

                            <input className={'btn btn-secondary '} type="file" name={" "}
                                   accept=".txt"
                                   onChange={(e) => this.onFileInput(e)}
                            />

                        </div>
                        <div className={'btns-modal'}>
                            <button type='submit' className="btn btn-modal btn-block btn-default btn-success">Add
                                Movie
                            </button>
                            <button className="btn btn-modal btn-primary" data-dismiss="modal"
                                    onClick={() => this.props.showModal(false)}>Close
                            </button>
                        </div>
                    </form>
                    <br/>
                    <br/>
                    <br/>

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
