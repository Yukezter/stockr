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
} from './types'

export const tokenConfig = (getState) => {
  const token = getState().auth.token

  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  if (token) config.headers.authorization = `Bearer ${token}`
  return config
}

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })
  axios.get('/users/get', tokenConfig(getState))
    .then(res => {
      setTimeout(() => {
        dispatch({ 
          type: USER_LOADED,
          payload: res.data
        })
      }, 3000)
    })
    .catch(err => {
      dispatch({ type: AUTH_ERROR })
      console.log(err)
    })
}

export const register = ({ username, email, password }) => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })
  axios.post('/users/signup', { username, email, password })
      .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
      .catch(err => dispatch({ type: REGISTER_FAIL }))
}

export const login = ({ usernameOrEmail, password }) => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })
  axios.post('/users/signin', { usernameOrEmail, password })
      .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
      .catch(err => dispatch({ type: LOGIN_FAIL }))
}

export const logout = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT_SUCCESS })
}

export const resetAuth = () => (dispatch) => {
  dispatch({ type: RESET })
}