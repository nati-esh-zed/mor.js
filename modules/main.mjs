
import element from "./html/element.mjs";
import home from "./page/home.mjs";
import about from "./page/about.mjs";
import app from "./page/app.mjs";
import page_not_found from "./page/page_not_found.mjs";

const main = function()
{
    let usp = new URLSearchParams(window.location.search);
    let page = usp.get('page');
    if(!page)
        page = 'home';
    let page_map = {
        'home': home,
        'app': app,
        'about': about,
    };
    let c = page_map[page];
    return element('div', {
        class: 'jxp(main)',
        html: c ? c() : page_not_found()
    });
};

export default main;