import React, { useState, useEffect, useCallback } from 'react';
import styles from './KakaoMap.module.scss'
import Icon from '../assets/circle-dot-solid.svg'


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
    id?: string,
    title: string,
    latlng: object,
    // url: string
}

type addressType = {
    id?: string,
    text?: string,
    title?: string,
    latlng?: object
}

function KakaoMap(props: any) {
    const [position, setPosition] = useState({ lat: 0, lon: 0 })
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lon: 0 })
    const [currentLevel, setCurrentLevel] = useState()

    let comment = props.comment;
    let map:any; 

    function createMap(position: positionType) {
        let container = document.getElementById('map')
        let options: object = {
            center: new window.kakao.maps.LatLng(position.lat, position.lon),
            level: 12
        }
        map = new window.kakao.maps.Map(container, options)

        // 현재 center정보 저장
        changeCenterPosition();
        
        getCommentInfo(map)
    }

    function createMapUpdateMarker() {

        let container = document.getElementById('map')
        let options: object = {
            center: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lon),
            level: currentLevel
        }
        map = new window.kakao.maps.Map(container, options)
        
        changeCenterPosition();

        getCommentInfo(map)
    }

    function changeCenterPosition() {

        // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
        window.kakao.maps.event.addListener(map, 'center_changed', function() {

            // 지도의  레벨을 얻어옵니다
            var level = map.getLevel();
            // 지도의 중심좌표를 얻어옵니다 
            var latlng = map.getCenter(); 

            setCurrentPosition({ lat:map.getCenter().getLat() , lon: map.getCenter().getLng() })
            setCurrentLevel(level)

            console.log(latlng)
        });

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

    // Comment에서 댓글 텍스트만 걸러내기
    const getCommentInfo = (map: any) => {
        let comment = props.comment
        for (let i in comment) {
            if (comment[i] !== null && comment[i] !== undefined) {
                let text = comment[i].snippet.topLevelComment.snippet.textOriginal
                let id = comment[i].snippet.videoId

                let addressIndex = text.indexOf('주소');
                let numIndex = text.indexOf('전화번호');
                if ((text.indexOf('매장번호') !== -1 && text.indexOf('매장번호') < numIndex) || numIndex === -1) numIndex = text.indexOf('매장번호');
                if ((text.indexOf('영업시간') !== -1 && text.indexOf('영업시간') < numIndex) || numIndex === -1) numIndex = text.indexOf('영업시간');
                if (addressIndex !== -1 && numIndex !== -1) {
                    text = text.substring(addressIndex + 3, numIndex)
                }

                // "주소" 를 "위치" 데이터로 변환
                let geocoder = new window.kakao.maps.services.Geocoder();

                geocoder.addressSearch(text, function (result: any, status: any) {

                    if (status === window.kakao.maps.services.Status.OK) {
                        let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)

                        let titleIndexEnd = text.lastIndexOf("\n");
                        if (text.substring(titleIndexEnd - 1, titleIndexEnd) === ')') titleIndexEnd = titleIndexEnd - 1
                        let titleIndexStart = text.lastIndexOf(" ", titleIndexEnd) + 1
                        
                        // 마지막 개행 옆에 공백문자가 있을 경우 처리 
                        if(titleIndexEnd === titleIndexStart){
                            titleIndexStart = text.lastIndexOf(" ", titleIndexEnd - 5) + 1
                        }
                                        
                        let title = text.substring(titleIndexStart, titleIndexEnd);

                        displayMarker(id, title, coords, map);

                    }
                })
            }
        }

    }

    function displayMarker(id: any, title: any, coords: any, map: any) {

        // 마커 이미지의 이미지 주소
        let imageSrc = Icon;
        // 마커 이미지의 이미지 크기
        let imageSize = new window.kakao.maps.Size(22, 22);
        // 마커 이미지를 생성합니다    
        let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize,)

        let marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
            title: title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage // 마커 이미지 
        });

        // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능
        let content = `<div id="customoverlay" class=${styles['customoverlay']} >` +
            `  <a href="#" target="_blank">` +
            `    <span class=${styles['title']}>${title}</span>` +
            '  </a>' +
            '</div>';

        // 커스텀 오버레이가 표시될 위치
        let position = new window.kakao.maps.LatLng(coords);

        // 커스텀 오버레이를 생성
        let customOverlay = new window.kakao.maps.CustomOverlay({
            map: map,
            position: coords,
            content: content,
            yAnchor: 1,
        });

    }

    useEffect(() => {
        // 초기 위치 설정
        getCurrentPosition();
    }, [])

    useEffect(() => {
        createMap(position)
    }, [position])

    useEffect(() => {
        createMapUpdateMarker();
    }, [comment])

    return (
        <>
            <div id="map" className={styles['map']}>
                <button className={styles['location']} onClick={getCurrentPosition}></button>
            </div>
        </>

    )
}



export default KakaoMap;