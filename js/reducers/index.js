<<<<<<< HEAD
<<<<<<< HEAD

'use strict';

import { combineReducers } from 'redux';

import drawer from './drawer';
import route from './route';
import user from './user';
import list from './list';
import address from './address';

export default combineReducers({

 	drawer,
 	route,
    user,
    list,
    address

})
=======
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import drawer from "./drawer";
import user from "./user";
import list from "./list";

export default combineReducers({
=======
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import drawer from "./drawer";
import user from "./user";
import list from "./list";

export default combineReducers({
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
  form: formReducer,
  drawer,
  user,
  list
});
<<<<<<< HEAD
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
=======
>>>>>>> 7e5102f5df78ce39ff2d6e5bb1eabcf3dea9ac20
