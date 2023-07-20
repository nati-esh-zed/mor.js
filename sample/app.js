
import App    from '../morjs/App.js';
import html   from '../morjs/html/html.js';
import R      from './R.js';
import themes from './themes.js';

export let main = function(app)
{
    return html.div({
        class: 'jxp:greeting',
        html:  R.get('greeting'),
    });
};

// export const app = new App('#main', R.get('title'), main, null, themes, 'default');
export const app = new App({
    target: '#main', 
    title:  R.get('title'),
    main:   main, 
    themes: themes, 
    theme:  'default',
});

export default app;
