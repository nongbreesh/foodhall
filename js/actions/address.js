
'use strict';

import type {Action} from './types';

export const SET_ADDRESS = "SET_ADDRESS";

export function setAddress(address:string):Action { 
    return {
        type: SET_ADDRESS,
        payload: address
    }
}
