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
} from './types'
import API from '../api'

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })
  API.getUser()
    .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch(err => dispatch({ type: AUTH_ERROR }))
}

export const register = (body) => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })
  API.register(body)
      .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
      .catch(err => dispatch({ type: REGISTER_FAIL }))
}

export const login = (body) => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })
  API.login(body)
      .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
      .catch(err => dispatch({ type: LOGIN_FAIL }))
}

export const logout = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT_SUCCESS })
}

export const resetAuth = () => (dispatch) => {
  dispatch({ type: RESET })
}