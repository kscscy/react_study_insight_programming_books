import React from 'react';
import { getValue } from './legacy';

interface Props {
  name: string;
  age?: number;
}

// function App({ name, age }: Props) {
//   const value = getValue();
//   console.log(value.toFixed(2));
//   return (
//     <div>
//       <p>{name}</p>
//       <p>{age}</p>
//     </div>
//   );
// }
// export default App;

const App: React.FunctionComponent<Props> = function({name, age=23}) {
  return(
    <div></div>
  );
}
