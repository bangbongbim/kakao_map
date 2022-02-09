import React, { useEffect } from 'react';
import SideBar from '../components/SideBar/SideBar';
import KakaoMap from '../KakaoMap/KakaoMap';
import styles from './MainContainer.module.scss'

function MainContainer() {
    return (
        <div className={styles['container']}>
            <div className={styles['contents']}>
                <SideBar />
                <KakaoMap />
            </div>
        </div >
    )
}

export default MainContainer;
