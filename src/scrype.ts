import replace_javascript from "./replacer/javascript";

export interface ScrypeOptions {
  code?: string;
  onProgress?: (progress: number) => void;
  codeContainerSelector?: string | null;
  position?: "top" | "center" | "bottom";
  pixelPerStep?: number;
  padding?: number;
  removeCharacter?: string;
}

console.log("Scrype v1.0.0");

export default class Scrype {
  constructor(selector: string | HTMLElement, options: ScrypeOptions = {}) {
    const {
      code = "null",
      onProgress = () => {},
      codeContainerSelector = null,
      position = "top",
      pixelPerStep = 20,
      padding = 0,
      removeCharacter = "~",
    } = options;

    const ele =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
    let noMore = false;

    // remove all occurrences of a character from a string
    function replaceCode(c: string, character: string): string {
      let index = c.indexOf(character);
      while (index !== -1) {
        c = c.slice(0, index - 1) + c.slice(index + 1);
        index = c.indexOf(character);
      }
      return c;
    }

    // onscroll callback
    function onScroll() {
      currentStep = Math.max(window.pageYOffset - container.offsetTop, 0);
      const pos = Math.floor(currentStep / pixelPerStep);
      if (pos > code.length) {
        if (!noMore) {
          const chars = replace_javascript(replaceCode(code, removeCharacter));
          codeEle.innerHTML = "> " + chars + "_";
          onProgress(100);
          noMore = true;
        }
      } else {
        noMore = false;
        const chars = replace_javascript(
          replaceCode(code.slice(0, pos), removeCharacter),
        );
        onProgress(Math.round((pos / code.length) * 100));
        codeEle.innerHTML = "> " + chars + "_";
      }
    }

    function setItemPosition() {
      switch (position) {
        case "center":
          item.style.cssText = `position: sticky;position: -webkit-sticky;top: calc(50% - ${item.clientHeight / 2}px);`;
          break;
        case "bottom":
          item.style.cssText = `position: sticky;position: -webkit-sticky;top: calc(100% - ${item.clientHeight + 50}px);`;
          break;
        case "top":
          item.style.cssText = `position: sticky;position: -webkit-sticky;top: 0;);`;
          break;
        default:
          item.style.cssText = `position: sticky;position: -webkit-sticky;top: 0;);`;
          break;
      }
    }

    const totalPixel = code.length * pixelPerStep;
    let currentStep = 0;
    // let lastPos = 0;

    // create container
    const container = document.createElement("div");
    container.className = "scrype__container";

    // create sticky item
    const item = document.createElement("div");
    item.className = "scrype__item";
    item.innerHTML = ele.innerHTML;

    // create snippet container
    const snippet = document.createElement("div");
    snippet.className = "scrype__snippet";
    snippet.style.cssText =
      "border-radius: 6px;padding: 16px;font-family: SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;";

    // create code container
    const codeContainer = document.createElement("div");
    codeContainer.style.cssText = "position: relative;";

    // create code element
    const codeEle = document.createElement("code");
    codeEle.style.cssText =
      "color: white;white-space: pre;position: absolute; top: 0; left: 0;right: 0;bottom: 0;";

    // create code placeholder element
    const placeholder = document.createElement("code");
    placeholder.style.cssText = "white-space: pre;opacity: 0;";
    placeholder.innerHTML = replaceCode(code, removeCharacter);

    // setup element
    codeContainer.appendChild(placeholder);
    codeContainer.appendChild(codeEle);
    snippet.appendChild(codeContainer);
    if (codeContainerSelector) {
      setTimeout(() => {
        const c = document.querySelector(codeContainerSelector);
        c.appendChild(snippet);
      }, 0);
    } else item.appendChild(snippet);

    container.appendChild(item);

    ele.innerHTML = "";
    ele.appendChild(container);

    container.style.height = `${window.innerHeight + totalPixel + padding}px`;

    // Event Listeners
    setItemPosition();
    window.addEventListener("scroll", onScroll);
    onScroll();
  }
}
