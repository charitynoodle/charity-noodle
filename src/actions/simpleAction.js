import * as types from './actionTypes';

export const updateSearchTerm = (searchTerm) => (
  {
    type: types.UPDATE_SEARCH_TERM,
    payload: searchTerm
  }
)

export const updateCity = (city) => (
  {
    type: types.UPDATE_CITY,
    payload: city
  }
)

export const updateState = (state) => (
  {
    type: types.UPDATE_STATE,
    payload: state
  }
)