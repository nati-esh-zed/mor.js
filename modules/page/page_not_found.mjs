import element from "../html/element.mjs";


const page_not_found = function(page)
{
    return element('div', {
        class: 'alert alert-danger p-4',
        html: '404: page not found.' + (page ? (' \'' + page + '\'') : '')
    });
}

export default page_not_found;
