import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    AUTH_LOADING,
} from './types'
import { returnErrors } from './errorActions'
import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'

export const loginUser = ({ username, password }) => (dispatch) => {

    dispatch({
        type: AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, password })

    axios.post('http://localhost:5000/api/user/login', body, config)
        .then(res =>{
            if (res.data.success && res.data.token) {

                AsyncStorage.setItem("token", res.data.token)
                    .then(() => {
                        dispatch({
                            type: LOGIN_SUCCESS,
                        })
                    }) 
                    .catch(() => {
                        dispatch(
                            returnErrors("Fatal error", LOGIN_FAIL)
                        )
                        dispatch({
                            type: LOGIN_FAIL
                        })
                    })               

            } else {
                dispatch(
                    returnErrors("Fatal error", LOGIN_FAIL)
                )
                dispatch({
                    type: LOGIN_FAIL
                })
            }
        })
        .catch((err) => {
            dispatch(
                returnErrors(err.response.data.message, LOGIN_FAIL)
            )
            dispatch({
                type: LOGIN_FAIL
            })
        })

}

export const logoutUser = () => async (dispatch) => {

    await AsyncStorage.removeItem("token")

    dispatch({
        type: LOGOUT_SUCCESS
    })

}

export const validateToken = () => (dispatch) => {

    dispatch({
        type: AUTH_LOADING
    })

    AsyncStorage.getItem("token")
        .then(token => {

            if (!token)
                dispatch({ type: LOGIN_FAIL })

            const config = {
                headers: {
                    "Authorization": token
                }
            }

            axios.post("http://localhost:5000/api/token/validate", null, config)
                .then(res => {                    
                    if (res.data.success)
                        return dispatch({ type: LOGIN_SUCCESS })

                    dispatch({ type: LOGIN_FAIL })
                })
                .catch(() => {
                    dispatch({ type: LOGIN_FAIL })
                })

        })
        .catch(() => {
            dispatch({ type: LOGIN_FAIL })
        })

}