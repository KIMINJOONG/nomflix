import React, {Component } from "react";
import CollectionsPresenter from "./CollectionsPresenter";
import { moviesApi } from "../../api";

class CollectionsContainer extends Component {
    state = {
        result: null
        , loading: false
        , error: null
    };

    getCollections = () => {
        
    }
    async componentDidMount() {
        const { 
            match: {
                params: {id}
            },
            history: {push},
            
        } = this.props;
        const parsedId = parseInt(id);
        if(isNaN(parsedId)) {
            return push("/");
        }
        let result, error;

        try{
            ({
               data:  result 
            } = await moviesApi.collections(parsedId));
        }catch{
            error = "Can't find collections";
        }finally{
            this.setState({
                result,
                loading: false,
                error
            })
        }
    }
    render() {
        console.log(this.state);
        return(
            <CollectionsPresenter />
        );
    };
};

export default CollectionsContainer;