
const element = function(tag, params)
{
    let e = document.createElement(tag);
    if(params instanceof Object)
    {
        let attributes = Object.entries(params);
        for(let [key, value] of attributes)
        {
            if(key == 'class')
            {
                let classes = value;
                if(typeof(value) === 'string')
                    classes = value.split(' ');
                if(classes instanceof Array)
                {
                    for(let class_ of classes)
                    {
                        e.classList.add(class_);
                    }
                }
                else
                    console.error(classes);
            }
            else if(key == 'html')
            {
                if(typeof(value) === 'string')
                {
                    e.appendChild(document.createTextNode(value));
                }
                else if(value instanceof HTMLElement || value instanceof DocumentFragment)
                {
                    e.appendChild(value);
                }
                else if(value instanceof Array || value instanceof NodeList)
                {
                    for(let element of value)
                    {
                        if(typeof(element) === 'string')
                        {
                            e.appendChild(document.createTextNode(element));
                        }
                        else if(element instanceof HTMLElement || element instanceof DocumentFragment)
                        {
                            e.appendChild(element);
                        }
                        else
                        {
                            e.appendChild(document.createTextNode('' + element));
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
                    console.error(value);
            }
            else
            {
                e.setAttribute(key, value);
            }
        }
    }
    return e;
};

export default element;
