import { Paths } from '../paths/index'
import axios from "axios"


export const getYoutubeItems = async (maxResults: number, pageToken?: string) => {
    const url = `${Paths.videoListApi}&channelId=UCBMBPRnwRgl3aJZDEpTu65Q&maxResults=${maxResults}&pageToken=${pageToken}&key=${process.env.REACT_APP_YOUTUBE_API}`;
    const response = await axios.get(url);
    return response.data;
}


export const getVideoStatistic = async (videoId: string) => {
    const url = `${Paths.videoStatisticApi}&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API}`;
    const response = await axios.get(url);
    return response.data.items[0];
}