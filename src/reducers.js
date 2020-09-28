

export const searchedText = (state = initialDataState, action = {}) => {

    return Object.assign({}, state, { searchedTextState: action.payload})
}

const initialDataState = {
    searchedTextState : "",
    countriesArrayRedux : [],
    isPending: true
}

export const gettingDataReducer = (state = initialDataState, action = {}) => {
    
    switch (action.type) {
        case 'PENDING':
          return Object.assign({}, state, {isPending: true})
        case 'SUCCESS':
            console.log(action.payload)
          return Object.assign({}, state, {countriesArrayRedux: action.payload, isPending: false})
        case 'FAILED':
          return Object.assign({}, state, {error: action.payload})
        case 'UPDATE_COUNTRIES':
            return Object.assign({}, state, {countriesArrayRedux: action.payload})
        case 'SEARCHFIELD_CHANGED':
            return Object.assign({}, state, { searchedTextState: action.payload})
        default:
          return state
      }
}



export const updateCountryArray = (state = initialDataState, action = {}) => {

    if (action.type == 'HI'){
        return Object.assign({}, state, {countriesArrayRedux: action.payload})
    }else {
        return state
    }

}



