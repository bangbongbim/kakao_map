import React, { useState, useEffect, useCallback } from 'react';
import SideBar from '../components/SideBar/SideBar';
import KakaoMap from '../KakaoMap/KakaoMap';
import styles from './MainContainer.module.scss'
import { getYoutubeItems, getVideoStatistic, getVideoComments } from '../api/youtube'
import { async } from '@firebase/util';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { request } from 'https';


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
export type pageInfoType = {
    nextPageToken?: string;
}

function MainContainer() {
    const maxResults: number = 20; // !한페이지에 불러올 영상 개수 지정
    const [items, setItems] = useState<itemType[]>([])
    const [statistics, setStatistics] = useState<any[]>([])
    const [pageInfo, setPageInfo] = useState<pageInfoType>({ nextPageToken: '' })
    const [isLastElement, setIsLastElement] = useState<boolean>(false);
    const [commentInfo, setCommentInfo] = useState<any[]>([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | unknown>(null);
  
    console.log('rendered.......')

    const setYoutubeItems = async () => {
        
        try {
            const prev = items;
            const response = await getYoutubeItems(maxResults, pageInfo.nextPageToken)
            console.log(response)            
            setItems(prev => [...prev, ...response.items])
            setPageInfo({ nextPageToken: response.nextPageToken })
           
            // response.items.map( async (item:any, index:any) => {
            //     let comment = await getVideoComments(item.id.videoId)
            //     console.log(item.id.videoId)
            //     setCommentInfo(prev => [...prev, comment])
            //     console.log(comment)
            // })

            Promise.all(
                response.items.map( (item:any) =>
                    getVideoComments(item.id.videoId)
                )
              )
                .then(json => {
                    setCommentInfo(prev => [...prev, ...json.map(data => data)])
                    console.log(json)
                });

        }
        catch (e) {
            console.error(e);
        }
    }

    const setVideoStatistic = async () => {
        try {
            const response: statisticType[] = await Promise.all(
                items.map((item, index) => {
                    return getVideoStatistic(item.id.videoId)
                })
            )
            setStatistics([...response])
        }
        catch (e) {
            console.error(e)
        }
    }
    

    useEffect(() => {

        setYoutubeItems();
        setVideoStatistic()

    }, [])

    useEffect(() => {
        // 스크롤이 맨 밑에 도착했고, 다음 페이지가 존재할 때 유투브 컨텐츠를 받아옴
        if (isLastElement && pageInfo.nextPageToken) {
            setYoutubeItems();
        }
    }, [isLastElement])
   

    // if (loading) return <div>로딩중..</div>; 
    // if (error) return <div>에러가 발생했습니다</div>;

    // if (!items && !commentInfo) return null;

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