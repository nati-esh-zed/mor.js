
import cookie from '../lib/cookie/cookie.mjs';
import fragment from './html/fragment.mjs'; 
import stylesheet from './stylesheet.mjs';
import header from './header.mjs';
import navbar from './navbar.mjs';
import contents from './contents.mjs';
import { default_theme, theme_type } from './theme/default.mjs';
import { navbar_collapse, navbar_search } from './navbar_collapse.mjs';

export let theme = default_theme;
export let themetype = theme_type;

export const index = function()
{
    let usp = new URLSearchParams(window.location.search);
    let get_theme = usp.get('theme');
    let cookie_theme = cookie.get('theme');
    let themetype = get_theme ? get_theme : (cookie_theme ? cookie_theme : theme_type);
    if(get_theme && get_theme != cookie_theme)
        cookie.set('theme', get_theme, 0);
    else if(!cookie_theme || cookie_theme == '')
        cookie.set('theme', themetype, 0);
    let page  = usp.get('page');
    let query = usp.get('q');
    if(query)
        page = 'search';
    else if(!page)
        page = 'home';
    /* ----------------------------------------------- */
    theme.set({
        'body':         'container-md px-0 px-sm-auto bg-body-'+themetype,
        'contents':     'pb-2 bg-2-'+themetype+' fg-2-'+themetype,
        'header':       'jumbotron rounded-0 bg-1-'+themetype+' fg-1-'+themetype+' mb-0 rounded-0',
        'contents':     'p-3 bg-3-'+themetype+' fg-3-'+themetype,
        'app_section':  'mx-auto overflow-hidden rounded-md mb-3 shadow-sm',
        'app_title':    'h4 m-0 px-3 py-3 border-bottom bg-4-'+themetype+' fg-4-'+themetype,
        'app_body':     'm-0 px-3 py-3 bg-5-'+themetype+' fg-5-'+themetype,
    });
    return fragment([
        stylesheet(),
        // header('Mor.js'),
        navbar_collapse(page, theme, themetype),
        contents(page, theme, themetype, navbar_search),
    ]);
};

theme.update_on_load();
// theme.observe();

export default index;

