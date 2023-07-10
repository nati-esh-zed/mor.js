
import element from './html/element.mjs';
import fragment from './html/fragment.mjs';
import default_theme from './theme/default.mjs';

let theme      = default_theme;
let app_states = { counter: 0 };

const app = function()
{
    let counter_element = element('span', {
        class: 'jxp:num-display',
        html: app_states.counter
    });
    return fragment([
        element('div', {
            class: 'jxp:app_header',
            html: [
                    element('div', {
                        class: 'jxp:app_title',
                        html: 'counter app'
                    })
            ]
            }),
            element('div', {
                class: 'jxp:app_body',
                html: [
                    counter_element,
                    element('button', {
                        class: 'jxp:button-increment',
                        html: 'increment',
                        onclick: function() 
                        {
                            app_states.counter++;
                            counter_element.innerHTML = app_states.counter;
                        }
                    }),
                    element('button', {
                        class: 'jxp:button-decrement',
                        html: 'decrement',
                        onclick: function() 
                        {
                            app_states.counter--;
                            counter_element.innerHTML = app_states.counter;
                        }
                    }),
                ]
            })
        ]);
};

theme.update_on_load();
theme.observe();

export default app;
