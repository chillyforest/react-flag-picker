import { expect, assert } from 'chai';
import * as actions from '../../src/actions/flagPickerActions';
import * as types from '../../src/actions/types';
import * as constants from '../test-data';

// describe("Redux Action", () => {
//     describe("fetchContinents", () => {
//         it('fetch continents fetches FETCH_CONTINENTS_DATA action', () => {
//             assert.equal(actions.fetchContinents(), {
//                 type: types.FETCH_CONTINENTS_DATA,
//                 payload: constants.TEST_CONTINENTS
//             });
//         });

//         it('fetch continents fetches FETCH_CONTINENTS_DATA action is not null', () => {
//             assert.notStrictEqual(actions.fetchContinents(), null);
//         });
//     });
// });