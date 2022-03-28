import React, { useState, useEffect } from 'react';
import styles from './AdminContainer.module.scss'
import { getYoutubeItems, getVideoStatistic } from '../api/youtube'


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


function AdminContainer() {
    const maxResults: number = 8; // !한페이지에 불러올 영상 개수 지정
    const [items, setItems] = useState<itemType[]>([])

    const setYoutubeItems = async () => {
        try {
            const response: itemType[] = await getYoutubeItems(maxResults);
            console.log(response)
            setItems([...response])
        }
        catch (e) {
            console.error(e);
        }
    }


    useEffect(() => {
        setYoutubeItems()
    }, [])

    useEffect(() => {
    }, [items])

    return <div className={styles['container']}>
        <div className={styles['contents']}>
            {items.map((item) => (
                <p>
                    {JSON.stringify(item)}
                </p>
            ))}
        </div>
        <button>이전 결과</button>
        <button>다음 결과</button>
    </div>
}

export default AdminContainer;