
export const searchField = (text) => {
    return{
        type: 'SEARCHFIELD_CHANGED',
        payload: text
    }
};

export const requestCountries = () => (dispatch) => {

    dispatch({type:'PENDING'})
    fetch('https://api.covid19api.com/summary')
    .then(resp => resp.json())
    //.then(data =>dispatch({ type: 'SUCCESS', payload: data }))
    .then(data => {
        for (let [key, value] of Object.entries(data)) {
         
         if (key === "Countries"){
          //console.log(`This is ${key}: ${value}`)
          dispatch({type:'SUCCESS',payload: value})
         }
        }
      })

    .catch(error => dispatch({ type: 'FAILED', payload: error }))

}

export const updateTheList = (arrayOfRefinedCountries) => {
    return{
        type: 'UPDATE_COUNTRIES',
        payload: arrayOfRefinedCountries
    }
}