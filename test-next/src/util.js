/**
 * next는 여러 페이지에서 공통으로 사용되는 모듈을 별도의 번들 파일로 분할한다.
 * 웹팩의 splitChunks 설정을 통해 코드를 분할하며
 * 코드 변경에 따른 캐시 무효화(cache invalidation)를 최소화하는 방향으로 설계돼 있다.
 * 우선 여러 페이지에서 공통으로 사용할 모듈을 만들어보자.
 */

export function add(a, b) {
  console.log('call add');
  return a + b;
}
