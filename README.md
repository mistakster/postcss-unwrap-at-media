# PostCSS Unwrap @media

[PostCSS] plugin to unwrap @media rules to make styles IE8 (and older) friendly.


```css
/* Input example */
.block {
  width: 100%;
}
@media (min-width: 720px) {
  .block {
    float: left;
    width: 25%;
  }
}
```

```css
/* Output example */
.block {
  width: 100%;
}
.block {
  float: left;
  width: 25%;
}
```

## Usage

```js
postcss([ require('postcss-unwrap-at-media') ])
```

See [PostCSS] docs for examples for your environment.


[PostCSS]: https://github.com/postcss/postcss
