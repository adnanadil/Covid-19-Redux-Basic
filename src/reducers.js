const initialSearchState = {
    searchedTextState : ""
}

export const searchedText = (state = initialSearchState, action = {}) => {

    console.log(action.payload)
    return Object.assign({}, state, { searchedTextState: action.payload})
}

const initialSearchState2 = {
    searchedTextState2 : ""
}

export const searchedText2 = (state = initialSearchState, action) => {
    console.log(`This is from 2: ${action.payload}`)
    return Object.assign({}, state, { initialSearchState2: action.payload})
}


