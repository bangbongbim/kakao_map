import React, { useState, useEffect, useCallback } from 'react';
import styles from './KakaoMap.module.scss'
// import './KakaoMap.css'
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

type markerType = {
    title: string,
    latlng: object,
    url: string
}

function KakaoMap() {
    const [position, setPosition] = useState({ lat: 0, lon: 0 })
    const [markerData, setMarkerData] = useState<markerType[]>([])

    function createMap(position: positionType) {

        let container = document.getElementById('map')
        let options: object = {
            center: new window.kakao.maps.LatLng(position.lat, position.lon),
            level: 12
        }
        let map = new window.kakao.maps.Map(container, options)
       
        setMarker(map);

    }
    function setMarker(map:object){

         // restaurant 마커 정보 추가
         let positions = markerData;
         positions.map(data => {
              // 마커 이미지의 이미지 주소
            let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
            // 마커 이미지의 이미지 크기 입니다
            let imageSize = new window.kakao.maps.Size(24, 35); 
                        
            // 마커 이미지를 생성합니다    
            let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); 
            
            // 마커를 생성합니다
            let marker = new window.kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: data.latlng, // 마커를 표시할 위치
                title : data.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage // 마커 이미지 
            });

            // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            let content = `<div id="customoverlay" class=${styles['customoverlay']} >` +
                `  <a href=${data.url} target="_blank">` +
                `    <span class=${styles['title']}>${data.title}</span>` +
                '  </a>' +
                '</div>';


            // 커스텀 오버레이가 표시될 위치입니다 
            let position = new window.kakao.maps.LatLng(data.latlng);  

            // 커스텀 오버레이를 생성합니다
            let customOverlay = new window.kakao.maps.CustomOverlay({
                map: map,
                position: data.latlng,
                content: content,
                yAnchor: 1,
            });

         })
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
<<<<<<< HEAD
    
=======
>>>>>>> 3925a5ae7cfcdcb1b0afb433dba3ffe409a0c8c3
    // ! 식당 예시 데이터 받아오는 함수
    const getRestaurantsInfo = async () => {
        // console.log(await restaurantsInfo());
        (await restaurantsInfo()).map(list => {
            list.map((marker:any) => {

                const data = {
                    title:marker.name,
                    latlng:new window.kakao.maps.LatLng(marker.location._lat, marker.location._long),
                    url:marker.url               
                }

                setMarkerData(markerData => [...markerData, data]);
            })  
        });
        console.log(markerData)
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
