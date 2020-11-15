import {
    BLOGS_LOADING,
    FETCH_BLOGS_FAIL,
    FETCH_BLOGS_SUCCESS
} from './types'
import axios from 'axios'

import { returnErrors } from './errorActions'

export const fetchBlogs = () => (dispatch) => {

    dispatch({
        type: BLOGS_LOADING
    })

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.get("http://localhost:5000/api/blog/fetch", null, config)
        .then(res => {
            if (res.data.success) {
                dispatch({
                    type: FETCH_BLOGS_SUCCESS,
                    payload: res.data
                })
            } else {
                dispatch(
                    returnErrors("Fatal error", FETCH_BLOGS_FAIL)
                )
                dispatch({
                    type: FETCH_BLOGS_FAIL
                })
            }
        })
        .catch(err => {
            dispatch(
                returnErrors(err.response.data.message, FETCH_BLOGS_FAIL)
            )
            dispatch({
                type: FETCH_BLOGS_FAIL
            })
        })

}