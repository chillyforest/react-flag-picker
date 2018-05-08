import { expect, assert } from 'chai';
import reducer from '../../src/reducers/flagPickerReducer';
import * as types from '../../src/actions/types';
import * as TestData from '../test-data';

describe('Flag Picker Reducer', () => {
    it('Returns the Inital State', () => {
        let expected = TestData.STATE_WITH_INITIAL_VALUES;
        let actual = reducer(undefined, {});

        assert.deepEqual(actual, expected);
    });

    it('Returns the State with Updated Continents for FETCH_CONTINENTS_DATA Action', () => {
        let expected = {
            ...TestData.STATE_WITH_INITIAL_VALUES,
            continents: TestData.CONTINENTS_TEST_DATA
        }
        let actual = reducer(TestData.STATE_WITH_INITIAL_VALUES, {
            type: types.FETCH_CONTINENTS_DATA,
            payload: TestData.CONTINENTS_TEST_DATA
        });

        assert.deepEqual(actual, expected);
    });

    it('Returns the State with Updated Countries for FETCH_COUNTRIES_DATA Action', () => {
        let expected = {
            ...TestData.STATE_WITH_INITIAL_VALUES,
            countries: TestData.COUNTRIES_TEST_DATA
        }
        let actual = reducer(TestData.STATE_WITH_INITIAL_VALUES, {
            type: types.FETCH_COUNTRIES_DATA,
            payload: TestData.COUNTRIES_TEST_DATA
        });

        assert.deepEqual(actual, expected);
    });

    it('Returns the State with Updated Seleclted Continent.isSelected = true for UPDATE_SELECTED_CONTINENT Action', () => {
        let selectedContinent = "Europe";
        let expected = TestData.STATE_WITH_FILLED_CONTINENTS_WITH_EUROPE_SELECTED;

        let actual = reducer(TestData.STATE_WITH_FILLED_CONTINENTS, {
            type: types.UPDATE_SELECTED_CONTINENT,
            payload: selectedContinent
        });

        assert.deepEqual(actual, expected);
    });
});