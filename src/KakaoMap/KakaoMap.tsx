import React, { useEffect } from 'react';
import styles from './KakaoMap.module.scss'



declare global {
    interface Window {
        kakao: any
    }
}
function KakaoMap() {
    useEffect(() => {
        let container = document.getElementById('map')
        let options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        }
        let map = new window.kakao.maps.Map(container, options)
    }, [])
    return (
        <div id="map" className={styles['map']}>

        </div>
    )
}


export default KakaoMap;
