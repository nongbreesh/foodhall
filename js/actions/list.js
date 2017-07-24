
import type { Action } from './types';

export const SET_INDEX = "SET_INDEX";
export const SET_SHOPDETAIL = "SET_SHOPDETAIL";
export const SET_ฺBASKET = "SET_ฺBASKET";
export const SET_LASTESTSENDOTP = "SET_LASTESTSENDOTP";
export const SET_LIST = "SET_LIST";
export const SET_INDEX = 'SET_INDEX';

export function setIndex(index:number):Action {
  return {
    type: SET_INDEX,
    payload: index,
  };
}

export function setList(all:number):Action {
    return {
        type: SET_LIST,
        payload: all
    }
}

export function setShopdetail(detail:string):Action {
    return {
        type: SET_SHOPDETAIL,
        payload: detail
    }
}

export function setLastestsendOtp(time:string):Action {
    return {
        type: SET_LASTESTSENDOTP,
        payload: time
    }
}


export function setBasket(all:string):Action {
    return {
        type: SET_ฺBASKET,
        payload: all
    }
}
