[![npm version](https://badge.fury.io/js/tonada.svg)](https://badge.fury.io/js/tonada)
![example workflow](https://github.com/mahmoudshahin1111/numbers-to-arabic-words/actions/workflows/.github/workflows/test.yml/badge.svg)

# Tonada

Tonada is a free toolkit build with 💖 focus on performance,ease, lightweight,responsive and seo friendly To make the web development more interesting and easiest 🙌, with tonada you are free to select only one component and use it with minimum config ever just few steps and you get you component works , tonada has a continuous maintenance and upgrading.

## Install

NPM:

```bash
npm install --save tonada
```

CDN:

```html
<!-- Import all the tonada component styles -->
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/css/index.css" />
<!-- (Optional) Or you can import the component style you going to use-->
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
<link rel="stylesheet" href="https://unpkg.com/tonada/dist/css/sidenav.css" />
<link
  rel="stylesheet"
  href="https://unpkg.com/tonada/dist/css/auto-complete.css"
/>
<!-- ... -->
<!-- (Required) ⛔ -->
<script src="https://unpkg.com/tonada/dist/js/runtime.js"></script>
<script src="https://unpkg.com/tonada/dist/js/shared.js"></script>
<script src="https://unpkg.com/tonada/dist/js/index.js"></script>
<!-- (Optional) -->
<script src="https://unpkg.com/tonada/dist/js/input.js"></script>
<script src="https://unpkg.com/tonada/dist/js/input-password.js"></script>
<script src="https://unpkg.com/tonada/dist/js/input-group.js"></script>
<script src="https://unpkg.com/tonada/dist/js/checkbox.js"></script>
<script src="https://unpkg.com/tonada/dist/js/checkbox-group.js"></script>
<script src="https://unpkg.com/tonada/dist/js/select.js"></script>
<script src="https://unpkg.com/tonada/dist/js/slider.js"></script>
<script src="https://unpkg.com/tonada/dist/js/accordion.js"></script>
<script src="https://unpkg.com/tonada/dist/js/sidenav.js"></script>
<script src="https://unpkg.com/tonada/dist/js/auto-complete.js"></script>
```

## Getting Started

We going to import the style files for the components we will use and let's assume we will use all the components then import the index style file

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Import all the styles -->
    <link rel="stylesheet" href="https://unpkg.com/tonada/dist/css/index.css" />
    <!-- Or what you going to use only and i will use input style -->
    <link rel="stylesheet" href="https://unpkg.com/tonada/dist/css/input.css" />
  </head>
  <body>
    <div id="element" class="floating-label">
      <input class="tonada-input" type="text" name="name" placeholder="Name" />
      <label for="">Name</label>
    </div>
    <!-- (Required) ⛔ -->
    <script src="https://unpkg.com/tonada/dist/js/runtime.js"></script>
    <script src="https://unpkg.com/tonada/dist/js/shared.js"></script>
    <script src="https://unpkg.com/tonada/dist/js/index.js"></script>
    <!-- I Going to import the Input only-->
    <script src="https://unpkg.com/tonada/dist/js/input.js"></script>
    <script>
      const input = Tonada.create("input", document.querySelector("#element"));
    </script>
  </body>
</html>
```

For more [Documentation](https://mahmoudshahin1111.github.io/tonada)

You can Choose from tonada various components and features

## Table of Contents:

- [Inputs](https://github.com/mahmoudshahin1111/tonada#inputs)
- [Input Group](https://github.com/mahmoudshahin1111/tonada#input-group)
- [Password](https://github.com/mahmoudshahin1111/tonada#password)
- [Select](https://github.com/mahmoudshahin1111/tonada#select)
- [Slider](https://github.com/mahmoudshahin1111/tonada#slider)
- [Accordion](https://github.com/mahmoudshahin1111/tonada#accordion)
- [Checkbox](https://github.com/mahmoudshahin1111/tonada#checkbox)
- [Checkbox Group](https://github.com/mahmoudshahin1111/tonada#checkbox-group)
- [How to customize style](https://mahmoudshahin1111.github.io/tonada/#customize-section)
<!-- And more Comming Soon -->

---

## Inputs:

```html
<div id="element">
  <input class="tonada-input" type="text" name="name" placeholder="Name" />
</div>
```

```javascript
const input = Tonada.create("input", document.querySelector("#element"));
```

### Floating Label

Enable floating label by add `floating-label` class and it work on the password inputs and input groups the same way.

```html
<div class="floating-label">
  <input class="tonada-input" type="text" name="name" placeholder="Name" />
  <label for="">Name</label>
</div>
```

### Error State

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

### Sizes

The available sizes are `tonada-`(`sm`-`lg`-`xl`)

```html
<div class="tonada-sm">
  <input class="tonada-input" type="text" name="name" placeholder="Name" />
  <label for="">Name</label>
</div>
```

---

## Input Group:

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

### Floating Label

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

## Password:

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

### Floating Label

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

### Sizes

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

## Slider:

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

### API

|        Name         |                                   Description                                    |         Type         |
| :-----------------: | :------------------------------------------------------------------------------: | :------------------: |
|    itemsPerPage     |                            number of items per page.                             |        number        |
|   slideAnimation    |                   how the slider going to slide between pages                    | "moving" or "fading" |
|     autoSliding     |                               Enable auto sliding.                               |       boolean        |
| autoSlidingDuration | The duration for sliding between items only works with slideAnimation=fading ⛔. |        number        |
|      paginator      |                         Show or hide the pages buttons.                          |       boolean        |
|     navigators      |                   Show or hide the next and previous buttons.                    |       boolean        |

---

## Select:

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

### API

|   Name   |           Description           |  Type   |
| :------: | :-----------------------------: | :-----: |
| multiple | number of items per page. page. | number  |
| disabled | boolean for disabled or enable. | boolean |

---

## Checkbox

```html
<div id="element">
  <label for="checkbox_1">...</label>
  <input id="checkbox_1" type="checkbox" />
</div>
```

```javascript
Tonada.create("checkbox", document.querySelector("#element"));
```

### Disabled

checkbox support the input default attributes so if you marked as checked it wil be checked or you can mark it as disabled like now.

```html
<div id="element">
  <label for="checkbox_1">...</label>
  <input id="checkbox_1" type="checkbox" disabled checked />
</div>
```

---

## Checkbox Group

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

## Buttons

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

## Accordion

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

## Sidenav

```html
<div id="element">
  <div class="tonada-sidenav-menu"></div>
  <div class="tonada-sidenav-content">...</div>
</div>
```

```javascript
const sidenav = Tonada.create("sidenav", document.getElementById("element"), {
  menuItems: [
    {
      /* Main Section only (required) */
      title: "Getting Started",
      /* OR as HTML */
      // title: "<span>Getting Started</span>"
      /* OR as function */
      // title: function (menuItem) {
      //   return <span>Getting Started</span>;
      // },
    },
    /* Only single link  */
    {
      title: "Installation",
      /* icon as html (optional) */
      iconHTML: `<svg>...</svg>`,
      /* which path going to go after click on the link */
      to: "/installation",
      /* disabled the menu item */
      disabled: true,
    },
    {
      title: "Dropdown Page",
      iconHTML: `<svg>...</svg>`,
      /* Sub Links (optional) */
      children: [
        {
          title: "Sub page",
          iconHTML: `<svg>...</svg>`,
          to: "/sub-page",
        },
      ],
    },
  ],
  /* Close the other menus if there is an menu opened */
  toggleOnlyOne: true,
  /* Be to toggle mode on load */
  toggled: true,
});

/* can close the menu items */
// sidenav.closeAllMenuItems();

/* Do something when minimize and extend the sidenav*/
//sidenav.onToggled((e) => {
/* Event data into e.detail and will be (closed) or (opened) */
//});
```

### API

#### Sidenav

|    Name     |           Description           |  Type   |
| :---------: | :-----------------------------: | :-----: |
| showToggler | show or hide the toggler button | boolean |
|   toggled   |   sidenav expanded by default   | boolean |
|  menuItems  |       sidenav menu items        | boolean |

#### MenuItem

|       Name       |                                                Description                                                |              Type               |
| :--------------: | :-------------------------------------------------------------------------------------------------------: | :-----------------------------: |
| title (Required) |                                            for the menu title                                             | string / function / dom element |
|     iconHTML     |                                               the menu icon                                               | string / function / dom element |
|     disabled     |                                          for disabled or enable                                           |             boolean             |
|        to        |                                           for the menu link url                                           |             boolean             |
|    onToggled     | do something when any menuitem had triggered and you will be have all the information about the menu item |            function             |
|     isOpened     |                                        set menu opened by default                                         |             boolean             |
|     children     |                                              menu sub links                                               |            MenuItem             |

## AutoComplete

```html
<div id="element">
  <div class="tonada-auto-complete-input">
    <input class="tonada-input" type="text" />
  </div>
</div>
```

```javascript
const autoComplete = Tonada.create(
  "auto-complete",
  document.querySelector("#element")
);

autoComplete.onSearch(async (search) => {
  // do something on searching
  const data = await getData(search);
  // open the menu with the data you had fetched and pass an array of Items
  autoComplete.open(
    data.map((record) => ({
      value: record.id,
      container: (item) => record.name,
      // ...
    }))
  );
});
autoComplete.onSelect((value) => {
  // do something
});
```

### API

#### AutoComplete

|   Name   |                  Description                   |            Type             |
| :------: | :--------------------------------------------: | :-------------------------: |
|  value   |              input default value               |           string            |
| disabled |               disable the input                |           boolean           |
|  close   |                 close the menu                 |          function           |
| onSelect | an event executed if you have selected an item | function(selectedItemValue) |
| onSearch |    and event executed if you have searching    |    function(searchValue)    |

#### Item

|    Name    |                                      Description                                      |          Type          |
| :--------: | :-----------------------------------------------------------------------------------: | :--------------------: |
| container  | the item content and if the item has children then it will be a wrapper for the items | string/function/object |
|   title    |                 item title you can pass function or string or Object                  | string/function/object |
| isSelected |                                  selected by default                                  |        boolean         |
|   items    |                child items to display a custom content for every item                 |          Item          |
|   value    |                       unique value for track the selected item                        |         string         |

## InputSlider

```html
<div id="element" class="tonada-input-slider"></div>
```

```javascript
const inputSlider = Tonada.create(
  "input-slider",
  document.querySelector("#element"),
  {
    from: 10,
    to: 10,
    step: 1,
    value: 5,
  }
);
```

### API

#### AutoComplete

|   Name   |                  Description                   |            Type             |
| :------: | :--------------------------------------------: | :-------------------------: |
|  value   |              input default value               |           string            |
| disabled |               disable the input                |           boolean           |
|  close   |                 close the menu                 |          function           |
| onSelect | an event executed if you have selected an item | function(selectedItemValue) |
| onSearch |    and event executed if you have searching    |    function(searchValue)    |

#### Item

|    Name    |                                      Description                                      |          Type          |
| :--------: | :-----------------------------------------------------------------------------------: | :--------------------: |
| container  | the item content and if the item has children then it will be a wrapper for the items | string/function/object |
|   title    |                 item title you can pass function or string or Object                  | string/function/object |
| isSelected |                                  selected by default                                  |        boolean         |
|   items    |                child items to display a custom content for every item                 |          Item          |
|   value    |                       unique value for track the selected item                        |         string         |

## Customization

This is our project file structure and you have 2 options :
Every Sass variable in Tonada includes the !default flag allowing you to override the variable’s default value in your own Sass without modifying Tonada’s source code. (Recommended)

```scss
// Default variable overrides
$tn-font-size: 16px;
$tn-border-radius: 8px;
// Required
@import "../node_modules/tonada/src/scss/variables";
@import "../node_modules/tonada/src/scss/mixins";
@import "../node_modules/tonada/src/scss/root";
// Optional
@import "../node_modules/tonada/src/scss/input";
@import "../node_modules/tonada/src/scss/slider";
// ...
```

```plain
Tonada
┣ 📂src
┃ ┣ 📂scss
┃ ┃ ┃ ┣ 📜index.scss # It import all the component or you can import only your needs
┃ ┃ ┃ ┣ 📜accordion.scss
┃ ┃ ┃ ┣ 📜button.scss
┃ ┃ ┃ ┣ 📜checkbox-group.scss
┃ ┃ ┃ ┣ 📜checkbox.scss
┃ ┃ ┃ ┗ 📜input-group.scss
┃ ┃ ┃ ┗ 📜input-group.scss
```

Or by override css root variables or override our classes

```html
<link rel="stylesheet" href="../dist/css/button.css" />
<link rel="stylesheet" href="../dist/css/icons.css" />
<link rel="stylesheet" href="../dist/css/input.css" />
<style>
  :root {
    --tonada-color-primary: #1c3879;
    --tonada-color-secondary: #607eaa;
    --tonada-color-success: #30dd78;
    --tonada-color-danger: #ff004c;
    --tonada-color-white: #ffffff;
    /* etc */
  }

  .tonada-checkbox {
    /* etc */
  }
</style>
```

```plain
Tonada
┣ 📂dist
┃ ┣ 📂css
┃ ┃ ┃ ┣ 📜index.css # Import this or only the components you need
┃ ┃ ┃ ┣ 📜accordion.css
┃ ┃ ┃ ┣ 📜button.css
┃ ┃ ┃ ┣ 📜checkbox-group.css
┃ ┃ ┃ ┣ 📜checkbox.css
┃ ┃ ┃ ┗ 📜input-group.css
```

---

## Changelog

v1.2.1 (Upcoming)

- Surprise 😁
- performance improvements

v1.1.1

- added AutoComplete component
- performance improvements
- docs updated.

v1.0.9

- added sidenav
- performance improvements
- docs updated.

v1.0.8

- docs updated.

v1.0.7

- optimized bundle size by 80% by splitting the javascript
  files and you can pick that components you going to use.
- fix issues

v1.0.6 Pre Release

v1.0.5

- optimized bundle size
- fix issues

v1.0.4

- optimized bundle size
- update docs

v1.0.3

- docs updates.
- fixing issues.

v1.0.2

- docs updates.
- fixing issues.

v1.0.1

- Release

v1.0.0 - Pre-V1

### Contributions

Contributions are welcome, please open an issue and preferably file a pull request. check [Pull-Request-Guidelines](https://github.com/mahmoudshahin1111/tonada/wiki/Pull-Request-Guidelines)

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
