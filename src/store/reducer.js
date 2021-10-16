import { combineReducers } from "redux-immutable";
import {reducer as indexReducer} from '../views/index/store'
import {reducer as publicReducer} from './public-store'
const cReducer = combineReducers({
  index:indexReducer,
  public:publicReducer
});

export default cReducer;