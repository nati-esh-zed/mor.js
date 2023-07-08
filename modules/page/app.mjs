import element from "../html/element.mjs";

let app_state = { counter: 0 };

const app = function()
{
    let display = element('span', { 
        class: 'p-3',
        html: app_state.counter 
    });
    return element('div', {
        class: 'jxp(main)',
        html: [
            display,
            element('button', {
                class: 'btn btn-success mx-2',
                html: 'increment',
                onclick: function(evt) 
                {
                    app_state.counter++;
                    display.innerHTML = app_state.counter;
                }
            }),
            element('button', {
                class: 'btn btn-danger mx-2',
                html: 'decrement',
                onclick: function(evt) 
                {
                    app_state.counter--;
                    display.innerHTML = app_state.counter;
                }
            })
        ]
    });
}

export default app;
