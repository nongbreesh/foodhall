
'use strict';

import type {Action} from '../actions/types';
import {SET_ADDRESS} from '../actions/address';

export type State = {
    all: string
}

const initialState = {
    all: []
};

export default function (state:State = initialState, action:Action): State { 
    if (action.type === SET_ADDRESS) {
        return {
            ...state,
            all: action.payload
        };
    }
    return state;
}
