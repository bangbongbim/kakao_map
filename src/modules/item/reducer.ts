import { createReducer } from '@reduxjs/toolkit';
import {ItemState, ItemAction} from './types'
import {GET_ITEM, GET_ITEM_SUCCESS, GET_ITEM_ERROR} from './actions'

const initialState: ItemState = {
    itemData : {
        loading: false,
        error: null,
        data: null
    }
}

const item = createReducer( initialState, {
    [GET_ITEM]: (state:any) => ({ 
        ...state, 
        itemData: {loading:true, error:null, data:null}
     }),
    [GET_ITEM_SUCCESS]: (state:any, action:any) => ({
        ...state,
        itemData: {loading:false, error:null, data:action.payload}
    }),
    [GET_ITEM_ERROR]: (state:any, action:any) => ({
         ...state,
         itemData: {loading:false, error:action.payload, data: null}
    }),
});

export default item;