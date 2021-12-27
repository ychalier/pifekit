# Piweb Front-end Toolkit

This is a fork of the [Spectre.css](https://picturepan2.github.io/spectre/index.html) framework that I use for my web applications. [Checkout the original documentation](https://picturepan2.github.io/spectre/getting-started.html).

[Here is a demo of it.](https://ychalier.github.io/pifekit/showcase.html)

## Installation

This toolkit contains CSS and JS files. Those are served through the [jsDelivr](https://www.jsdelivr.com/) CDN. Append those two lines to the `<head>` tag:

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/ychalier/pifekit/pifekit.min.css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/ychalier/pifekit/pifekit.min.js"></script>
```

## JavaScript utility functions

```javascript
absorbEvent(event)
addBools(...x)
bindDraggableOrdering(container, itemSelector, dropCallback)
capitalize(string)
choose(arr)
closeModal(modalId)
getArrayMax(array, comparator)
getArrayMin(array, comparator)
getParentInArray(item, array)
getUrlParameters()
importTemplate(templateId)
normalize(string)
normalizeTurbo(string)
remToPx(rem)
showModal(modalId)
shuffleArray(array)
startCountingAnimation(element, end, formatter, duration)
toast(message, duration)
toggleFullScreen()
```
