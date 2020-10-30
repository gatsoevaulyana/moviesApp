import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-modal';
import {loginUser} from "../../Actions/AuthActions";
import {connect} from "react-redux";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: 'gatsoevaulyana@mail.com',
            password: '123456'
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    onInputChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(userData);
        console.log('login')
        this.props.showModal(false)
    }


    render() {

        const {email, password, errors} = this.state;
        const {text} = this.props;
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

                    <form className="form-signin" onSubmit={(e) => this.handleSubmit(e)} noValidate>
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
                            Sign in
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

const mapDispatchToProps = (dispatch) => {

    return {

        loginUser: (userData) => {
            dispatch(loginUser(userData));
        }


    }

};

function mapStateToProps(state) {
    return {

    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Login);
