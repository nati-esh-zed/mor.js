
import App    from '../morjs/App.js';
import html   from '../morjs/html/html.js';
import R      from './R.js';
import themes from './themes.js';

document.title = R.get('title');

export let main = function(app)
{
    return html.div({
        class: 'jxp:greeting',
        html: 'hello world!'
    });
};

const app_target = document.getElementById('main');

export const app = new App(app_target, main, null, themes, 'default');

export default app;
