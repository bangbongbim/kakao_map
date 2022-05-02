import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { itemType } from '../../containers/MainContainer';


export type ItemAction = ActionType<typeof actions>;

export type ItemState = {
    itemData:{
        loading: boolean;
        data: itemType | null;
        error: Error | null;
    }
};