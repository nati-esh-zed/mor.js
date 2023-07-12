import element from "../html/element.mjs";

const about = function()
{
    return element('div', {
        class: 'jxp:app_section',
        html: [
            element('div',
            {
                class: 'jxp:app_title',
                html: 'about this site'
            }),
            element('div', {
                class: 'jxp:app_body',
                html: 'This is an experimental client-side framework using Javascript modules.'
            })
        ]
    });
}

export default about;
