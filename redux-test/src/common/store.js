import {createStore, combineReducers} from 'redux';
import timelineReducer from '../timeline/state';
import friendReducer from '../friend/state';

const reducer = combineReducers({
  timeline: timelineReducer,
  friend: friendReducer
});

// store 객체를 원하는 곳에서 가져다 사용할 수 있도록 하기 위해 별도로 분리.
const store = createStore(reducer);
export default store;