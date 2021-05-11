// 1.동적 import 를 사용하는 코드
// function myFunc(){
//   // import 함수를 사용하면 동적으로 모듈을 가져올 수 있다.
//   // import 함수는 Promise 객체를 반환하기 때문에 then 메서드로 연결할 수 있다.
//   import('./util').then(({add}) =>
//     import('lodash').then(({default: _ }) =>
//       console.log('value', _.fill([1,2,3],add(10,20))),
//     ),
//   );
// }

// 2. 두 모듈을 동시에 가져오는 코드
// async function myFunc() {
//   const [{add}, {default: _}] = await Promise.all([
//     import('./util'),
//     import('lodash'),
//   ]);
//   console.log('value', _.fill([1,2,3], add(30,20)));
// }


// 3. preload, prefetch 설정하기
async function myFunc() {
  // 너무 빠르게 처리하면 prefetch 효과를 확인할 수 없으므로 1초 기다린다.
  await new Promise(res => setTimeout(res, 1000));
  
  const [{ add }, { default: _ }] = await Promise.all([
    import(/* webpackPreload: true */ './util'), // util 은 preload 
    import(/* webpackPrefetch: true */ 'lodash'), // loadsh 는 prefetch
  ]);
  console.log('value', _.fill([1, 2, 3], add(30, 20)));
}


myFunc();