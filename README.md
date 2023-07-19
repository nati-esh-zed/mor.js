# mor.js

A Javascript framework experiment using modules.

## sample code

```html
<!-- index.html -->

<div id="main">
    <!-- this will be populated -->
</div>
<script type="module">
    import html from './morjs/html/html.js';
    import App  from './morjs/App.js';
    const main = function() 
    {
        return html.h1({
            html: 'hello world!',
        });
    };
    let app = new App(document.getElementById('main'), main);
    app.reload();
</script>
```

