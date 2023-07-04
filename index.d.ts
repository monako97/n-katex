interface TrustContext {
  command: string
  url: string
  protocol: string
}

export interface KaTexProps {
  class?: string;
  children?: string;
  output?: "html" | "htmlAndMathml" | "mathml";
  trust?: boolean | ((context: TrustContext) => boolean);
  colorIsTextColor?: boolean;
  strict?: boolean;
  globalGroup?: boolean;
  fleqn?: boolean;
  leqno?: boolean;
  displayMode?: boolean;
  throwOnError?: boolean;
  maxSize?: number;
  maxExpand?: number;
  minRuleThickness?: number;
  errorColor?: string;
  macros?: object;
}
export interface KaTexElement extends Omit<HTMLDivElement, 'children'>, KaTexProps {
  ref?: KaTexElement | { current: KaTexElement | null };
}

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
