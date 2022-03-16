import React, { useState, useEffect, useCallback } from 'react';
import styles from './KakaoMap.module.scss'
import { restaurantsInfo } from '../api/restuarants'
import { async } from '@firebase/util';

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
    const [markerData, setMarkerData] = useState([{title:'', latlng:''}])

    function createMap(position: positionType) {

        let container = document.getElementById('map')
        let options: object = {
            center: new window.kakao.maps.LatLng(position.lat, position.lon),
            level: 3
        }
        let map = new window.kakao.maps.Map(container, options)

        // * 지도에 교통정보 추가
        // map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);
    
        // restaurant 마커 정보 추가
        let positions = markerData;
        // let positions = [
        //     {
        //         title: '카카오', 
        //         latlng: new window.kakao.maps.LatLng(33.450705, 126.570677)
        //     },
        //     {
        //         title: '생태연못', 
        //         latlng: new window.kakao.maps.LatLng(33.450936, 126.569477)
        //     },
        // ];  
        
        
        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
            
        for (var i = 0; i < positions.length; i ++) {
            
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new window.kakao.maps.Size(24, 35); 
            
            // 마커 이미지를 생성합니다    
            var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); 
            
            // 마커를 생성합니다
            var marker = new window.kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage // 마커 이미지 
            });
        }


        // const markerPosition = new window.kakao.maps.LatLng(position.lat, position.lon);

        // var marker = new window.kakao.maps.Marker({
        //     position: markerPosition
        // });

        // 마커가 지도 위에 표시되도록 설정합니다
        // marker.setMap(map);

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
    const getRestaurantsInfo = async () => {
        console.log(await restaurantsInfo());
        (await restaurantsInfo()).map(a => {
            a.map((t:any) => {
                console.log(t)
                const data = {
                    title:t.name,
                    latlng:new window.kakao.maps.LatLng(t.location._lat, t.location._long)                    
                }

                setMarkerData(markerData => [...markerData, data]);
                console.log(markerData)
                
            })  
        });


    }


    useEffect(() => {
        getRestaurantsInfo();
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
