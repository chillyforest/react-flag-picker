import SourceData from '../asset/continents.json';
import { createContinentsList, createCountriesList } from './Util';
import {
    FETCH_CONTINENTS_DATA,
    FETCH_COUNTRIES_DATA,
    UPDATE_SELECTED_CONTINENT,
    UPDATE_COUNTRIES_TO_DISPLAY_FLAGS
} from './types';

export const fetchContinents = () => dispatch => dispatch({
    type: FETCH_CONTINENTS_DATA,
    payload: createContinentsList(SourceData)
});

export const fetchCountries = (selectedContinent) => dispatch => dispatch({
    type: FETCH_COUNTRIES_DATA,
    payload: createCountriesList(SourceData, selectedContinent)
});

export const UpdateSelectedContinent = (continent) => dispatch => dispatch({
    type: UPDATE_SELECTED_CONTINENT,
    payload: continent || ""
});

export const UpdateCountriesToDisplayFlags = (countriesData) => dispatch => dispatch({
    type: UPDATE_COUNTRIES_TO_DISPLAY_FLAGS,
    payload: countriesData
});