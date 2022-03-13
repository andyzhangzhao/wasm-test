// Import React Framework
import React, { useEffect, useState } from 'react';

// Import WASM
import init, { run_fibonacci } from './wasm';
import { run_fibonacci as run_js_fibonacci } from './utils/utils';

// Import Css
import logo from './logo.svg';
import './App.css';

function App() {
  const [jsTime, setJsTime] = useState({ time: '0', result: '0' });
  const [wasmTime, setWasmTime] = useState({ time: '0', result: '0' });

  useEffect(() => {
    (async () => {
      await init();
      // Pure js
      let start = performance.now();
      let result = run_js_fibonacci(30, 30);
      setJsTime({
        time: (performance.now() - start).toFixed(2),
        result,
      });

      // WebAssembly
      start = performance.now();
      result = run_fibonacci(30, 30);
      setWasmTime({
        time: (performance.now() - start).toFixed(2),
        result
      });
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>WebAssembly Elapsed Time: {wasmTime.time} ms</p>
        <p className="result">WebAssembly result: {wasmTime.result}</p>
        <p>Javascript Elapsed Time: {jsTime.time} ms</p>
        <p className="result">Javascript result: {jsTime.result}</p>
      </header>
    </div>
  );
}

export default App;
