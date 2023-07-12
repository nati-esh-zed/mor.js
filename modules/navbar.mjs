
import fragment from './html/fragment.mjs';
import element from './html/element.mjs';
import navindex from './navindex.mjs';

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

export const navbar = function(page, theme, themetype)
{
    return element('nav', {
        id: 'navbar',
        class: 'navbar bg-2-'+themetype+' fg-2-'+themetype,
        html: element('ul', {
            class: 'navbar-nav',
            html: nav_items(page)
        })
    });
};

export default navbar;
