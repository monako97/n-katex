import { type KaTexElement } from './katex';

export * from './katex';

declare module 'solid-js' {
  export namespace JSX {
    export interface IntrinsicElements {
      "n-katex": KaTexElement;
    }
  }
}
declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      "n-katex": KaTexElement;
    }
  }
}
