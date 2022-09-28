# Tonada

Tonada is a free toolkit build with 💖 focus on performance,ease, lightweight,responsive and seo friendly To make the web development more interesting and easiest 🙌.

## Install

NPM:

```bash
npm install --save tonada
```

CDN:

```html
<!-- Import all the tonada component styles -->
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/css/index.css" />
<!-- Or you can import the component style you going to use-->

<link rel="stylesheet" href="https://unpkg.com/tonada/dist/css/icons.css" />
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/css/input.css" />
<link
  rel="stylesheet"
  href="https://unpkg.com/tonada/dist/css/input-group.css"
/>
<link
  rel="stylesheet"
  href="https://unpkg.com/tonada/dist/css/input-password.css"
/>
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/css/select.css" />
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/css/slider.css" />
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/css/accordion.css" />
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/css/button.css" />
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/css/checkbox.css" />
<link
  rel="stylesheet"
  href="https://unpkg.com/tonada/dist/css/checkbox-group.css"
/>
<!--  -->

<script src="https://unpkg.com/tonada/dist/js/input.js"></script>
<script src="https://unpkg.com/tonada/dist/js/input-group.js"></script>
<script src="https://unpkg.com/tonada/dist/js/input-password.js"></script>
<script src="https://unpkg.com/tonada/dist/js/select.js"></script>
<script src="https://unpkg.com/tonada/dist/js/slider.js"></script>
<script src="https://unpkg.com/tonada/dist/js/accordion.js"></script>
<script src="https://unpkg.com/tonada/dist/js/checkbox.js"></script>
<!-- This should be added at the end 🚫 👇🏻 -->
<script src="https://unpkg.com/tonada/dist/js/index.js"></script>
```

## Getting Start

We going to import the style files for the components we will use and let's assume we will use all the components then import the index style file

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ... -->
    <link rel="stylesheet" href="https://unpkg.com/tonada/dist/css/index.css" />
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
    <div id="element" class="floating-label">
      <input class="tonada-input" type="text" name="name" placeholder="Name" />
      <label for="">Name</label>
    </div>
    <!-- ... -->
    <script src="https://unpkg.com/tonada/dist/js/input.js"></script>
    <script src="https://unpkg.com/tonada/dist/js/input-group.js"></script>
    <script src="https://unpkg.com/tonada/dist/js/input-password.js"></script>
    <script src="https://unpkg.com/tonada/dist/js/select.js"></script>
    <script src="https://unpkg.com/tonada/dist/js/slider.js"></script>
    <script src="https://unpkg.com/tonada/dist/js/accordion.js"></script>
    <script src="https://unpkg.com/tonada/dist/js/checkbox.js"></script>
    <!-- This should be added at the end 🚫 👇🏻 -->
    <script src="https://unpkg.com/tonada/dist/js/index.js"></script>
    <script>
      const input = Tonada.create("input", document.querySelector("#element"));
    </script>
  </body>
</html>
```

Then choose which component you going to use for examples [Inputs](https://github.com/mahmoudshahin1111/tonada#inputs)

---

### Inputs:

```html
<div id="element">
  <input class="tonada-input" type="text" name="name" placeholder="Name" />
</div>
```

```javascript
const input = Tonada.create("input", document.querySelector("#element"));
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
<div class="floating-label tonada-invalid">
  <input class="tonada-input" type="text" name="name" placeholder="Name" />
  <label for="">Name</label>
</div>
<ul class="tonada-errors">
  <li>Name is required</li>
  <!-- <= Add all the errors as a list -->
  <li>Should be character [A-Z a-z]</li>
</ul>
```

##### Sizes

The available sizes are `tonada-`(`sm`-`lg`-`xl`)

```html
<div class="tonada-sm">
  <input class="tonada-input" type="text" name="name" placeholder="Name" />
  <label for="">Name</label>
</div>
```

---

#### Input Group:

```html
<div id="element">
  <span>$</span>
  <input class="tonada-input" type="text" name="name" placeholder="Name" />
  <span>.00</span>
</div>
```

```javascript
const input = Tonada.create("input-group", document.querySelector("#element"));
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

---

#### Password:

```html
<div id="element">
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
const input = Tonada.create(
  "input-password",
  document.querySelector("#element")
);
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

---

### Slider:

```html
<div id="element">
  <ul class="tonada-list">
    <li class="tonada-list-item">1</li>
    <li class="tonada-list-item">2</li>
    <!-- etc -->
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
Tonada.create("slider", document.querySelector("#element"), {
  itemsPerPage: 4,
  slideAnimation: "moving",
});
```

#### API

|        Name         |                                   Description                                    |         Type         |
| :-----------------: | :------------------------------------------------------------------------------: | :------------------: |
|    itemsPerPage     |                            number of items per page.                             |        number        |
|   slideAnimation    |                   how the slider going to slide between pages                    | "moving" or "fading" |
|     autoSliding     |                               Enable auto sliding.                               |       boolean        |
| autoSlidingDuration | The duration for sliding between items only works with slideAnimation=fading ⛔. |        number        |
|      paginator      |                         Show or hide the pages buttons.                          |       boolean        |
|     navigators      |                   Show or hide the next and previous buttons.                    |       boolean        |

---

### Select:

```html
<div id="element">
  <select>
    <option value="1">Option 1</option>
    <!-- etc -->
  </select>
</div>
```

```javascript
Tonada.create("select", document.querySelector("#element"), {
  multiple: true,
  disabled: true,
});
```

#### API

|   Name   |           Description           |  Type   |
| :------: | :-----------------------------: | :-----: |
| multiple | number of items per page. page. | number  |
| disabled | boolean for disabled or enable. | boolean |

---

### Checkbox

```html
<div id="element">
  <label for="checkbox_1">...</label>
  <input id="checkbox_1" type="checkbox" />
</div>
```

```javascript
Tonada.create("checkbox", document.querySelector("#element"));
```

#### Disabled

checkbox support the input default attributes so if you marked as checked it wil be checked or you can mark it as disabled like now.

```html
<div id="element">
  <label for="checkbox_1">...</label>
  <input id="checkbox_1" type="checkbox" disabled checked />
</div>
```

---

### Checkbox Group

```html
<div id="element">
  <div>
    <label for="test3">Option 1</label>
    <input id="test3" type="radio" name="tonada-checkbox-group" value="1" />
  </div>
  <div>
    <label for="test4">Option 2</label>
    <input
      id="test4"
      type="radio"
      name="tonada-checkbox-group"
      value="2"
      checked
    />
  </div>
  <div>
    <label for="test5">Option 3</label>
    <input id="test5" type="radio" name="tonada-checkbox-group" value="3" />
  </div>
</div>
```

```javascript
Tonada.create("checkbox-group", document.querySelector("#element"));
```

---

### Buttons

For buttons you don't need to add javascript but you can apply it by add this class on the button `tonada-button` and we have different types of the buttons

- `tonada-button-primary`
- `tonada-button-secondary`

```html
<button class="tonada-button tonada-button-primary" type="button">
  Submit
</button>
<button class="tonada-button tonada-button-secondary" type="button">
  Submit
</button>
<button class="tonada-button" type="button" disabled>Submit</button>
```

---

### Accordion

```html
<div id="element" class="tonada-accordion">
  <div class="tonada-accordion-section">
    <div class="tonada-accordion-header">
      <h4>This is panel header 1</h4>
    </div>
    <div class="tonada-accordion-content">
      <p>
        A dog is a type of domesticated animal. Known for its loyalty and
        faithfulness, it can be found as a welcome guest in many households
        across the world.
      </p>
    </div>
  </div>
  <div class="tonada-accordion-section">
    <div class="tonada-accordion-header">
      <h4>This is panel header 2</h4>
    </div>
    <div class="tonada-accordion-content">
      <p>
        A dog is a type of domesticated animal. Known for its loyalty and
        faithfulness, it can be found as a welcome guest in many households
        across the world.
      </p>
    </div>
  </div>
</div>
```

```javascript
const accordion = Tonada.create(
  "accordion",
  document.querySelector("#element")
);
```

---

### Changelog

v1.00 (2022-12-01) - Release

### Contributions

Contributions are welcome, please open an issue and preferrably file a pull request. check [Pull-Request-Guidelines](https://github.com/mahmoudshahin1111/tonada/wiki/Pull-Request-Guidelines)

### Development

This project build using

- [Typescript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/)
- [Sass](https://sass-lang.com/)

### Issues

please let us know more about your issues and suggestions to make tonada better [Report about issue](https://github.com/mahmoudshahin1111/tonada/issues)

---

### License

Please read [License](https://github.com/mahmoudshahin1111/tonada/blob/master/LICENSE.md) for more information
