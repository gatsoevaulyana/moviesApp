import React, {Component} from 'react';
import {deleteMovie} from "../../Actions/MoviesActions";
import {connect} from "react-redux";
import Modal from "react-modal";
import './ModalDesc.css';


class ModalDesc extends Component {


    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);

    }

    onDelete() {
        this.props.deleteMovie(this.props.selectedMovie._id);
        this.props.showModal(false);
    }


    render() {

        const {selectedMovie} = this.props;

        return (
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

                    <button onClick={this.onDelete} data-dismiss="modal"
                            className="btn-modal btn  btn-danger">Delete movie from database
                    </button>
                    <button onClick={() => this.props.showModal(false)} className="btn-modal btn btn-block btn-primary"
                            data-dismiss="modal">Close
                    </button>
                </div>
            </Modal>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        deleteMovie: (id) => {
            dispatch(deleteMovie(id))
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
)(ModalDesc);

