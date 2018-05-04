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
                continents: action.payload
            }
        case FETCH_COUNTRIES_DATA:
            return {
                ...state,
                countries: action.payload
            }
        case UPDATE_SELECTED_CONTINENT:
            let _continents = state.continents.map((c) => {
                c.isSelected = (c.name === action.payload)
                return c;
            });
            return {
                ...state,
                continents: _continents
            }
        case UPDATE_COUNTRIES_TO_DISPLAY_FLAGS:
            return {
                ...state,
                countries: action.payload 
            }
        default:
            return state;
    }
}