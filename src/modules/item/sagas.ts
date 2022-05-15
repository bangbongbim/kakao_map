import { GET_ITEM, getYoutubeItemsAsync } from './actions'
import { getYoutubeItems } from '../../api/youtube';
import { call, put, takeLatest } from 'redux-saga/effects';
// import { itemType } from '../../containers/MainContainer';
import { ItemState } from './types';
import { getVideoCommentsSaga, GET_COMMENT } from '../comment';

function* getYoutubeItemsSaga(action: ReturnType<typeof getYoutubeItemsAsync.request>){
    try {
        const youtubeItem: ItemState = yield call<typeof getYoutubeItems>(getYoutubeItems, action.payload.maxResults, action.payload.pageInfo?.nextPageToken);        
        yield put(getYoutubeItemsAsync.success(youtubeItem));
    
    } catch(e:any) {
        yield put(getYoutubeItemsAsync.failure(e));

    }
}

export function* itemSaga() {
    yield takeLatest(GET_ITEM, getYoutubeItemsSaga);
}