import React, {Component} from "react";
import './MovieListItem.css';
import {connect} from "react-redux";

export default class MovieListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            year: '',
            format: '',
            stars: '',
            image: ''
        };

    }


    render() {

        const {book} = this.props;

        return (
            <div className="col-md-4 mb-4">
                <div className="book">
                    <div className="book-list-item">

                        <div className="book-details">

                            Book
                        </div>

                    </div>
                </div>
            </div>

        )
    }
};
