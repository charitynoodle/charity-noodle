import * as types from './actionTypes';
import store from '../store'
import axios from 'axios'

export const updateSearchTerm = (searchTerm) => {
  console.log(`Called the updateSearchTerm reduced with arg: ${searchTerm}`)
  return {
    type: types.UPDATE_SEARCH_TERM,
    payload: searchTerm
  }
}

export const updateCity = (city) => {
  console.log(`Called the updateCity reduced with arg: ${city}`)
  return {
    type: types.UPDATE_CITY,
    payload: city
  }
}

export const updateStateChoice = (stateChoice) => {
  console.log(`Called the updateStateChoice reduced with arg: ${stateChoice}`)
  return {
    type: types.UPDATE_STATE_CHOICE,
    payload: stateChoice
  }
}

export const fetchingData = () => {
  return {
    type: types.FETCHING_DATA
  }
}

export const receivedData = data => {
  return {
    type: types.RECEIVED_DATA,
    payload: data
  }
}

export const receivedError = () => {
  return {
    type: types.RECEIVED_ERROR
  }
}

export const thunkGetCharities = e => {
  e.preventDefault();
  // possible unpacking of the params :)
  const storeData = store.getState().simpleReducer;

  store.dispatch(fetchingData());
  return function (dispatch, getState) {
    return axios.get('http://localhost:4000/charities', {
      params: {
        searchTerm: storeData.searchTerm,
        city: storeData.city,
        state: storeData.stateChoice
        // Unpack queryParams that will be the queryString for your GET to server:4000
      }
    }).then(data => {
      // IF ERROR, HANDLE ERROR... ELSE {...}
      console.log("RECEIVED DATA IS: ", data)
      dispatch(receivedData(data))
    }).catch(err => dispatch(receivedError()))
  }
}


// TODO: 1: Write the 3 reducers to handle the 3 most recent actionCreators that we did here... The thunk one doesn't require one itself.. + think of how to add them to state
// TODO: 2: Actually call this shit on button submission on the searchForm.js
// TODO: 3: Create the route on the server side that responds to our request to /charities + Make Api Call + Send correct data back
// TODO: 4: Parse the data and render the components?
// TODO: 5: Think about how to do the favorites on the charity objects... from a data and UI perspective ;)