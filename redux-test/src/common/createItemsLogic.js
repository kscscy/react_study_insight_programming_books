import createReducer from './createReducer';

// 리듀서에서 공통 기능 분리하기
// 타임라인 코드와 친구 목록 코드의 중복된 코드들을 별도의 파일로 분리하기
// - 배열과 관련된 액션 타입과 액션 생성자 함수
// - 초기 상탯값을 빈 배열로 정의
// - 배열의 데이터를 추가, 삭제, 수정하는 리듀서 코드

// 배열의 고유한 이름을 파라미터로 받는다.
export default function createItemsLogic(name) {
  // 입력받은 이름을 이용해서 액션 타입을 만든다.
  const ADD = `${name}/ADD`;
  const REMOVE = `${name}/REMOVE`;
  const EDIT = `${name}/EDIT`;

  // 액션 생성자 함수를 만든다.
  const add = (item) => ({ type: ADD, item });
  const remove = (item) => ({ type: REMOVE, item });
  const edit = (item) => ({ type: EDIT, item });

  const reducer = createReducer(
    { [name]: [] }, // 초기 상탯값으로 빈 배열을 넣는다.
    {
      [ADD]: (state, action) => state[name].push(action.item),
      [REMOVE]: (state, action) => {
        const index = state[name].findIndex(
          (item) => item.id === action.item.id
        );
        // filter !== 대신 splice 사용하기
        // JS 에서 함수의 호출은 call by value 이기 때문이다.
        state[name].splice(index, 1);
      },
      [EDIT]: (state, action) => {
        const index = state[name].findIndex(
          (item) => item.id === action.item.id
        );
        if (index >= 0) {
          state[name][index] = action.item;
        }
      },
    }
  );
  // 액션 생성자 함수와 리듀서 함수를 내보낸다.
  return { add, remove, edit, reducer };
}
