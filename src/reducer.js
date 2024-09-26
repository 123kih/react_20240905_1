// 파일명 : src/reducer.js

//1. src/reducers/LoginReducer.js ,
//2. src/reducers/LoginReducer2.js ,
//3. src/reducers/LoginReducer3.js ,

//합치는 역할

import {combineReducers} from "redux";
import LoginReducer from "./reducers/LoginReducer";
// 2. import LoginReducer from "./reducers/LoginReducer2";
// 3. import LoginReducer from "./reducers/LoginReducer3";

const rootReducer = combineReducers({
    LoginReducer
    //2. LoginReducer2,
    //2. LoginReducer3,
});

export default rootReducer;