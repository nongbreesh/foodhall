
import type { Action } from '../actions/types';
import { SET_USER } from '../actions/user';

export type State = { 
    all:string,
}

<<<<<<< HEAD
<<<<<<< HEAD
const initialState = { 
    all:[],
};

export default function (state:State = initialState, action:Action): State {
    if (action.type === SET_USER) {
        return {
            ...state,
            all: action.payload
        };
    }
    return state;
=======
const initialState = {
  name: '',
};

export default function (state:State = initialState, action:Action): State {
=======
const initialState = {
  name: '',
};

export default function (state:State = initialState, action:Action): State {
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
  if (action.type === SET_USER) {
    return {
      ...state,
      name: action.payload,
    };
  }
  return state;
<<<<<<< HEAD
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
=======
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
}
