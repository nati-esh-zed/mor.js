import element from "../html/element.mjs";
import fragment from "../html/fragment.mjs";

const about = function()
{
    return fragment([
        element('div',
        {
            class: 'jxp(title)',
            html: 'about this site'
        }),
        element('div', {
            class: 'jxp(content)',
            html: 'This is an experimental web framework.'
        })
    ]);
}

export default about;
