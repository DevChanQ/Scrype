import hljs from "highlight.js/lib/core";
import html from "highlight.js/lib/languages/vbscript-html";

hljs.registerLanguage("html", html);

const replacer = (code: string): string => {
  const res = hljs.highlight(code, {
    language: "html",
  });

  const highlightedCode = res.value;

  return highlightedCode;
};

export default replacer;
