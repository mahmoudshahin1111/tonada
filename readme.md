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
<link
  rel="stylesheet"
  href="https://unpkg.com/tonada/dist/input-password.css"
/>
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

### Inputs:

```html
<div id="input">
  <input class="tonada-input" type="text" name="name" placeholder="Name" />
</div>
```

```javascript
const element = document.querySelector("#input");
const input = Tonada.create("input", element);
```

##### Floating Label

Enable floating label by add `floating-label` class and it work on the password inputs and input groups the same way.

```html
<div class="floating-label">
  <input class="tonada-input" type="text" name="name" placeholder="Name" />
  <label for="">Name</label>
</div>
```

##### Error State

```html
<div>
  <div class="floating-label tonada-invalid">
    <input class="tonada-input" type="text" name="name" placeholder="Name" />
    <label for="">Name</label>
  </div>
  <ul class="tonada-errors">
    <li>Name is required</li>
    <!-- <= Add all the errors as a list -->
    <li>Should be character [A-Z a-z]</li>
  </ul>
</div>
```

##### Sizes
The available sizes are `tonada-`(`sm`-`lg`-`xl`)
```html
<div class="tonada-sm">
  <input class="tonada-input" type="text" name="name" placeholder="Name" />
  <label for="">Name</label>
</div>
```

#### Input Group:

```html
<div id="input">
  <span>$</span>
  <input class="tonada-input" type="text" name="name" placeholder="Name" />
  <span>.00</span>
</div>
```

```javascript
const element = document.querySelector("#input");
const input = Tonada.create("input-group", element);
```

##### Floating Label

```html
<div>
  <span>$</span>
  <div class="floating-label tonada-inputs">
    <!-- <= add "floating-label class" -->
    <input class="tonada-input" type="text" name="name" placeholder="Name" />
    <label for="">Name</label>
  </div>
  <span>.00</span>
</div>
```

#### Password:

```html
<div id="input">
  <input
    type="password"
    class="tonada-input"
    name="password"
    placeholder="password"
  />
  <i class="tonada-password-toggle tonada-ic-show"></i>
</div>
```

```javascript
const element = document.querySelector("#input");
const input = Tonada.create("input-password", element);
```

##### Floating Label

```html
<div class="floating-label">
  <input
    type="password"
    class="tonada-input"
    name="password"
    placeholder="password"
  />
  <label for="">Password</label>
  <i class="tonada-password-toggle tonada-ic-show"></i>
</div>
```

##### Sizes
The available sizes are `tonada-`(`sm`-`lg`-`xl`)
```html
<div class="tonada-sm">
  <input
    type="password"
    class="tonada-input"
    name="password"
    placeholder="password"
  />
  <label for="">Password</label>
  <i class="tonada-password-toggle tonada-ic tonada-ic-show"></i>
</div>
```

### Slider:

```html
<div id="slider" class="tonada-slider">
  <ul class="tonada-list">
    <li class="tonada-list-item">1</li>
    <li class="tonada-list-item">2</li>
  </ul>
  <button class="tonada-slider-button tonada-prev">
    <i class="tonada-ic tonada-ic-arrow-left"></i>
  </button>
  <button class="tonada-slider-button tonada-next">
    <i class="tonada-ic tonada-ic-arrow-right"></i>
  </button>
  <div class="tonada-slider-paginator"></div>
</div>
```

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
    <option value="2">Option 2</option>
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
