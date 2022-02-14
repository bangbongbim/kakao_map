import React, { useState, useEffect, useCallback } from 'react';
import styles from './KakaoMap.module.scss'



declare global {
    interface Window {
        kakao: any
    }
}

type positionType = {
    lat: number;
    lon: number
}

function KakaoMap() {
    const [position, setPosition] = useState({ lat: 0, lon: 0 })

    function createMap(position: positionType) {

        let container = document.getElementById('map')
        let options: object = {
            center: new window.kakao.maps.LatLng(position.lat, position.lon),
            level: 3
        }
        let map = new window.kakao.maps.Map(container, options)

        // * 지도에 교통정보 추가
        map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);

    }

    function getCurrentPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                setPosition({ lat: lat, lon: lon })
            })
        }
    }

    useEffect(() => {
        // 초기 위치 설정
        getCurrentPosition();
    }, [])

    useEffect(() => {
        createMap(position)
    }, [position])


    return (
        <>
            <div id="map" className={styles['map']}>
                <button className={styles['location']} onClick={getCurrentPosition}></button>
            </div>

        </>

    )
}


export default KakaoMap;
