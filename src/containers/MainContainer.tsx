import React, { useEffect } from 'react';
import Nav from '../components/common/SideBar';
import styles from './MainContainer.module.scss'

declare global {
    interface Window {
        kakao: any
    }
}

function MainContainer() {
    useEffect(() => {
        let container = document.getElementById('map')
        let options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        }
        let map = new window.kakao.maps.Map(container, options)
    }, [])
    return (
        <div className={styles['container']}>
            <div className={styles['contents']}>
                <Nav />
                <div id="map" className={styles['map']}>

                </div>
            </div>
        </div >
    )
}

export default MainContainer;
