

const fragment = function(elements)
{
    let f = document.createDocumentFragment();
    if(elements)
    {
        if(elements instanceof Array || elements instanceof NodeList)
        {
            for(let element of elements)
            {
                if(!!element)
                {
                    if(typeof(element) === 'string')
                    {
                        f.appendChild(document.createTextNode(element));
                    }
                    else if(element instanceof Node)
                    {
                        f.appendChild(element);
                    }
                    else if(element instanceof Array || element instanceof NodeList)
                    {
                        for(let element_i of element)
                        {
                            if(typeof(element_i) === 'string')
                            {
                                f.appendChild(document.createTextNode(element_i));
                            }
                            else if(element_i instanceof Node || value instanceof DocumentFragment)
                            {
                                f.appendChild(element_i);
                            }
                            else
                            {
                                f.appendChild(document.createTextNode('' + element_i));
                            }
                        }
                    }
                    else
                    {
                        f.appendChild(document.createTextNode('' + element));
                    }
                }
            }
        }
    }
    return f;
};

export default fragment;
