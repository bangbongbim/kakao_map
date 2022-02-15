import React, { useState, useEffect, useCallback } from 'react';
import styles from './KakaoMap.module.scss'
// import { restaurantsInfo } from '../api/restuarants'



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

        const markerPosition = new window.kakao.maps.LatLng(position.lat, position.lon);

        var marker = new window.kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

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

    // ! 식당 예시 데이터 받아오는 함수
    // const getRestaurantsInfo = async () => {
    //     console.log(await restaurantsInfo());
    // }


    useEffect(() => {
        // 초기 위치 설정
        getCurrentPosition();
        // getRestaurantsInfo();
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
