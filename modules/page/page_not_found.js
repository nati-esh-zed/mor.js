import element from "/modules/html/element.js";


const page_not_found = function(page)
{
    return element('div', {
        class: '',
        html: element('div', {
            class: 'alert alert-danger p-4',
            html: '404: page not found.' + (page ? (' \'' + page + '\'') : '')
        })
    });
}

export default page_not_found;
