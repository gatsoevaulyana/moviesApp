import React, {Component} from "react";
import {connect} from "react-redux";
import sortMoviesSelector from "../../Selectors/Movies";

class Test extends Component {

    constructor() {
        super();

    }

    render() {

        const {isAuthenticated, text} = this.props;

        return (
            <div>

                <p>isAuth: {isAuthenticated.toString()}</p>
                <p>{text}</p>
            </div>
        )

    }


}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        text: state.movies.text
    }
};

export default connect(
    mapStateToProps, null
)(Test);