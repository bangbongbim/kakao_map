import { Paths } from '../paths/index'
import axios from "axios"
import { async } from '@firebase/util';

export const getYoutubeItems = async () => {
    try {
        const url = `${Paths.videoListApi}&channelId=UCBMBPRnwRgl3aJZDEpTu65Q&maxResults=8&key=${process.env.REACT_APP_YOUTUBE_API}`;
        const response = await axios.get(url);
        return response.data.items;
    }
    catch (error) {
        console.error(error);
    }
}


export const getVideoStatistic = async (videoId: string) => {
    const url = `${Paths.videoStatisticApi}&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API}`;
    const response = await axios.get(url);
    console.log(response.data)
    return response.data
}