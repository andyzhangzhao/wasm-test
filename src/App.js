// Import React Framework
import React, { useEffect, useState } from 'react';

// Import WASM
import init, { run_fibonacci, plus_ten, plus_ten_simd } from './wasm';
import { run_fibonacci as run_js_fibonacci, plusTen } from './utils/utils';

// Import Css
import logo from './logo.svg';
import './App.css';

function App() {
  const [jsTime, setJsTime] = useState({ time: '0', result: 0 });
  const [wasmTime, setWasmTime] = useState({ time: '0', result: 0 });
  const [simdTime, setSIMDTime] = useState({ js: '0', wasm: '0', simd: '0' });

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
        result,
      });

      // get arrays
      start = performance.now();
      plusTen(1e8);
      const jsTime = (performance.now() - start).toFixed(2);

      // WebAssembly - Without SIMD
      start = performance.now();
      plus_ten(1e8);
      const wasmTime = (performance.now() - start).toFixed(2);
      setSIMDTime({ js: jsTime, wasm: wasmTime, simd: '0' });

      // WebAssembly - With SIMD
      start = performance.now();
      plus_ten_simd(1e8);
      const simdTime = (performance.now() - start).toFixed(2);
      setSIMDTime({ js: jsTime, wasm: wasmTime, simd: simdTime });
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
        <p>
          JS Time: {simdTime.js} ms, WASM Time: {simdTime.wasm} ms, WASM SIMD Time: {simdTime.simd}
          ms
        </p>
      </header>
    </div>
  );
}

export default App;
