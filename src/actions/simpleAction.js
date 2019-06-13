import * as types from './actionTypes';
import store from '../store'
import axios from 'axios'

export const updateSearchTerm = (searchTerm) => {
  console.log(`Called the updateSearchTerm actionCreator with arg: ${searchTerm}`)
  return {
    type: types.UPDATE_SEARCH_TERM,
    payload: searchTerm
  }
}

export const updateCity = (city) => {
  console.log(`Called the updateCity actionCreator with arg: ${city}`)
  return {
    type: types.UPDATE_CITY,
    payload: city
  }
}

export const updateStateChoice = (stateChoice) => {
  console.log(`Called the updateStateChoice actionCreator with arg: ${stateChoice}`)
  return {
    type: types.UPDATE_STATE_CHOICE,
    payload: stateChoice
  }
}

export const fetchingData = () => {
  console.log(`Called the fetchingData`)

  return {
    type: types.FETCHING_DATA
  }
}

export const receivedData = data => {
  console.log(`Called the receivedData actionCreator with arg: ${data}`)

  return {
    type: types.RECEIVED_DATA,
    payload: data
  }
}

export const receivedError = () => {
  console.log(`Called the receivedError actionCreator`);
  return {
    type: types.RECEIVED_ERROR
  }
}

export const thunkGetCharities = e => {
  console.log("Called the thunkGetCharities action")
  e.preventDefault();
  const storeData = store.getState().simpleReducer;
  store.dispatch(fetchingData());
  axiosGetRequest(storeData)

}

async function axiosGetRequest(storeData) {
  await axios.get('http://localhost:4000/charities', {
    params: {
      searchTerm: storeData.searchTerm,
      city: storeData.city,
      state: storeData.stateChoice
      // Unpack queryParams that will be the queryString for your GET to server:4000
    }
  }).then(data => {
    console.log("RECEIVED DATA IS: ", data)
    console.log("Actual data is : ", data.data.data);
    store.dispatch(receivedData(data.data.data))
  }).catch(err =>  store.dispatch(receivedError()))
}


// SIGNUP ACTION CREATORS


export const signupUpdateFirstName = (firstName) => {
  return {
    type: types.SIGNUP_UPDATE_FIRSTNAME,
    payload: firstName
  }
}

export const signupUpdateLastName = (lastName) => {
  return {
    type: types.SIGNUP_UPDATE_LASTNAME,
    payload: lastName
  }
}

export const signupUpdateEmailAddr = (emailAddr) => {
  return {
    type: types.SIGNUP_UPDATE_EMAILADDR,
    payload: emailAddr
  }
}

export const signupUpdateUserName = (userName) => {
  return {
    type: types.SIGNUP_UPDATE_USERNAME,
    payload: userName
  }
}

export const signupUpdatePassword = (password) => {
  return {
    type: types.SIGNUP_UPDATE_PASSWORD,
    payload: password
  }
}

export const receivedSignupData = data => {
  return {
    type: types.RECEIVED_SIGNUP_DATA,
    payload: data
  }
}

export const receivedSignupError = () => {
  return {
    type: types.RECEIVED_SIGNUP_ERROR
  }

}


// SIGNUP THUNK
export const sendSignupInfo = e => {
  e.preventDefault()
  const signupData = store.getState().simpleReducer.signup
  const postData = {
    firstName: signupData.firstName,
    lastName: signupData.lastName,
    email: signupData.emailAddr,
    username: signupData.userName,
    password: signupData.password
  }
  console.log("ABOUT TO SEND: ", postData);
  axios.post('http://localhost:4000/signup', postData)
  .then(data => store.dispatch(receivedSignupData(data)))
  .catch(err => store.dispatch(receivedSignupError()))
}



// export const thunkGetCharities = e => {
//   console.log("Called the thunkGetCharities action")
//   e.preventDefault();
//   const storeData = store.getState().simpleReducer;
//   store.dispatch(fetchingData());
//   axiosGetRequest(storeData)

// }


// TODO: 1: Write the 3 reducers to handle the 3 most recent actionCreators that we did here... The thunk one doesn't require one itself.. + think of how to add them to state
// TODO: 2: Actually call this shit on button submission on the searchForm.js
// TODO: 3: Create the route on the server side that responds to our request to /charities + Make Api Call + Send correct data back
// TODO: 4: Parse the data and render the components?
// TODO: 5: Think about how to do the favorites on the charity objects... from a data and UI perspective ;)