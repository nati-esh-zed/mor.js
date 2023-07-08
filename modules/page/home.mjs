import element from "../html/element.mjs";
import fragment from "../html/fragment.mjs";

const home = function()
{
    return fragment([
        element('div',
        {
            class: 'jxp(title)',
            html: 'message'
        }),
        element('div', {
            class: 'jxp(content)',
            html: 'hello world!'
        })
    ]);
}

export default home;
