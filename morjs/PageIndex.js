
import element from './html/element.js';

const page_not_found = function(page)
{
    return element('div', {
        class: 'alert alert-danger p-4',
        html: '404: page not found.' + (page ? (' \'' + page + '\'') : '')
    });
}

export class PageIndex 
{
    #map          = new Map();
    #default_page = null;

    constructor(page_map, default_page)
    {
        if(!!page_map && !page_map instanceof Object)
            throw Error('PageIndex argument `page_map` must be instance of `Object`.');
        if(!!default_page && typeof(default_page) != 'string')
            throw Error('PageIndex argument `default_page` must be of type `string`.');
        if(!!page_map)
        {
            for(let [page, func] of Object.entries(page_map))
            {
                this.#map.set(page, func);
            }
        }
        if(!!default_page)
        {
            this.#default_page = default_page;
        }
    }

    fetch(page, return_null_if_not_found, ...args)
    {
        if(!page)
            page = this.#default_page;
        if(!!this.#map)
        {
            if(!!this.#map.has(page))
            {
                let page_info = this.#map.get(page);
                if(!!page_info)
                {
                    if(typeof(page_info) == 'function')
                    {
                        return page_info(...args);
                    }
                    else if(page_info instanceof Object)
                    {
                        if(typeof(page_info.page) == 'function')
                            return page_info.page(...args);
                        else 
                            throw  'page_index entry object does not contain a property named page';
                    }
                    else
                        throw  'page_index entry is not a function or valid object';
                }
            }
            else if(!return_null_if_not_found)
                return page_not_found(page);
            else 
                return null;
        }
        return null;
    }

    set_default_page(page)
    {
        this.#default_page = page;
    }

    default_page() { return this.#default_page; }

    entries()   { return !!this.#map ? this.#map.entries() : null; }
    keys()      { return !!this.#map ? this.#map.keys()    : null; }
    values()    { return !!this.#map ? this.#map.values()  : null; }

};

export default PageIndex;
