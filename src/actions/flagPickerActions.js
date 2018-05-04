import SourceData from '../asset/continents.json';
import {
    FETCH_CONTINENTS_DATA,
    FETCH_COUNTRIES_DATA,
    UPDATE_SELECTED_CONTINENT,
    UPDATE_COUNTRIES_TO_DISPLAY_FLAGS
} from './types';

export const fetchContinents = () => dispatch => {
    let continents = SourceData.map(c => {
        return { "name": c.continent, "isSelected": false }
    });

    return dispatch({
        type: FETCH_CONTINENTS_DATA,
        payload: continents
    });
};

export const fetchCountries = (selectedContinent) => dispatch => {
    let countries = [];

    SourceData.filter(x => x.continent === selectedContinent)
        .map(data => {
            return data.countries
                .map((c) => {
                    c["isSelected"] = false;
                    return countries.push(c);
                })
        });

    return dispatch({
        type: FETCH_COUNTRIES_DATA,
        payload: countries
    });
};

export const UpdateSelectedContinent = (selectedContinent) => dispatch => {
    return dispatch({
        type: UPDATE_SELECTED_CONTINENT,
        payload: (selectedContinent) ? selectedContinent : ""
    });
};

export const UpdateCountriesToDisplayFlags = (countriesData) => dispatch => {
    return dispatch({
        type: UPDATE_COUNTRIES_TO_DISPLAY_FLAGS,
        payload: countriesData
    });
};