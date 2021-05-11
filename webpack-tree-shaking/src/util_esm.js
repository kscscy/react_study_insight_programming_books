// export function func1() {
//   console.log('func1');
// }
// export function func2() {
//   console.log('func2');
// }

const arr =[];

export function func1() {
  console.log('func1', arr.length);
}

export function func2() {
  arr.push(10);
  console.log('func2');
}

 // 모듈이 evaluation될 때 func2가 실행된다.
 // 모듈은 최초로 사용될 때 한 번 평가되는데, 이때 전역 변수 arr 이 변경된다.
 // 만약 tree-shaking 단계에서 func2함수가 제거되면 func1은 의도한 대로 동작하지 않는다.
 // 웹팩은 모듈이 평가되는 시점에 호출되는 함수를 제거하지 않는다.
func2();