# Tonada

it's a UI Kit library so easy and you can customize it's style and component behaviors in no time as your needs because it's a component based that give it these advantages

- easy to use
- customizable
- fast
- build using typescript the most powerful typing language
- you can use it with any framework (Angular - React - Vue) or without

## Install

NPM:

```bash
npm install --save tonada
```

CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/tonada.css" />
```

## Usage

to reduce the bundle size and make the page load faster import only the components you need from Tonada

```html
<script src="tonada/dist/js/accordion.js"></script>
<script src="tonada/dist/js/input-password.js"></script>
<script src="tonada/dist/js/slider.js"></script>
<!-- This should be added at the end 🚫 👇🏻 -->
<script src="tonada/dist/js/index.js"></script>
```

## API

### Slider:

```javascript
const element = document.querySelector("#slider");
Tonada.create("slider", element, {
  itemsPerPage: 4,
  slideAnimation: "moving",
});
```

#### API

Options:

- itemsPerPage: number of items per page
- slideAnimation: `moving` or `fading`
- pagination: `true` or `false`
- arrows: true or false
- dots: true or false
- autoplay: true or false
- autoplaySpeed: number of milliseconds between each slide
- infinite: `true` or `false`
- speed: `number` of milliseconds for the animation
- easing: `ease-in-out` or `ease-in` or `ease-out`
- onChange: function to call when the slider changes
- onInit: function to call when the slider is initialized
- onDestroy: function to call when the slider is destroyed
