import element from "./element.mjs";

const fragment = function(elements)
{
    let f = document.createDocumentFragment();
    if(elements)
    {
        if(elements instanceof Array || elements instanceof NodeList)
        {
            for(let element of elements)
            {
                if(typeof(element) === 'string')
                {
                    f.appendChild(document.createTextNode(element));
                }
                else if(element instanceof HTMLElement || element instanceof DocumentFragment)
                {
                    f.appendChild(element);
                }
                else if(element instanceof Array || element instanceof NodeList)
                {
                    for(let element_i of element)
                    {
                        if(typeof(element_i) === 'string')
                        {
                            e.appendChild(document.createTextNode(element_i));
                        }
                        else if(element_i instanceof HTMLElement || element_i instanceof DocumentFragment)
                        {
                            e.appendChild(element_i);
                        }
                        else
                        {
                            e.appendChild(document.createTextNode('' + element_i));
                        }
                    }
                }
                else
                {
                    e.appendChild(document.createTextNode('' + element));
                }
            }
        }
    }
    return f;
};

export default fragment;
