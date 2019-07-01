# Scrype

### [Live Demo](https://devjeff.info)

Scrype is a library that allows you to present code snippet in a interesting way

## *Installation*

    npm i scrype --save

## *Usage*

~~~ javascript
import Scrype from 'scrype';

let options = {
  onProgress: (progress) => {
    ...
  },
  pixelPerStep: 3,
  position: 'top',
  codeContainerSelector:'#code-container',
  code: 'class DevJeff {\n\tconstructor () {\n\t  this.age = 22;\n\t  this.sex = \'F\'~~M\';\n\t  this.from = \'Hong Kang ~~~~ong\';\n\t}\n\tabout () {...}\n\tprojects () {...}\n\tblog () {...}\n}\n> let person = new DevJeff();'
}

new Scrype('#scrype', options)
~~~
