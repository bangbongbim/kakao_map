import * as actions from './actions';
import { ActionType } from 'typesafe-actions';


export type CommentAction = ActionType<typeof actions>;

export type CommentState = {
    commentData:{
        loading: boolean;
        data: any;
        error: Error | null;
    }  
};