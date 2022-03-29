import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar/SideBar';
import KakaoMap from '../KakaoMap/KakaoMap';
import styles from './MainContainer.module.scss'
import { getYoutubeItems, getVideoStatistic } from '../api/youtube'
import { async } from '@firebase/util';


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

type itemType = {
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

    const setYoutubeItems = async () => {
        //TODO 유투브영상, 페이지 토큰 분리
        try {
            const prev = items;
            const response = await getYoutubeItems(maxResults, pageInfo.nextPageToken);
            console.log(response)
            setItems([...prev, ...response.items])
            setPageInfo({ nextPageToken: response.nextPageToken })
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
        setYoutubeItems()
        setVideoStatistic()
    }, [])


    useEffect(() => {
        // 스크롤이 맨 밑에 도착했고, 다음 페이지가 존재할 때 유투브 컨텐츠를 받아옴
        if (isLastElement && pageInfo.nextPageToken) {
            setYoutubeItems();
        }
    }, [isLastElement])



    return (
        <div className={styles['container']}>
            <div className={styles['contents']}>
                <SideBar items={items} statistics={statistics} isLastElement={isLastElement} setIsLastElement={setIsLastElement} />
                <KakaoMap />
            </div>
        </div >
    )
}

export default MainContainer;
