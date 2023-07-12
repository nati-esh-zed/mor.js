
import element from "./html/element.mjs";
import home from "./page/home.mjs";
import about from "./page/about.mjs";
import app from "./page/app.mjs";
import bootstrap from "./page/bootstrap.mjs";
import page_not_found from "./page/page_not_found.mjs";
import search from "./page/search.mjs";

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