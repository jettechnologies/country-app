export const intialState = {
    countries: [],
    loading: "pending",
    countrySearch: "",
    countryRegion: "",
    theme: false,
}

const countryReducer = (state, action) =>{
    const type = action.type, 
          payload = action.payload;

    switch(type){
        case "ADD_COUNTRIES":
            return {...state, countries: payload}
        
        case "UPDATE_THEME": 
            return {...state, theme: payload}

        case "UPDATE_SEARCH":
            return {...state, countrySearch: payload}
        
        case "UPDATE_REGION":
            return {...state, countryRegion: payload}

        case "UPDATE_LOADING":
            return {...state, loading: payload}
        
        default:
            throw new Error(`No case for type ${type} found in shopReducer.`);
    }
}

export default countryReducer;