import { GET_COMMENT, getVideoCommentsAsync } from './actions'
import { getVideoComments } from '../../api/youtube';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CommentState } from './types';

export function* getVideoCommentsSaga(action: ReturnType<typeof getVideoCommentsAsync.request>){
    try {
        const videoComment: CommentState = yield call<typeof getVideoComments>(getVideoComments, action.payload);
        yield put(getVideoCommentsAsync.success(videoComment));
    
    } catch(e:any) {
        yield put(getVideoCommentsAsync.failure(e));

    }
}

export function* commentSaga() {
    yield takeLatest(GET_COMMENT, getVideoCommentsSaga);
}