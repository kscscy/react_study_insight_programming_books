import produce from 'immer';

// 첫 번째 인자로 초기 상탯값
// 두 번째 인자는 액션 처리 함수를 담고있는 객체(핸들러)

export default function createReducer(initialState, handlerMap) {
  return function(state = initialState, action) {
    return produce(state, draft => {
      const handler = handlerMap[action.type];
      if (handler) {
        handler(draft, action);
      }
    });
  }
}
