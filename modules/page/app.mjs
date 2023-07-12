
import element from '../html/element.mjs';

let app_states = { counter: 0 };

const app = function(theme)
{
    if(theme)
    {
        theme.set({
            'pages.app.mvert':             'my-1',
            'pages.app.num-display':       'd-block text-center border border-info rounded-pill @pages.app.mvert px-4 py-2',
            'pages.app.button':            'btn btn-block rounded-pill @pages.app.mvert px-3 py-2',
            'pages.app.button-increment':  '@pages.app.button btn-success',
            'pages.app.button-decrement':  '@pages.app.button btn-warning',
        });
    }
    /* ---------------------------------------- */
    let counter_element = element('span', {
        class: 'jxp:pages.app.num-display',
        html: app_states.counter
    });
    return element('div', {
        class: 'jxp:app_section',
        html: [
            element('div', {
                class: 'jxp:app_title',
                html: 'counter app'
            }),
            element('div', {
                class: 'jxp:app_body',
                html: [
                    counter_element,
                    element('button', {
                        class: 'jxp:pages.app.button-increment',
                        html: 'increment',
                        onclick: function() 
                        {
                            app_states.counter++;
                            counter_element.innerHTML = app_states.counter;
                        }
                    }),
                    element('button', {
                        class: 'jxp:pages.app.button-decrement',
                        html: 'decrement',
                        onclick: function() 
                        {
                            app_states.counter--;
                            counter_element.innerHTML = app_states.counter;
                        }
                    }),
                ]
            })
        ]
    });
};


export default app;
