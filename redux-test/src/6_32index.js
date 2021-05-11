// combineReducers 함수를 이용하여 여러 개의 리듀서를 하나로 합치기
import { createStore, combineReducers } from 'redux';

// 타임라인, 친구목록 모듈에서 액션 생성자와 리듀서 함수를 가져온다.
import timelineReducer, {
  addTimeline,
  removeTimeline,
  editTimeline,
  increaseNextPage
} from './timeline/state';
import friendReducer, {
  addFriend,
  removeFriend,
  editFriend
} from './friend/state';

// combineReducers 함수를 이용해서 두 개의 리듀서를 하나로 합친다.
// 상탯값에는 각각 timeline,
const reducer = combineReducers({
  timeline: timelineReducer,
  friend: friendReducer,
});

// 스토어 생성
const store = createStore(reducer);

// 디버깅을 위해 액션 처리가 끝날 때마다 상탯값을 로그로 출력
store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

store.dispatch(addTimeline({ id: 1, desc: '코딩은 즐거워' }));
store.dispatch(addTimeline({ id: 2, desc: '리덕스 좋아' }));
store.dispatch(increaseNextPage());
store.dispatch(editTimeline({ id: 2, desc: '리덕스 넘모 좋아' }));
store.dispatch(removeTimeline({ id: 1, desc: '코딩은 즐거워' }));

store.dispatch(addFriend({ id: 1, name: 'name1' }));
store.dispatch(addFriend({ id: 2, name: 'name2' }));
store.dispatch(editFriend({ id: 2, name: 'name2-2' }));
store.dispatch(removeFriend({ id: 1, name: 'name1' }));
