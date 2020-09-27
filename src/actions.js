
export const searchField = (text) => {
    return{
        type: 'SEARCHFIELD_CHANGED',
        payload: text
    }
};