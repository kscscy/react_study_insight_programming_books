const element = <div>test babel config</div>;
const text = `element type is ${element.type}`;
const add = (a, b) => a + b;

// minify 가 적용된 결과
// const element=/*#__PURE__*/React.createElement("div",null,"test babel config"),text="element type is ".concat(element.type),add=function(c,a){return c+a};