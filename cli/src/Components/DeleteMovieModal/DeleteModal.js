import React, {Component} from "react";
import Modal from 'react-modal';
import { deleteMovie} from "../../Actions/MoviesActions";
import {connect} from "react-redux";
import './DeleteModal.css'

class DeleteModal extends Component {

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }


    onDelete() {
        this.props.deleteMovie(this.props.selectedMovie._id);
        this.props.showModal(false);
        this.props.showModalDesc(false);
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


                    <p>Are you sure to delete this movie?</p>
                        <div className={'btns-modal'}>
                            <button onClick={this.onDelete} className="btn btn-modal btn-block btn-default btn-success">Yes
                            </button>
                            <button className="btn btn-modal btn-primary" data-dismiss="modal"
                                    onClick={() => this.props.showModal(false)}>No
                            </button>
                        </div>

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
)(DeleteModal);
