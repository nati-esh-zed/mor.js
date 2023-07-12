
import element from '/modules/html/element.js'; 

export const header = function(title)
{
    return element('div', {
        class: 'jxp:header',
        html: element('h1', {
            html: title
        })
    });
};

export default header;
