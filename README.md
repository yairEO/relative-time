<p align="center">
  <a title='See demo' href="https://jsbin.com/vokawun/edit?html,js,console">
    <img  src="readme-header.svg"/ >
  </a>
</p>
<h3 align="center">Transform timestamp or date to local relative-time</h3>

---
<p align="center">
Super lightweight (<strong><code title='minified'>< 500 bytes</code></strong>) &nbsp; <big>🕙</big> &nbsp; Uses <a title='MDN docs for Intl.RelativeTimeFormat' href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat'>native browser API</a>
</p>
<br>

## Install:

[NPM](https://www.npmjs.com/package/@yaireo/relative-time) / [CDN](https://unpkg.com/@yaireo/relative-time) / Download from this repo

```bash
npm i @yaireo/relative-time -S
```

## Usage:

Import:

```js
import RelativeTime from '@yaireo/relative-time'

And use:

```js
const relativeTime = new RelativeTime(); // defaults to OS locale
const relativeTimeSpanish = new RelativeTime({ locale: 'es' }); // set Spanish locale

console.log(   relativeTime.from(new Date('2015'))  )  // "6 years ago"
console.log(   relativeTimeSpanish.from(new Date('2015'))  )  // "hace 6 años"
```

[Live demo](https://jsbin.com/vokawun/edit?html,js,console)
