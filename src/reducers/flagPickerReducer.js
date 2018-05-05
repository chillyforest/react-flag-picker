import {
    FETCH_CONTINENTS_DATA,
    FETCH_COUNTRIES_DATA,
    UPDATE_SELECTED_CONTINENT,
    UPDATE_COUNTRIES_TO_DISPLAY_FLAGS
} from '../actions/types';

const initialState = {
    continents: [],
    countries: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CONTINENTS_DATA:
            return {
                ...state,
                continents: action.payload || state.continents
            }
        case FETCH_COUNTRIES_DATA:
            return {
                ...state,
                countries: action.payload || state.countries
            }
        case UPDATE_SELECTED_CONTINENT:
            let _continents = state.continents;
            _continents.filter(c1 => (c1.name === action.payload)).map((c2) => c2.isSelected = true);

            return {
                ...state,
                continents: _continents || state.continents
            }
        case UPDATE_COUNTRIES_TO_DISPLAY_FLAGS:
            return {
                ...state,
                countries: action.payload || state.countries
            }
        default:
            return state;
    }
}