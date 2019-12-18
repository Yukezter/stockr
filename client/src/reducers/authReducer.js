import Cookies from 'js-cookie'
import axios from 'axios'

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET,
} from '../actions/types'

const initialAuthState = {
  token: Cookies.get('jwt'),
  loading: true,
  authenticated: false,
  username: null,
  email: null,
}

const authReducer = (state = initialAuthState, action) => {
  switch(action.type) {
    case USER_LOADING: 
      return {
        ...state,
        loading: true,
      }
    case USER_LOADED:
      return {
        ...state,
        ...action.payload,
        loading: false,
        authenticated: true,
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      const token = Cookies.get('jwt')
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      return {
        ...state,
        ...action.payload,
        token,
        authenticated: true,
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      Cookies.remove('jwt')
      delete axios.defaults.headers.common['Authorization']
      return {
        ...state,
        token: null,
        authenticated: false,
        username: null,
        email: null,
      }
    case RESET: 
      return {
        ...state,
        authenticated: false,
        loading: true,
      }
    default: return state
  }
}

export default authReducer