
import element from "../html/element.mjs";

export const search = function(theme, theme_type, navbar_search)
{
    let usp = new URLSearchParams(window.location.search);
    let query = usp.get('q');
    if(!navbar_search)
        navbar_search = document.getElementById('navbar_search');
    if(navbar_search) 
    {
        navbar_search.value = query;
    }
    return [
        element('div', {
            class: 'jxp:app_section', 
            html: [
                element('div',
                {
                    class: 'jxp:app_title',
                    html: 'search results'
                }),
                element('div', {
                    class: 'jxp:app_body',
                    html: 'no results found for query `'+query+'`'
                })
            ]}
        ),
    ];
}

export default search;
