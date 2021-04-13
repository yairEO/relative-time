<p align="center">
  <a href="https://jsbin.com/vokawun/edit?html,js,console">
    <img  src="readme-header.svg"/ >
  </a>
</p>
<h3 align="center">Transform timestamp or date to local relative-time</h3>

---

## Features:

* Super lightweight (`< 500 bytes` minified)
* Uses **native browser API**

## Install:

Use from [CDN](https://unpkg.com/@yaireo/relative-time) / Download from this repo / [NPM](https://www.npmjs.com/package/@yaireo/relative-time)

```bash
npm i @yaireo/relative-time -S
```

## Usage:

Import CSS file via JS

```js
import RelativeTime from '@yaireo/relative-Time'
```

And use

```js
const relativeTime = new RelativeTime(); // defaults to OS locale
const relativeTimeSpanish = new RelativeTime({ locale: 'es' }); // set locale to Spanish

console.log(   relativeTime.from(new Date('2015'))  )  // "6 years ago"
console.log(   relativeTimeSpanish.from(new Date('2015'))  )  // "hace 6 años"
```

[Live demo](https://jsbin.com/vokawun/edit?html,js,console)