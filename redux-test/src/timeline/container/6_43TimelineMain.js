// 리덕스의 상탯값에 접근하는 컴포넌트 만들기
import React, { useEffect, useReducer } from 'react';
import store from '../../common/store';
import { getNextTimeline } from '../../common/mockData';
import { addTimeline } from '../state'; // 타임라인 데이터를 추가하기 위한 액션 생성자 함수 가져오기
import TimelineList from '../component/TimelineList';

export default function TimelineMain() {
  const [, forceUpdate] = useReducer((v) => v + 1, 0);
  useEffect(() => {
    // 액션이 처리될 때마다 화면을 다시 그리기 위해 subscribe 메서드를 사용.
    const unsubscribe = store.subscribe(() => forceUpdate());
    // 컴포넌트가 언마운트될 때 subscribe 메서드에 등록한 이벤트 처리 함수를 해제.
    return () => unsubscribe();
  }, []);
  function onAdd() {
    const timeline = getNextTimeline();
    // 타임라인 추가 버튼을 누르면 타임라인을 추가하는 액션을 발생시킨다.
    store.dispatch(addTimeline(timeline));
  }
  console.log('TimelineMain render');
  // 스토어에서 타임라인 배열을 가져온다.
  const timelines = store.getState().timeline.timelines;
  return (
    <div>
      <button onClick={onAdd}>타임라인 추가</button>
      <TimelineList timelines={timelines} />
    </div>
  );
}
