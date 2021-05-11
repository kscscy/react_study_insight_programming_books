import createItemsLogic from '../common/createItemsLogic';

// friends 이름으로 공통 로직 생성.
const { add, remove, edit, reducer } = createItemsLogic('friends');

// 액션 생성자 함수를 원하는 이름으로 변경해서 내보낸다.
export const addFriend = add;
export const removeFriend = remove;
export const editFriend = edit;
// 리듀서 함수를 그대로 내보낸다.
export default reducer;
