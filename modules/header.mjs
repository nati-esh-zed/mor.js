
import element from './html/element.mjs'; 

const header = function(title)
{
    return element('div', {
        class: 'jxp(header)',
        html: element('h1', {
            html: title
        })
    });
};

export default header;
