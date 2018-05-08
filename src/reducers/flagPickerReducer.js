import * as Types from '../actions/types';

const initialState = {
    continents: [],
    countries: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case Types.FETCH_CONTINENTS_DATA:
            return {
                ...state,
                continents: action.payload || state.continents
            }
        case Types.FETCH_COUNTRIES_DATA:
            return {
                ...state,
                countries: action.payload || state.countries
            }
        case Types.UPDATE_SELECTED_CONTINENT:
            let _continents = state.continents;
            _continents.map((c2) => (c2.isSelected = (c2.name === action.payload)));

            return {
                ...state,
                continents: _continents || state.continents
            }
        case Types.UPDATE_COUNTRIES_TO_DISPLAY_FLAGS:
            return {
                ...state,
                countries: action.payload || state.countries
            }
        default:
            return state;
    }
}