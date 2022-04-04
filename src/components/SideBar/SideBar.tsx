import React from 'react';
import styles from './SideBar.module.scss'
import hamburger from '../../assets/hamburger.svg'
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

type itemsProps = {
    items: itemType[]
}

function SideBar({ items }: itemsProps) {
    console.log(items)
    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                <img src={hamburger} className={styles['hamburger']} alt="Menu" />
                {/* TODO 로고 제작 후 삽입 */}
                {/* <img src={logo} className={styles['']} alt="Logo" /> */}
                <p className={styles['logo']}>쩝쩝박사</p>
                <div className={styles['search-box']}>
                    <input type="text" className={styles['search']} />
                </div>
            </div>
            <div className={styles['contents-box']}>
                {items.map((item => (
                    <div className={styles['item-box']}>
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
                        </div>
                    </div>
                )))}

            </div>
        </div >
    )
}

export default SideBar;