
import element from "/modules/html/element.js";
import home from "/modules/page/home.js";
import about from "/modules/page/about.js";
import app from "/modules/page/app.js";
import bootstrap from "/modules/page/bootstrap.js";
import page_not_found from "/modules/page/page_not_found.js";
import search from "/modules/page/search.js";

export const contents = function(page, theme, theme_type, navbar_search)
{
    let page_map = {
        'home': home,
        'app': app,
        'bootstrap': bootstrap,
        'about': about,
        'search': search,
    };
    let c = page_map[page];
    return element('div', {
        class: 'jxp:contents',
        html: (c ? c(theme, theme_type, navbar_search) : page_not_found())
    });
};

export default contents;