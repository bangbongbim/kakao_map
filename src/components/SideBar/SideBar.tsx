import React, { useEffect, Dispatch, SetStateAction } from 'react';
import styles from './SideBar.module.scss'
import { useInView } from 'react-intersection-observer'
// import logo from '../../assets/logo.png'


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



type itemsProps = {
    items: itemType[];
    statistics: statisticType[]
    isLastElement: boolean;
    setIsLastElement: Dispatch<SetStateAction<boolean>>
}

function SideBar(props: itemsProps) {
    const { items, isLastElement, setIsLastElement } = props
    const [ref, inView] = useInView()


    useEffect(() => {
        console.log(inView)
        if (inView)
            setIsLastElement(true);
        else
            setIsLastElement(false)

    }, [inView, isLastElement])

    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                {/* TODO 로고 제작 후 삽입 */}
                {/* <img src={logo} className={styles['']} alt="Logo" /> */}
                <p className={styles['logo']}>쩝쩝박사</p>
                <div className={styles['search-box']}>
                    <input type="text" className={styles['search']} />
                </div>
            </div>
            <div className={styles['contents-box']}>
                {
                    items.map(((item, index) => (
                        <div className={styles['item-box']} key={item.id.videoId} ref={ref}>
                            <div className={styles['thumbnail-box']}>
                                <img
                                    src={item.snippet.thumbnails.default.url}
                                    width={item.snippet.thumbnails.default.width}
                                    height={item.snippet.thumbnails.default.height}
                                    alt="thumbnail" />
                            </div>
                            <div className={styles['description-box']}>
                                <p className={styles['title']}>
                                    {item.snippet.title.replaceAll("&quot;", '"')}
                                </p>
                                <p>
                                </p>
                            </div>
                        </div>
                    )))
                }

            </div>
        </div >
    )
}

export default SideBar;