import { render } from '@testing-library/react'
import React from 'react'
import './SearchBox.css'
import {connect} from 'react-redux'
import {searchField, requestCountries} from '../actions'

//function SearchBox ({functionSent}) {

const mapStatesToProps = states => {
    return{
        searchedValue: state.searchedText.searchedValue,
        countriesDataFetched: state.gettingDataReducer.countriesArrayRedux
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSearchFunction: event => dispatch(searchField(event.target.value))
    }
}

class SearchBox extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
    
                <input placeholder="" onChange={this.props.onSearchFunction} />
    
            </div>
        );
    }
    
}

export default connect(mapStatesToProps, mapDispatchToProps)(SearchBox);