import {deprecated, createReducer, ActionType, createAsyncAction} from 'typesafe-actions'
import { put, takeLatest } from 'redux-saga/effects';
import {ItemState} from './types'
import { AxiosError } from 'axios';
import { pageInfoType } from '../../containers/MainContainer';
const { createAction, createStandardAction } = deprecated;

export const GET_ITEM = 'item/GET_ITEM';
export const GET_ITEM_SUCCESS = 'item/GET_ITEM_SUCCESS';
export const GET_ITEM_ERROR = 'item/GET_ITEM_ERROR';

export const getYoutubeItemsAsync = createAsyncAction(
  GET_ITEM,
  GET_ITEM_SUCCESS,
  GET_ITEM_ERROR
)<{maxResults:number, pageInfo?:pageInfoType}, ItemState , AxiosError>();

// const LOADING_COMMENT = 'comment/LOADING';
// const SUCCESS_COMMENT = 'comment/SUCCESS';
// const ERROR_COMMENT = 'comment/ERROR';


// export const loading = createStandardAction(LOADING)();
// export const success = createAction(SUCCESS)();
// export const error = createStandardAction(ERROR)();


// export const loading_comment = createStandardAction(LOADING_COMMENT)();
// export const success_comment = createStandardAction(SUCCESS_COMMENT)<Array<String>>();
// export const error_comment = createStandardAction(ERROR_COMMENT)();

// export const successAsync_comment = createStandardAction(SUCCESS_COMMENT_ASYNC)();

// const actions = {loading, success, error, successAsync};

// function* successSaga(){
//     yield put(success());
// }
// // function* successCommentSaga(){
// //     yield put(success());
// // }

// export function* getDataSaga() {
//     yield takeLatest(SUCCESS_ASYNC, successSaga);
//     // yield takeLatest(SUCCESS_COMMENT_ASYNC, successCommentSaga);
// }


// export function item(state = initialState, action:any){
//     switch (action.type){
//         case LOADING:
//             return {
//                 ...state,
//                 loading: !state.loading
//             }
//         case SUCCESS:
//             return {
//                 ...state,
//                 data: state.data.concat(action.data)
//             }    
//         case ERROR:
//             return {
//                 ...state,
//                 error: true
//             }
//         default:
//             return state;
//     }
// }


// export function comment(state = initialState, action:any){
//     switch (action.type){
//         case LOADING_COMMENT:
//             return {
//                 ...state,
//                 loading: !state.loading
//             }
//         case SUCCESS_COMMENT:
//             return {
//                 ...state,
//                 data: state.data.concat(action.data)
//             }    
//         case ERROR_COMMENT:
//             return {
//                 ...state,
//                 error: true
//             }
//         default:
//             return state;
//     }
// }

