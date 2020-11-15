import {
    BLOGS_LOADING,
    FETCH_BLOGS_FAIL,
    FETCH_BLOGS_SUCCESS
} from '../actions/types'

const initialState = {
    isBlogsLoading: false,
    blogs: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case BLOGS_LOADING:
            return {
                ...state,
                isBlogsLoading: true
            }
        case FETCH_BLOGS_SUCCESS:
            return {
                ...state,
                blogs: action.payload.blogs,
                isBlogsLoading: false
            }
        case FETCH_BLOGS_FAIL:
            return {
                ...state,
                isBlogsLoading: false
            }
        default:
            return state
    }
}