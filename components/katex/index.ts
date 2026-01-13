import { render } from 'katex';

export interface TrustContext {
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

// 中划线转驼峰换
function camelize(str: string) {
  return str.replace(/-\D/g, function (match) {
    return match.charAt(1).toUpperCase();
  });
}

class KaTex extends HTMLElement {
  timer?: NodeJS.Timeout;
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
  trust?: KaTexProps['trust'];
  output?: KaTexProps['output'];
  static bools = ['leqno', 'fleqn', 'throw-on-error', 'display-mode'];
  static nums = ['max-size', 'max-expand', 'min-rule-thickness'];
  static get observedAttributes() {
    return [...this.bools, ...this.nums, 'output', 'error-color'];
  }
  constructor() {
    super();
    const that = this;

    KaTex.observedAttributes.forEach((attr) => {
      const k = camelize(attr);

      Object.assign(that, {
        get [k]() {
          if (KaTex.bools.includes(attr)) {
            return that.getAttribute(attr) === 'true';
          }
          if (KaTex.nums.includes(attr)) {
            return Number(that.getAttribute(attr)) || undefined;
          }
          return that.getAttribute(attr);
        },
        set [k](next: string) {
          if (typeof next === 'function' || typeof next === 'object') {
            that[k as keyof typeof KaTex] = next;
          } else {
            that.setAttribute(attr, next);
          }
        },
      });
    });
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const css = require('./index.css?raw');

    shadowRoot.innerHTML = `<style>${css}</style><span></span>`;
  }
  highlight() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      clearTimeout(this.timer);
      if (this.shadowRoot && this.textContent) {
        render(this.textContent, this.shadowRoot.lastElementChild as HTMLElement, {
          throwOnError: this.throwOnError,
          errorColor: this.errorColor,
          displayMode: this.displayMode,
          strict: this.strict,
          output: this.output,
          leqno: this.leqno,
          fleqn: this.fleqn,
          macros: this.macros,
          minRuleThickness: this.minRuleThickness,
          colorIsTextColor: this.colorIsTextColor,
          maxSize: this.maxSize,
          maxExpand: this.maxExpand,
          trust: this.trust,
          globalGroup: this.globalGroup,
        });
        this.replaceChildren();
      }
    }, 0);
  }
  attributeChangedCallback(name: keyof Omit<KaTexProps, 'children' | 'class'>, old: string, next: string) {
    if (old !== next && KaTex.observedAttributes.includes(name)) {
      const key = camelize(name) as keyof typeof KaTex;
      this[key] = next as unknown as typeof KaTex[typeof key];
      this.highlight();
    }
  }
  connectedCallback() {
    this.highlight();
  }
}

if (!customElements.get('n-katex')) {
  customElements.define('n-katex', KaTex);
}

export default KaTex;
