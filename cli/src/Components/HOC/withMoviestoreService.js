import React from "react";
import {BookstoreServiceConsumer} from "../MoviestoreServiceContext/MoviestoreServiceContext";

const withMoviestoreService = () => (Wrapped) => {
    return (props) => {
        return (

            <BookstoreServiceConsumer>
                {

                    (bookstoreService) => {
                        return (<Wrapped {...props} bookstoreService = {bookstoreService}/>);
                    }

                }

            </BookstoreServiceConsumer>

        );
    }
};

export default withMoviestoreService;