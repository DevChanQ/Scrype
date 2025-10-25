import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";

hljs.registerLanguage("typescript", typescript);

const replacer = (code: string): string => {
  const res = hljs.highlight(code, {
    language: "typescript",
  });

  const highlightedCode = res.value;

  return highlightedCode;
};

export default replacer;
