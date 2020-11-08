import React, {Component} from 'react';
import {deleteMovie} from "../../Actions/MoviesActions";
import {connect} from "react-redux";
import Modal from "react-modal";
import './ModalDesc.css';
import DeleteModal from "../DeleteMovieModal/DeleteModal";


class ModalDesc extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showModalDelete: false
        };

        this.toggleModalDelete = this.toggleModalDelete.bind(this);
        this.toggleModalDesc = this.toggleModalDesc.bind(this);
    }

    toggleModalDelete(value) {
        this.setState({
            showModalDelete: value
        });

    }

    toggleModalDesc = (value) => { this.props.showModal(value)

    };


    render() {

        const {selectedMovie} = this.props;

        return (
            <div>
            <Modal isOpen={this.props.showModal} style={{
                content: {
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    height: '585px'
                }
            }}>
                <div className={'desc'}>
                    <img width={200} height={200} src={`${selectedMovie.picture}`}/>
                    <p></p>
                    <b>Title:</b><p> {selectedMovie.title}</p>
                    <b>Year:</b><p> {selectedMovie.year}</p>
                    <b>Actors:</b><p> {selectedMovie.stars} </p>
                    <b>Format:</b> <p>{selectedMovie.format} </p>
                </div>

                <div className={'btns-modal'}>

                    <button onClick={() => this.toggleModalDelete(true)} data-dismiss="modal"
                            className="btn-modal btn  btn-danger">Delete movie from database
                    </button>
                    <button onClick={() => this.props.showModal(false)} className="btn-modal btn btn-block btn-primary"
                            data-dismiss="modal">Close
                    </button>
                </div>

                {this.state.showModalDelete ?
                    <DeleteModal
                        showModal={this.toggleModalDelete}
                        selectedMovie={this.props.selectedMovie}
                        showModalDesc={this.toggleModalDesc}
                    /> :
                    null

                }
            </Modal>

            </div>


        );
    }
}



export default ModalDesc;

