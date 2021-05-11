import produce from 'immer';

// 액션 객체 타입. 데이터가 있는 경우와 없는 경우를 각각 정의하기 위해 두 개의 타입을 정의한다.
interface TypedAction<T extends string> {
  type: T;
}

interface TypedPayloadAction<T extends string, P> extends TypedAction<T> {
  payload: P;
}

export function createAction<T extends string>(type: T): TypedAction<T>;
export function createAction<T extends string, P>(
  type: T,
  payload: P
): TypedPayloadAction<T, P>;
