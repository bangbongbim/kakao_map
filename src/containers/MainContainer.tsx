import React, { useState, useEffect, useCallback } from 'react';
import SideBar from '../components/SideBar/SideBar';
import KakaoMap from '../KakaoMap/KakaoMap';
import styles from './MainContainer.module.scss'
import { getYoutubeItems, getVideoStatistic, getVideoComments } from '../api/youtube'
import { async } from '@firebase/util';
import Map from '../KakaoMap/Map';
import item, { getYoutubeItemsAsync } from '../modules/item';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { useStateRef } from '../hooks/useStateRef';
import axios from 'axios';


type thumbnailType = {
    height: number;
    url: string;
    width: number;
}

type statisticType = {
    etag: string;
    id: string;
    kind: string;
    statistics: {
        commentCount: string;
        favoriteCount: string;
        likeCount: string;
        viewCount: string
    }
}

export type itemType = {
    etag: string;
    id: {
        kind: string;
        videoId: string;
    }
    kind: string;
    snippet: {
        channelId: string;
        channelTitle: string;
        description: string;
        publishTime: string;
        publishedAt: string;
        title: string;
        thumbnails: {
            default: thumbnailType;
            high: thumbnailType;
            medium: thumbnailType
        }
    }
}
type pageInfoType = {
    nextPageToken?: string;
}

function MainContainer() {
    const maxResults: number = 20; // !한페이지에 불러올 영상 개수 지정
    const [items, setItems] = useState<itemType[]>([])
    const [statistics, setStatistics] = useState<any[]>([])
    const [pageInfo, setPageInfo] = useState({ nextPageToken: '' })
    const [isLastElement, setIsLastElement] = useState<boolean>(false);
    const [commentInfo, setCommentInfo] = useState<any[]>([])
    const [test, setTest] = useState<any[]>([])

    
    // const item = useSelector((state: RootState) => state.item.itemData.data);
    // const dispatch = useDispatch();
    // const setYoutubeItems = () => {
    //     dispatch(getYoutubeItemsAsync.request(maxResults));
    // }

    const setYoutubeItems = async () => {
        
        try {
            const prev = items;
            const response = await getYoutubeItems(maxResults, pageInfo.nextPageToken)
                            
            setItems(prev => [...prev, ...response.items])
            setPageInfo({ nextPageToken: response.nextPageToken })
            
            response.items.map( async (item:any, index:any) => {
                let comment = await getVideoComments(item.id.videoId)
                console.log(item.id.videoId)
                setCommentInfo(prev => [...prev, comment])
            })
           
            // const response = await Promise.all(
            //     items.map((item:any, index:any) => {
            //         return getVideoComments(item.id.videoId)
            //     })
            // )

        }
        catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        setYoutubeItems();
        console.log(items.length);
    }, [])

    useEffect(() => {
        // 스크롤이 맨 밑에 도착했고, 다음 페이지가 존재할 때 유투브 컨텐츠를 받아옴
        if (isLastElement && pageInfo.nextPageToken) {
            setYoutubeItems();
        }
    }, [isLastElement, commentInfo])
   
    // const setVideoComments = async () => {
    //     if(commentInfo.length === 0){
    //         const response = await Promise.all(
    //             items.map((item:any, index:any) => {
    //                 return getVideoComments(item.id.videoId)
    //             })
    //         )
    //         console.log(response)
    //         setCommentInfo([...response]);
    //     } 
    // }

    // const testJson = async () => {
    //     const url = `https://jsonplaceholder.typicode.com/todos`;
    //     const response = await axios.get(url);
    //     return response.data;
    // }
    // const testCommentJson = async (id:string) => {
    //     const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
    //     const response = await axios.get(url);
    //     return response.data;
    // }

    // const setYoutubeItems = useCallback(
    //     async () => {
    //         const response = await testJson()
    //         // setItems(prev => [...prev, ...response])
    //         response.map((item:any, index:any) => {
    //             testCommentJson(item.id)
    //         }) 
    //         setCommentInfo(prev => [...prev, ...response])

    //     }, 
    // []);

    // const setVideoComments = useCallback(
    //     async () => {
    //         console.log('items' , items);
    //         const response = await Promise.all(
    //             items.map((item:any, index) => {
    //                 console.log('setVideoComments', item)
    //                 testCommentJson(item.id)
    //             })
    //         )
    //         // const response = await testCommentJson("1")
    //         setCommentInfo(prev => [...prev, ...response])
    //     }, 
    // []);

    
    return (
        <div className={styles['container']}>
            <div className={styles['contents']}>
                <SideBar items={items} statistics={statistics} isLastElement={isLastElement} setIsLastElement={setIsLastElement} />
                <KakaoMap items={items} comment={commentInfo}  />
                {/* <Map items={items} comment={commentInfo} /> */}
            </div>
        </div >
    )
}

export default React.memo(MainContainer)