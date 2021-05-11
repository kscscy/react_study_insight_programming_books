module.exports = function({ types: t}) {
  return {
    visitor: {
      // AST(Abstract Sytanx Tree)에서 ExpressionStatement 노드가 생성되면 호출되도록 메서드를 등록한다.
      ExpressionStatement(path) {
        // ExpressionStatement 노드의 expression 속성이 CallExpression 노드인지 검사한다.
        if (t.isCallExpression(path.node.expression)) {
          // callee 속성이 MemberExpression 노드인지 검사한다.
          if (t.isMemberExpression(path.node.expression.callee)) {
            const memberExp = path.node.expression.callee;
            // console 객체의 log 메서드가 호출된 것인지 검사한다.
            if (
              memberExp.object.name === 'console' &&
              memberExp.property.name === 'log'
            ) {
              path.remove();
            }
          }
        }
      }
    }
  }
}