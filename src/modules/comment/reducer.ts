import { createReducer } from '@reduxjs/toolkit';
import {CommentState, CommentAction} from './types'
import {GET_COMMENT, GET_COMMENT_SUCCESS, GET_COMMENT_ERROR,} from './actions'

const initialState: CommentState = {
    commentData : {
        loading: false,
        error: null,
        data: null
    }
}

const comment = createReducer( initialState, {
    [GET_COMMENT]: (state:any) => ({ 
        ...state, 
        commentData: {loading:true, error:null, data:null}
     }),
    [GET_COMMENT_SUCCESS]: (state:any, action:any) => ({
        ...state,
        commentData: {loading:false, error:null, data:action.payload}
    }),
    [GET_COMMENT_ERROR]: (state:any, action:any) => ({
         ...state,
         commentData: {loading:false, error:action.payload, data: null}
    }),
});

export default comment;