import React from 'react';
import { ReduxState } from '../../common/store';
import { actions } from '../state/action';
import { useSelector, useDispatch } from 'react-redux';

interface Props {
  birthday: string;
}

export default function Person({ birthday }: Props) {
  // 첫 번째 제네릭 타입은 리덕스 상태값을 의미한다.
  const name = useSelector<ReduxState, string>((state) => state.person.name);
  const age = useSelector<ReduxState, number>((state) => state.person.age);
  const dispatch = useDispatch();
  function onClick() {
    dispatch(actions.setName('kim'));
    dispatch(actions.setAge(23));
  }
  return(
    <div>
      <p>{name}</p>
      <p>{age}</p>
      <p>{birthday}</p>
      <button onClick={onClick}>정보 추가하기</button>
    </div>
  );
}
