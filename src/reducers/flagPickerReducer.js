import * as ActionTypes from '../actions/types';

const initialState = {
    continents: [],
    countries: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_CONTINENTS_DATA:
            return {
                ...state,
                continents: action.payload || state.continents
            }
        case ActionTypes.FETCH_COUNTRIES_DATA:
            return {
                ...state,
                countries: action.payload || state.countries
            }
        case ActionTypes.UPDATE_CONTINENT_SELECTED: {
            let _continents = state.continents;
            _continents.map((c2) => (c2.isSelected = (c2.name === action.payload)));

            return {
                ...state,
                continents: _continents || state.continents
            }
        }
        case ActionTypes.UPDATE_CONTINENT_UNSELECTED: {
            let _continents = state.continents;
            _continents.map((c2) => (c2.isSelected = (c2.name === action.payload ? false : c2.isSelected)));

            return {
                ...state,
                continents: _continents || state.continents,
                countries: []
            }
        }
        case ActionTypes.UPDATE_COUNTRIES_TO_DISPLAY_FLAGS:
            return {
                ...state,
                countries: action.payload || state.countries
            }
        default:
            return state;
    }
}