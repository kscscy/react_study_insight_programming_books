// import {func1} from './util_commonjs';
// func1();


// 동적 import 를 사용하는 코드 => tree shaking 실패
// import('./util_esm').then(util => util.func1());


import {func1} from './util_esm';
func1();
