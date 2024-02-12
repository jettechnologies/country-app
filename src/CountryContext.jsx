/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useReducer, useEffect, useMemo} from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import countryReducer, {intialState} from "./countryReducer";
import { useLocalStorage } from "./useLocalStorage";

const CountryContext = createContext();

export const CountryProvider = ({children}) =>{
    const [state, dispatch] = useReducer(countryReducer, intialState);
    const { setItem } = useLocalStorage("countries");

    const fetchData = async() =>{
        const response = await axios.get("../data.json");
        return response.data;
    }

    // i had to create an async function that would resolve the promise and set the data
    const fetchDataAndDispatch = useCallback(async () => {
        const result = await fetchData();
        const updatedResult = result.map(data => {
            data.id = nanoid();
            return data;
        });
        return updatedResult;

    }, []);

useEffect(() => {
    const dispatchResult = async () => {
        let localStorageData = window.localStorage.getItem("countries");
        localStorageData = JSON.parse(localStorageData);

        if (!localStorageData){
            const result = await fetchDataAndDispatch();
            const resultObj = {theme: state.theme , countries: result}

            setItem(resultObj);
        } 
        else{
            setItem(localStorageData);
        }
        
    };

    dispatchResult();
}, [fetchDataAndDispatch, setItem, state.theme]);


useEffect(() =>{
    let localStorageData = window.localStorage.getItem("countries");
        localStorageData = JSON.parse(localStorageData);    
    
    let dataDelay;

    if(localStorageData){
        const {theme, countries} = localStorageData;

        dispatch({
            type: "UPDATE_THEME",
            payload: theme,
        });

        // if statement for setting the countries object
        if(countries.length > 0){

            dataDelay = setTimeout(() => {
                dispatch({
                    type: "ADD_COUNTRIES",
                    payload: countries,
                });
                dispatch({
                    type: "UPDATE_LOADING",
                    payload: "success",
                });
            }, 1500);
        }
        else{
            dispatch({
                type: "UPDATE_LOADING",
                payload: "pending",
            });
        }
    }
    
     return () => clearTimeout(dataDelay)    
},[]);

    // updating the theme for the project
const updateTheme = useCallback(() =>{
    const theme = !state.theme;

    dispatch({
        type: "UPDATE_THEME",
        payload: theme
    });

    const updatedState = {
        theme: theme,
        countries: state.countries
    }

    setItem(updatedState);
}, [state.theme, setItem, state.countries]);

// updating the theme for the project
const updateLoading = useCallback((loadState) =>{
    const loading = loadState;

    dispatch({
        type: "UPDATE_LOADING",
        payload: loading
    });
}, []);

      // updating the search value  for the project
      const updateSearch = useCallback((value) =>{
        
        dispatch({
            type: "UPDATE_SEARCH",
            payload: value
        });
        
    }, []);

    const updateRegionSearch = useCallback((value) =>{

        dispatch({
            type: "UPDATE_REGION",
            payload: value
        });
        
    }, []);

    const filteredCountry = useMemo(() =>{
        const countries = state.countries,
              search = state.countrySearch,
              region = state.countryRegion;

        const filterCountry = countries.filter(country => {
            const nameMatch = search && country.name.toLowerCase().includes(search.toLowerCase());
            const regionMatch = region && country.region.toLowerCase() === region.toLowerCase();
            return nameMatch || regionMatch;
        });
        
        
        const result = filterCountry.length > 0 ? filterCountry : countries;

        return result;

    }, [state.countries, state.countrySearch, state.countryRegion]);

    const showBorderCountries = useCallback((borderCode) => {
        if (!borderCode || typeof borderCode !== 'string') {
            return undefined;
        }
        
        const filteredBorderCountries = state.countries.filter(country =>
            country.alpha3Code.includes(borderCode.toUpperCase())
        );
    
        return filteredBorderCountries.length > 0 ? filteredBorderCountries : undefined;
    }, [state.countries]);

    const showCountryById = useCallback((id) => {
        const countries = state.countries;

        const filteredCountry = countries.find(country => country.id === id);
        return filteredCountry;
    }, [state.countries]);

    const value = {
        countries: filteredCountry,
        theme: state.theme,
        loading: state.loading,
        search: state.countrySearch,
        regionSearch: state.countryRegion,
        fetchDataAndDispatch,
        updateLoading,
        updateTheme,
        updateSearch,
        updateRegionSearch,
        showCountryById,
        showBorderCountries,
    }

    return(
        <CountryContext.Provider value = {value}>
            {children}
        </CountryContext.Provider>
    );

}

// use context custom hook
const useCountry = () => {
    const context = useContext(CountryContext);
  
    if (context === undefined) {
      throw new Error("useTodo must be used within TodoContext");
    }
    
        return context;
    };
  
  export default useCountry;