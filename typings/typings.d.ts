declare module '*.less';
declare module '*.css';
declare module '*.js';
declare module '*.ts';
declare module 'katex/dist/katex.min.css?raw';

declare module '*?raw' {
  const str: string;

  export default str;
}

import '../umd/index';
