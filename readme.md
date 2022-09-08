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
<!-- All -->
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/index.css" />
<!-- OR by component  🙌 -->
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/icons.css" />
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/select.css" />
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/input.css" />
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/input-password.css" />
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/slider.css" />
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/accordion.css" />

```

## Usage

to reduce the bundle size and make the page load faster import only the components you need from Tonada

```html
<script src="tonada/dist/js/select.js"></script>
<script src="tonada/dist/js/accordion.js"></script>
<script src="tonada/dist/js/input-password.js"></script>
<script src="tonada/dist/js/slider.js"></script>
<script src="tonada/dist/js/input.js"></script>
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

- itemsPerPage: number of items per page.
- slideAnimation: `moving` or `fading`.
- infinite: boolean for auto sliding.
- infiniteSlidingDuration: number for the duration to sliding between items.
- paginator: boolean for show or hide the pages buttons.
- navigators: boolean for show or hide the next and previous buttons.

### Select:

```html
<div id="select">
  <select>
    <option value="1">Option 1</option>
    <option selected value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</div>
```

```javascript
const element = document.querySelector("#select");
Tonada.create("select", element, {
  multiple: true,
  disabled: true,
});
```

#### API

Options:

- multiple: number of items per page.
- disabled: boolean for disabled or enable.
