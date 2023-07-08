# mor.js

A JavaScript framework experiment using modules.

## sample code

```html
<!-- index.html -->

<div id="body">
    <!-- this will be populated -->
</div>
<script type="module">
    import app from './modules/app.mjs';
    $('#body').html(app());
    // document.getElementById('body').appendChild(index());
</script>
```

```javascript
/* modules/app.mjs */

import element from './html/element.mjs';

let app_states = { counter: 0 };

const app = function()
{
    let counter_element = element('span', {
        class: 'p-3 text-center',
        html: app_states.counter
    });
    return element('div', {
        class: 'jumbotron align-middle text-center mx-auto',
        html: [
            counter_element,
            element('button', {
                class: 'btn btn-success mx-2',
                html: 'increment',
                onclick: function() 
                {
                    app_states.counter++;
                    counter_element.innerHTML = app_states.counter;
                }
            }),
            element('button', {
                class: 'btn btn-danger mx-2',
                html: 'decrement',
                onclick: function() 
                {
                    app_states.counter--;
                    counter_element.innerHTML = app_states.counter;
                }
            }),
        ]
    });
};

export default app;

```
