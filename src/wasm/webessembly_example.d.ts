/* tslint:disable */
/* eslint-disable */
/**
*/
export function greet(): void;
/**
* @param {number} iter
* @param {number} len
* @returns {number}
*/
export function run_fibonacci(iter: number, len: number): number;
/**
* @param {number} num
* @returns {number}
*/
export function plus_ten(num: number): number;
/**
* @param {number} num
* @returns {number}
*/
export function plus_ten_simd(num: number): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly greet: () => void;
  readonly run_fibonacci: (a: number, b: number) => number;
  readonly plus_ten: (a: number) => number;
  readonly plus_ten_simd: (a: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
