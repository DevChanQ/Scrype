import replace_javascript from './replacer/javascript'

export default class Scrype {
  constructor (selector, {code = "null", onProgress = () => {}, codeContainerSelector = null, position = 'top', pixelPerStep = 20, padding = 0, removeCharacter = '~'}) {
    let ele = typeof selector === 'string' ? document.querySelector(selector) : selector
    let noMore = false

    function replaceCode(c, character) {
      var index = c.indexOf(character)
      while (index !== -1) {
        c = c.slice(0, index-1) + c.slice(index+1)
        index = c.indexOf(character)
      }
      return c
    }

    // onscroll callback
    function onScroll() {
      currentStep = Math.max(window.pageYOffset - container.offsetTop, 0)
      var pos = Math.floor(currentStep / pixelPerStep)
      if (pos > code.length) {
        if (!noMore) {
          var chars = replace_javascript(replaceCode(code, '~'))
          codeEle.innerHTML = '> ' + chars + '_'
          onProgress(100)
          noMore = true
        }
      } else {
        noMore = false
        var chars = replace_javascript(replaceCode(code.slice(0, pos), '~'))
        onProgress(Math.round(pos/code.length*100))
        codeEle.innerHTML = '> ' + chars + '_'
      }
    }

    function setItemPosition() {
      switch(position) {
        case 'center':
          item.style.cssText = `position: sticky;position: -webkit-sticky;top: calc(50% - ${item.clientHeight/2}px);`
          break;
        case 'bottom':
          item.style.cssText = `position: sticky;position: -webkit-sticky;top: calc(100% - ${item.clientHeight+50}px);`
          break;
        case 'top':
          item.style.cssText = `position: sticky;position: -webkit-sticky;top: 0;);`
          break;
        default:
          item.style.cssText = `position: sticky;position: -webkit-sticky;top: 0;);`
          break;
      }
    }

    let totalPixel = code.length * pixelPerStep
    let currentStep = 0
    let lastPos = 0

    // create container
    let container = document.createElement("div");
    container.className = 'scrype__container';

    // create sticky item
    let item = document.createElement("div");
    item.className = 'scrype__item';
    item.innerHTML = ele.innerHTML;

    // create snippet container
    let snippet = document.createElement("div");
    snippet.className = 'scrype__snippet';
    snippet.style.cssText = "border-radius: 6px;padding: 16px;background: black;font-family: SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;";

    // create code container
    let codeContainer = document.createElement('div');
    codeContainer.style.cssText = "position: relative;";

    // create code element
    let codeEle = document.createElement("code");
    codeEle.style.cssText = "color: white;white-space: pre;position: absolute; top: 0; left: 0;right: 0;bottom: 0;";

    // create code placeholder element
    let placeholder = document.createElement("code");
    placeholder.style.cssText = "white-space: pre;opacity: 0;";
    placeholder.innerHTML = replaceCode(code, '~');

    // setup element
    codeContainer.appendChild(placeholder)
    codeContainer.appendChild(codeEle)
    snippet.appendChild(codeContainer)
    if (codeContainerSelector) {
      setTimeout(() => {
        let c = document.querySelector(codeContainerSelector)
        c.appendChild(snippet)
      }, 0)
    } else item.appendChild(snippet)

    container.appendChild(item)

    ele.innerHTML = ''
    ele.appendChild(container)

    container.style.height = window.innerHeight + totalPixel + padding

    // Event Listeners
    setItemPosition()
    window.addEventListener('scroll', onScroll)
    onScroll()
  }
};
