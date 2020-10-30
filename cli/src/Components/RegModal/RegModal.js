import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-modal';
import {registerUser} from "../../Actions/AuthActions";
import {connect} from "react-redux";


class RegModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'User',
            email: 'guestuser@mail.com',
            password: '123456'
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    onInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit(e) {
        e.preventDefault();

        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            date_created: new Date().toISOString().slice(0, 10)
        };

        this.props.registerUser(userData);
        console.log('register');
        this.props.showModal(false);
    }


    render() {

        const { name, email, password, errors } = this.state;
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

                    <form className="form-signin" onSubmit={this.handleSubmit} noValidate>

                        <div className="form-group mb-4">
                            <input
                                type="name"
                                name="name"
                                placeholder="Name"
                                onChange={this.onInputChange}
                                value={name}
                                required
                                autoFocus
                            />

                        </div>

                        <div className="form-group mb-4">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                onChange={this.onInputChange}
                                value={email}
                                required
                                autoFocus
                            />

                        </div>
                        <div className="form-group mb-4">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={this.onInputChange}
                                value={password}
                                required
                            />

                        </div>

                        <button className="btn btn-lg btn-block btn-info mb-4" type="submit">
                            Register
                        </button>

                        <button className="btn btn-block btn-primary" data-dismiss="modal"
                                onClick={() => this.props.showModal(false)}>Close
                        </button>

                    </form>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = { registerUser };

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(RegModal);
