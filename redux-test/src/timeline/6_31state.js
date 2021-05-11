import createReducer from '../common/createReducer';

const ADD = 'timeline/ADD';
const REMOVE = 'timeline/REMOVE';
const EDIT = 'timeline/EDIT';
// timeline 끝에 도달했을 때 서버에게 요청할 페이지 번호를 관리하는 액션 타입
const INCREASE_NEXT_PAGE = 'timeline/INCREASE_NEXT_PAGE';

export const addTimeline = (timeline) => ({ type: ADD, timeline });
export const removeTimeline = (timeline) => ({ type: REMOVE, timeline });
export const editTimeline = (timeline) => ({ type: EDIT, timeline });
// 페이지 번호를 증가시키는 액션 생성자 함수
export const increaseNextPage = () => ({ type: INCREASE_NEXT_PAGE });

// 타임라인의 상탯값에는 다음 페이지 번호도 저장
const INITIAL_STATE = { timelines: [], nextPage: 0 };
const reducer = createReducer(INITIAL_STATE, {
  [ADD]: (state, action) => state.timelines.push(action.timeline),
  [REMOVE]: (state, action) => 
    (state.timelines = state.timelines.filter(
      timeline => timeline.id !== action.timeline.id
    )),
  [EDIT]: (state, action) => {
    const index = state.timelines.findIndex(
      timeline => timeline.id === action.timeline.id
    );
    if (index >= 0) {
      state.timelines[index] = action.timeline;
    }
  },
  // 페이지 번호를 증가시키는 리듀서 코드
  [INCREASE_NEXT_PAGE]: (state, action) => (state.nextPage += 1),
});

export default reducer;
