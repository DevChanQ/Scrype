# Scrype

### [Live Demo](https://devjeff.info/scrype)

Scrype is a TypeScript library that allows you to present code snippets in an interesting way with syntax highlighting and smooth scrolling animations.

<img src="/assets/example.gif" alt="Scrype Demo" width="250" />

## *Installation*

```bash
npm i scrype --save
```

## *Usage*

### Basic TypeScript/JavaScript

```typescript
import Scrype from 'scrype';
import type { ScrypeOptions } from 'scrype';
// Import a theme for syntax highlighting
import 'scrype/themes/github-dark.min.css';

const code = `const greeting = "Hello, World!";
console.log(greeting);`;

const options: ScrypeOptions = {
  code,
  lang: "typescript", // or "javascript" or "html"
  pixelPerStep: 8,
  position: "top",
  codeContainerSelector: "#code-container",
  onProgress: (progress) => {
    console.log(`Progress: ${progress}%`);
  }
};

const scrype = new Scrype('#sticky-element', options);
```

### Vue.js Example

```vue
<script setup lang="ts">
import type { ScrypeOptions } from 'scrype';

const { $scrype } = useNuxtApp(); // or import Scrype directly

const code = `import type { ScrypeOptions } from 'scrype';
import Scrype from 'scrype';

const options: ScrypeOptions = {
  code: "console.log('Hello World')",
  lang: "typescript",
  pixelPerStep: 8,
  position: "top",
  codeContainerSelector: "#code-container",
};

new Scrype('#sticky', options);`;

onMounted(() => {
  const options: ScrypeOptions = {
    code,
    lang: "typescript",
    pixelPerStep: 8,
    position: "top",
    codeContainerSelector: "#code-container",
  };

  new $scrype('#sticky', options);
});
</script>

<template>
  <div id="sticky">
    <div id="code-container"></div>
  </div>
</template>

<style>
@import "scrype/themes/github-dark.min.css";
</style>
```

## *Options*

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `code` | `string` | `"null"` | The code string to display |
| `lang` | `"typescript" \| "javascript" \| "html"` | `undefined` | Language for syntax highlighting |
| `replacer` | `Replacer` | `undefined` | Custom replacer function for syntax highlighting |
| `onProgress` | `(progress: number) => void` | `() => {}` | Callback function for progress updates (0-100) |
| `codeContainerSelector` | `string \| null` | `null` | CSS selector for the code container element |
| `position` | `"top" \| "center" \| "bottom"` | `"top"` | Position of the sticky element |
| `pixelPerStep` | `number` | `20` | Pixels to scroll per animation step |
| `padding` | `number` | `0` | Additional padding for scroll container |
| `removeCharacter` | `string` | `"~"` | Character to remove from code during animation |

## *Custom Replacer Function*

You can provide a custom syntax highlighter by implementing the `Replacer` type:

```typescript
import type { Replacer } from 'scrype';

const customReplacer: Replacer = (code: string) => {
  // Your custom syntax highlighting logic
  return highlightedHtmlString;
};

const options: ScrypeOptions = {
  code: "your code here",
  replacer: customReplacer,
  // other options...
};
```

## *Syntax Highlighting Themes*

Scrype includes pre-built themes for syntax highlighting. Import a theme CSS file:

```typescript
import 'scrype/themes/github-dark.min.css';
import 'scrype/themes/github-light.min.css';
// ... other available themes
```

## *TypeScript Support*

Scrype is built with TypeScript and provides full type definitions:

```typescript
import Scrype from 'scrype';
import type { ScrypeOptions, Replacer } from 'scrype';

// Full IntelliSense support for options
const options: ScrypeOptions = {
  // Your options with type safety
};
```

## *Language Support*

Currently supported languages for built-in syntax highlighting:
- `typescript`
- `javascript` 
- `html`

For other languages, provide a custom `replacer` function.