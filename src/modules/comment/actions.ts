import {deprecated, createReducer, ActionType, createAsyncAction} from 'typesafe-actions'
import { put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { CommentState } from './types';
const { createAction, createStandardAction } = deprecated;


export const GET_COMMENT = 'COMMENT/GET_COMMENT';
export const GET_COMMENT_SUCCESS = 'COMMENT/GET_COMMENT_SUCCESS';
export const GET_COMMENT_ERROR = 'COMMENT/GET_COMMENT_ERROR';

export const getVideoCommentsAsync = createAsyncAction(
  GET_COMMENT,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_ERROR
)<string, CommentState , AxiosError>();
