import React, { useState, useEffect, useCallback } from 'react';
import styles from './KakaoMap.module.scss'
import { restaurantsInfo } from '../api/restuarants'
import { async } from '@firebase/util';
import { defaultMaxListeners } from 'events';
import Icon from '/Users/sk/kakao_map/src/assets/circle-dot-solid.svg'

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
        
            let imageSrc = Icon;

            // 마커 이미지의 이미지 크기
            let imageSize = new window.kakao.maps.Size(22, 22); 

            // 마커 이미지를 생성합니다    
            let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize,   )  
            
            // { offset: new window.kakao.maps.Point(24, 24) }// 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.);) 
            // 마커를 생성합니다
            let marker = new window.kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: data.latlng, // 마커를 표시할 위치
                title : data.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage // 마커 이미지 
            });

            // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능
            let content = `<div id="customoverlay" class=${styles['customoverlay']} >` +
                `  <a href=${data.url} target="_blank">` +
                `    <span class=${styles['title']}>${data.title}</span>` +
                '  </a>' +
                '</div>';


            // 커스텀 오버레이가 표시될 위치
            let position = new window.kakao.maps.LatLng(data.latlng);  

            // 커스텀 오버레이를 생성
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
        // 초기 위치 설정
        getCurrentPosition();
        getRestaurantsInfo();
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
