import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar/SideBar';
import KakaoMap from '../KakaoMap/KakaoMap';
import styles from './MainContainer.module.scss'
import { getYoutubeItems } from '../api/youtube'


type thumbnailType = {
    height: number;
    url: string;
    width: number;
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


function MainContainer() {
    const [items, setItems] = useState<itemType[]>([])

    async function setYoutubeItems() {
        const response: itemType[] = await getYoutubeItems();
        setItems([...response])
    }

    useEffect(() => {
        setYoutubeItems()
    }, [])

    return (
        <div className={styles['container']}>
            <div className={styles['contents']}>
                <SideBar items={items} />
                <KakaoMap />
            </div>
        </div >
    )
}

export default MainContainer;
