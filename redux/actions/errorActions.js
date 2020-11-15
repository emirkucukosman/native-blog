import {
    GET_ERRORS,
    CLEAR_ERRORS
} from './types'

export const returnErrors = (message, id) => {
    return {
        type: GET_ERRORS,
        payload: { message, id }
    }
}

export const clearErrors = (message, id) => {
    return {
        type: CLEAR_ERRORS
    }
}