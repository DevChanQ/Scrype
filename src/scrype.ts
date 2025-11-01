import typescript_replacer from "./replacer/typescript";
import javascript_replacer from "./replacer/javascript";
import html_replacer from "./replacer/html";

/**
 * Turn code at any given point during a scroll to highlighted version of itself.
 * Highlighted code string should be in HTML format.
 * @param code The original code string.
 * @returns The highlighted code string.
 */
export type Replacer = (code: string) => string;

export interface ScrypeOptions {
  lang?: "typescript" | "javascript" | "html";
  code?: string;
  replacer?: Replacer;
  onProgress?: (progress: number) => void;
  codeContainerSelector?: string | null;
  position?: "top" | "center" | "bottom";
  pixelPerStep?: number;
  padding?: number;
  removeCharacter?: string;
}

export default class Scrype {
  private selector: string | HTMLElement;
  private options: ScrypeOptions;
  private replacer: Replacer;
  private ele: HTMLElement;
  private code: string;
  private onProgress: (progress: number) => void;
  private codeContainerSelector: string | null;
  private position: "top" | "center" | "bottom";
  private pixelPerStep: number;
  private padding: number;
  private removeCharacter: string;
  private container: HTMLElement;
  private item: HTMLElement;
  private codeEle: HTMLElement;
  private totalPixel: number;
  private currentStep: number = 0;
  private noMore: boolean = false;

  constructor(selector: string | HTMLElement, options: ScrypeOptions = {}) {
    this.selector = selector;
    this.options = options;

    const {
      code = "null",
      onProgress = () => {},
      codeContainerSelector = null,
      position = "top",
      pixelPerStep = 20,
      padding = 0,
      removeCharacter = "~",
      replacer: providedReplacer,
    } = options;

    this.code = code;
    this.onProgress = onProgress;
    this.codeContainerSelector = codeContainerSelector;
    this.position = position;
    this.pixelPerStep = pixelPerStep;
    this.padding = padding;
    this.removeCharacter = removeCharacter;

    this.replacer = providedReplacer;
    if (!this.replacer) {
      switch (options.lang) {
        case "typescript":
          this.replacer = typescript_replacer;
          break;
        case "javascript":
          this.replacer = javascript_replacer;
          break;
        case "html":
          this.replacer = html_replacer;
          break;
        default:
          throw new Error(
            "Please provide a valid language or a custom replacer function.",
          );
      }
    }

    this.ele =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;

    this.totalPixel = this.code.length * this.pixelPerStep;

    this.setup();
  }

  private setup(): void {
    // remove all occurrences of a character from a string
    const replaceCode = (c: string, character: string): string => {
      let index = c.indexOf(character);
      while (index !== -1) {
        c = c.slice(0, index - 1) + c.slice(index + 1);
        index = c.indexOf(character);
      }
      return c;
    };

    // onscroll callback
    const onScroll = () => {
      this.currentStep = Math.max(
        window.pageYOffset - this.container.offsetTop,
        0,
      );
      const pos = Math.floor(this.currentStep / this.pixelPerStep);
      if (pos > this.code.length) {
        if (!this.noMore) {
          const chars = this.replacer(
            replaceCode(this.code, this.removeCharacter),
          );
          this.codeEle.innerHTML = chars + "_";
          this.onProgress(100);
          this.noMore = true;
        }
      } else {
        this.noMore = false;
        const chars = this.replacer(
          replaceCode(this.code.slice(0, pos), this.removeCharacter),
        );
        this.onProgress((pos / this.code.length) * 100);
        this.codeEle.innerHTML = chars + "_";
      }
    };

    const setItemPosition = () => {
      switch (this.position) {
        case "center":
          this.item.style.cssText = `position: sticky;position: -webkit-sticky;top: calc(50% - ${this.item.clientHeight / 2}px);`;
          break;
        case "bottom":
          this.item.style.cssText = `position: sticky;position: -webkit-sticky;top: calc(100% - ${this.item.clientHeight + 50}px);`;
          break;
        case "top":
          this.item.style.cssText = `position: sticky;position: -webkit-sticky;top: 0;);`;
          break;
        default:
          this.item.style.cssText = `position: sticky;position: -webkit-sticky;top: 0;);`;
          break;
      }
    };

    // create container
    this.container = document.createElement("div");
    this.container.className = "scrype__container";

    // create sticky item
    this.item = document.createElement("div");
    this.item.className = "scrype__item";
    while (this.ele.firstChild) {
      this.item.appendChild(this.ele.firstChild);
    }

    // create snippet container
    const snippet = document.createElement("div");
    snippet.className = "scrype__snippet";
    snippet.style.cssText =
      "border-radius: 6px;padding: 16px;font-family: SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;";

    // create code container
    const codeContainer = document.createElement("div");
    codeContainer.style.cssText = "position: relative;";

    // create code element
    this.codeEle = document.createElement("code");
    this.codeEle.style.cssText =
      "color: white;white-space: pre;position: absolute; top: 0; left: 0;right: 0;bottom: 0;";

    // create code placeholder element
    const placeholder = document.createElement("code");
    placeholder.style.cssText = "white-space: pre;opacity: 0;";
    placeholder.innerHTML = replaceCode(this.code, this.removeCharacter);

    // setup element
    codeContainer.appendChild(placeholder);
    codeContainer.appendChild(this.codeEle);
    snippet.appendChild(codeContainer);
    if (this.codeContainerSelector) {
      setTimeout(() => {
        const c = document.querySelector(this.codeContainerSelector);
        c.appendChild(snippet);
      }, 0);
    } else this.item.appendChild(snippet);

    this.container.appendChild(this.item);

    this.ele.innerHTML = "";
    this.ele.appendChild(this.container);

    this.container.style.height = `${window.innerHeight + this.totalPixel + this.padding}px`;

    // Event Listeners
    // setItemPosition();
    window.addEventListener("scroll", onScroll);
    onScroll();

    setTimeout(() => {
      setItemPosition();
    }, 0);
  }
}
