import element from "../html/element.mjs";

let custom_switch_input_id_top = 0;

/**
 * 
 * - set `container_params.label` or `label_params.html` to set the label.
 * - set `switch_params.bgcolor0` to set the unchecked switch background color.
 * - set `switch_params.bgcolor` to set the checked switch background color.
 * - set `switch_params.fgcolor0` to set the unchecked switch foreground color.
 * - set `switch_params.fgcolor` to set the checked switch foreground color.
 * 
 * @param {Object} container_params 
 * @param {Object} switch_params 
 * @param {Object} label_params 
 * @returns created custom switch `div` element
 * 
 */
export const custom_switch = function(container_params, switch_params, label_params)
{
    if(!container_params)
        container_params = {};
    if(!switch_params)
        switch_params = {};
    if(!label_params)
        label_params = {};
    let id = !!switch_params.id ? switch_params.id : ('custom_switch_input_' + custom_switch_input_id_top++);
    switch_params.class = 'custom-control-input ' + (!!switch_params.class ? switch_params.class : '');
    switch_params.type  = 'checkbox';
    switch_params.id    = id;
    switch_params.name  = !!switch_params.name ? switch_params.name : id;
    let switch_ = element('input', switch_params);
    label_params.class = 'custom-control-label ' + (!!label_params.class ? label_params.class : '');
    label_params.for   = id;
    label_params.html  = (!!label_params.html ? label_params.html : container_params.label);
    if(!label_params.html) 
        label_params.html = 'Switch';
    let switch_label            = element('label', label_params);
    let switch_bg_color_checked = !!switch_params.bgcolor ? switch_params.bgcolor : 'transparent';
    let switch_bg_color         = !!switch_params.bgcolor0 ? switch_params.bgcolor0 : switch_bg_color_checked;
    let switch_color_checked    = !!switch_params.fgcolor ? switch_params.fgcolor : 'var(--primary)';
    let switch_color            = !!switch_params.fgcolor0 ? switch_params.fgcolor0 : '#adb5bd';
    let style = element('style', {
        html: `
            #${id}~.custom-control-label {
                margin-left: 2.25rem;
                width: 100%;
                width: -moz-available;
                width: -webkit-fill-available;
                width: fill-available;
            }
            #${id}:not(checked)~.custom-control-label:before {
                background-color:${switch_bg_color};
            }
            #${id}:checked~.custom-control-label::before {
                background-color:${switch_bg_color_checked};
            }
            #${id}:not(checked)~.custom-control-label::after {
                background-color: ${switch_color};
            }
            #${id}:checked~.custom-control-label::after {
                background-color: ${switch_color_checked};
            }
        `
    });
    container_params.class = 'custom-control custom-switch pl-0 ' + (!!container_params.class ? container_params.class : '');
    container_params.html  = [ switch_, switch_label, style ];
    let e = element('div', container_params);
    return e;
};

export default custom_switch;
