
import element from "/modules/html/element.js";

export const home = function(theme, theme_type)
{
    let theme_select = null;
    return [
        element('div', {
            class: 'jxp:app_section', 
            html: [
                element('div',
                {
                    class: 'jxp:app_title',
                    html: 'message'
                }),
                element('div', {
                    class: 'jxp:app_body',
                    html: 'hello world!'
                })
            ]}
        ),
        element('div', {
            class: 'jxp:app_section', 
            html: [
                element('div',
                {
                    class: 'jxp:app_title',
                    html: 'theme'
                }),
                element('div', {
                    class: 'jxp:app_body',
                    html: [
                        element('div', {
                            class: 'form-group',
                            html: [
                                (theme_select = element('select', {
                                    class: 'custom-select',
                                    value: theme_type,
                                    html: [
                                        element('option', { html: 'light' }),
                                        element('option', { html: 'dark' }),
                                    ],
                                    onchange: function(evt)
                                    {
                                        let usp = new URLSearchParams(window.location.search);
                                        usp.set('theme', theme_select.value);
                                        const url = window.location.origin + window.location.pathname + '?' + usp.toString();
                                        window.open(url, '_self');
                                    },
                                })),
                            ]
                        })
                    ]
                })
            ]
        }),
    ];
}

export default home;
