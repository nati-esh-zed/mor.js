
import fragment from '/modules/html/fragment.js';
import element from '/modules/html/element.js';
import navindex from '/modules/navindex.js';

const nav_items = function(page)
{
    let items = fragment();
    let nav_data = navindex;
    if(nav_data)
    {
        for(let nav_datum of nav_data)
        {
            items.appendChild(element('li', { 
                class: 'nav-item'+(nav_datum.name == page ? ' active' : ''),
                html: element('a', {
                    class: 'nav-link',
                    href: nav_datum.href,
                    html: nav_datum.name
                })
            }
            ));
        }
    }
    return items;
};

export let navbar_search = null;

export const navbar_collapse = function(page, theme, themetype)
{
    const brkpnt = 'sm';
    let base_url = window.location.origin + window.location.pathname;
    return element('nav', {
        id: 'navbar',
        class: 'navbar navbar-expand-'+brkpnt+' shadow sticky-top navbar-dark',//+' bg-2-'+themetype+' fg-2-'+themetype,
        style: 'background-color: #008093;',
        html: [
            element('a', {
                class: 'navbar-brand',
                href: base_url,
                html: 'mor.js',
            }),
            element('button', {
                class: 'navbar-toggler navbar-toggler-right', 
                type: 'button', 
                'data-toggle': 'collapse', 
                'data-target':  '#navbar_nav', 
                'aria-controls': 'navbar_nav',
                'aria-expanded': false,
                html: element('span', { class: 'navbar-toggler-icon' }),
            }),
            element('div', {
                class: 'collapse navbar-collapse',
                id: 'navbar_nav',
                html: [
                    element('ul', {
                        class: 'navbar-nav mr-auto mt-2 mt-'+brkpnt+'-0',
                        html: nav_items(page)
                    }),
                   element('form', {
                        class: 'form-inline my-2 my-'+brkpnt+'-0',
                        html: [
                            (navbar_search = element('input', {
                                class: 'form-control w-100',
                                type: 'search',
                                name: 'q',
                                id: 'navbar_search',
                                placeholder: 'search',
                            }))
                        ],
                        action: base_url,
                    }),
                ]
            })
        ]
    });
};

export default navbar_collapse;
