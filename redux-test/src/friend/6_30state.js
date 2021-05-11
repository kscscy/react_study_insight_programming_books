import createReducer from '../common/createReducer';

// 액션 타입을 상수 변수로 정의
const ADD = 'friend/ADD';
const REMOVE = 'friend/REMOVE';
const EDIT = 'friend/EDIT';

// 액션 생성자 함수를 정의.
// 이 함수는 외부에서 사용해야 하므로 export 키워드를 사용해 외부 공개
export const addFriend = (friend) => ({ type: ADD, friend });
export const removeFriend = (friend) => ({ type: REMOVE, friend });
export const editFriend = (friend) => ({ type: EDIT, friend });

const INITIAL_STATE = { friends: [] };

// C,D,U  리듀서 코드
// 리듀서는 스토어를 생성할 때 필요하기 때문에 외부로 공개한다.
// createReducer 함수에서 immer 를 사용했으므로 리듀서 함수에서 간편하게 상탯값을 수정할 수 있다.
const reducer = createReducer(INITIAL_STATE, {
  [ADD]: (state, action) => state.friends.push(action.friend),
  [REMOVE]: (state, action) =>
    (state.friends = state.friends.filter(
      (friend) => friend.id !== action.friend.id
    )),
  [EDIT]: (state, action) => {
    const index = state.friends.findIndex(
      (friend) => friend.id === action.friend.id
    );
    if (index >= 0) {
      state.friends[index] = action.friend;
    }
  },
});

export default reducer;
