import "../src";

document.body.innerHTML = `
<p>
    行内公式
    <n-katex>\\underbrace{a+b+\\dots+n}_{m2}</n-katex>
    <n-katex output="html">\\underbrace{a+b+\\dots+n}_{m2}</n-katex>
</p>
<n-katex display-mode="true">
    \\begin{array}{c}
    S= \\binom{N}{n},A_{k}=\\binom{M}{k}\\cdot \\binom{N-M}{n-k} \\\\
    P\\left ( A_{k}\\right ) = \\frac{\\binom{M}{k}\\cdot \\binom{N-M}{n-k}}{\\binom{N}{n}}
    \\end{array}
</n-katex>
`;
