import React from 'react';
import { a, b, c } from './foo';

console.log(a, b, c());

const App = () => 
  <div>
    <p>
      {a} <br/>
    </p>
    <p>
      {b} <br/>
    </p>
    <p>
      {c()}
    </p>
  </div>;

export default App;
