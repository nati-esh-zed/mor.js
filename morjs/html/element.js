
export const element = function(tag, params)
{
    if(typeof(tag) != 'string' && tag instanceof Object)
    {
        params     = { ...tag, ...params };
        tag        = !params.tag ? 'div' : params.tag;
        delete params.tag;
    }
    let e = document.createElement(tag);
    if(params instanceof Object)
    {
        let e_value = undefined;
        let attributes = Object.entries(params);
        for(let [key, value] of attributes)
        {
            if(key == 'class')
            {
                let classes = value;
                if(typeof(classes) === 'string')
                {
                    classes = classes.replaceAll(/\s+/g, ' ');
                    classes = classes.trim();
                    classes = classes.split(' ');
                }
                if(classes instanceof Array)
                {
                    for(let class_ of classes)
                    {
                        if(typeof(class_) != 'string')
                            throw TypeError('expecting a `string`.');
                        class_ = class_.trim();
                        if(class_.length > 0)
                        {
                            e.classList.add(class_);
                        }
                    }
                }
                else
                    throw TypeError('expecting a `string` or `array of strings`.');
            }
            else if(key == 'value')
            {
                e_value = value;
            }
            else if(key == 'checked')
            {
                e.checked = !value ? undefined : true;
            }
            else if(key == 'selected')
            {
                e.selected = !value ? undefined : true;
            }
            else if(key == 'disabled')
            {
                e.disabled = !value ? undefined : true;
            }
            else if(key == 'autofocus')
            {
                e.autofocus = !value ? undefined : true;
            }
            else if(key == 'html')
            {
                if(typeof(value) === 'string')
                {
                    e.innerHTML += value;
                }
                else if(value instanceof Node || value instanceof DocumentFragment)
                {
                    e.appendChild(value);
                }
                else if(value instanceof Array || value instanceof NodeList)
                {
                    for(let element of value)
                    {
                        if(!!element)
                        {
                            if(typeof(element) === 'string')
                            {
                                e.innerHTML += element;
                            }
                            else if(element instanceof Node || element instanceof DocumentFragment)
                            {
                                e.appendChild(element);
                            }
                            else
                            {
                                e.appendChild(document.createTextNode('' + element));
                            }
                        }
                    }
                }
                else
                {
                    e.appendChild(document.createTextNode('' + value));
                }
            }
            else if(key.startsWith('on'))
            {
                if(typeof(value) === 'function')
                {
                    let event_id = key.substring(2, key.length);
                    e.addEventListener(event_id, value);
                }
                else
                    throw TypeError('expecting a `function`.');
            }
            else
            {
                e.setAttribute(key, value);
            }
        }
        if(e_value !== undefined)
        {
            e.value = e_value;
        }
    }
    return e;
};

export default element;

