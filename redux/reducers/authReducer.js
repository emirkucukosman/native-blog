import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    AUTH_LOADING,
} from '../actions/types'

const initialState = {
    isAuthLoading: false,
    isLoginSuccess: false,
    isLogoutSuccess: true,
    token: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOADING:
            return {
                ...state,
                isAuthLoading: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthLoading: false,
                isLoginSuccess: true,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthLoading: false,
                isLoginSuccess: false,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoginSuccess: false,
                isLogoutSuccess: true,
                token: null
            }
        default:
            return state
    }
}