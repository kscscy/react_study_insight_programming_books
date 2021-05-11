// 로더는 모듈의 내용을 문자열로 입력받는 함수다.
module.exports = function (source) {
  // 모듈을 사용하는 쪽에서 받게 될 데이터
  const result = { header: undefined, rows: [] };
  
  // 문자열로 입력된 CSV 모듈의 내용을 파싱해서 result 객체에 저장한다.
  const rows = source.split('\n');
  for (const row of rows) {
    const cols = row.split(',');
    if (!result.header) {
      result.header = cols;
    } else {
      result.rows.push(cols);
    }
  }

  // result 객체의 내용이 담긴 자바스크립트 코드를 반환한다.
  return `export default ${JSON.stringify(result)}`;
};
