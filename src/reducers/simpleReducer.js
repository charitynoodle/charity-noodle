const defaultState = {
  searchTerm: '',
  city: '',
  stateChoice: 'AL',
  loading: false,
  error: false,
  signupError: false,
  data: [],
  currentUser: '',
  currentUserID: '',
  login: {
    userName: '',
    password: ''
  },
  signup: {
    firstName: '',
    lastName: '',
    emailAddr: '',
    userName: '',
    password: ''
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_TERM':
      return {
        // Do Something
        ...state,
        searchTerm: action.payload
      }
    case 'UPDATE_CITY':
      return {
        ...state,
        city: action.payload
      }
    case 'UPDATE_STATE_CHOICE':
      return {
        ...state,
        stateChoice: action.payload
      }
    case 'FETCHING_DATA':
      return {
        ...state,
        loading: true,
        error: false
      }
    case 'RECEIVED_DATA':
      console.log("RECEIVED_DATA REDUCER CASE FIRING WsITH: ", action.payload);
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      }
    case 'RECEIVED_ERROR':
      return {
        ...state,
        loading: false,
        error: true
      }
    case 'SIGNUP_UPDATE_FIRSTNAME':
      return {
        ...state,
        signup: {
          ...state.signup,
          firstName: action.payload
        }
      }
    case 'SIGNUP_UPDATE_LASTNAME':
      return {
        ...state,
        signup: {
          ...state.signup,
          lastName: action.payload
        }
      }
    case 'SIGNUP_UPDATE_EMAILADDR':
      return {
        ...state,
        signup: {
          ...state.signup,
          emailAddr: action.payload
        }
      }
    case 'SIGNUP_UPDATE_USERNAME':
      return {
        signup: {
          ...state.signup,
          userName: action.payload
        }
      }
    case 'SIGNUP_UPDATE_PASSWORD':
      return {
        signup: {
          ...state.signup,
          password: action.payload
        }
      }
    case 'RECEIVED_SIGNUP_DATA':
      return {
        ...state, 
        currentUser: action.payload.currentUser,
        currentUserID: action.payload.currentUserID,
        signupError: false
      }
    case 'RECEIVED_SIGNUP_ERROR':
      return {
        ...state,
        signupError: action.payload
      }
  
      
    default:
      return state

  }
}