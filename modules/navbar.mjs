
import fragment from './html/fragment.mjs';
import element from './html/element.mjs';

const base_url = window.location.origin + window.location.pathname;

const request = {
    nav_data: function()
    {
        let nav_data = [
            {'name':'home',     'href': base_url + '?page=home'},
            {'name':'app',      'href': base_url + '?page=app'},
            {'name':'products', 'href': base_url + '?page=products'},
            {'name':'about',    'href': base_url + '?page=about'},
        ];
        return nav_data;
    }
};

const nav_items = function()
{
    let items = fragment();
    let nav_data = request.nav_data();
    if(nav_data)
    {
        for(let nav_datum of nav_data)
        {
            items.appendChild(element('li', { 
                class: 'jxp(nav-item)',
                html: element('a', {
                    class: 'jxp(nav-link)',
                    href: nav_datum.href,
                    html: nav_datum.name
                })
            }
            ));
        }
    }
    return items;
};

const navbar = function()
{
    return element('nav', {
        id: 'navbar',
        class: 'jxp(navbar)',
        html: element('ul', {
            class: 'jxp(nav)',
            html: nav_items()
        })
    });
};

export default navbar;
