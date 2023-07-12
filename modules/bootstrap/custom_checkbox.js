import element from "/modules/html/element.js";

let custom_checkbox_input_id_top = 0;

/**
 * 
 * - set `container_params.label` or `label_params.html` to set the label.
 * - set `checkbox_params.bgcolor0` to set the unchecked switch background color.
 * - set `checkbox_params.bgcolor` to set the checked switch background color.
 * - set `checkbox_params.fgcolor0` to set the unchecked switch foreground color.
 * - set `checkbox_params.fgcolor` to set the checked switch foreground color.
 * 
 * @param {Object} container_params 
 * @param {Object} checkbox_params 
 * @param {Object} label_params 
 * @returns created custom checkbox `div` element
 * 
 */
export const custom_checkbox = function(container_params, checkbox_params, label_params)
{
    if(!checkbox_params)
        checkbox_params = {};
    if(!container_params)
        container_params = {};
    if(!label_params)
        label_params = {};
    let id = !!checkbox_params.id ? checkbox_params.id : ('custom_checkbox_input_' + custom_checkbox_input_id_top++);
    checkbox_params.class = 'custom-control-input ' + (!!checkbox_params.class ? checkbox_params.class : '');
    checkbox_params.type  = 'checkbox';
    checkbox_params.id    = id;
    checkbox_params.name  = !!checkbox_params.name ? checkbox_params.name : id;
    let checkbox = element('input', checkbox_params);
    label_params.class = 'custom-control-label ' + (!!label_params.class ? label_params.class : '');
    label_params.for   = id;
    label_params.html  = (!!label_params.html ? label_params.html : container_params.value);
    if(!label_params.html) 
        label_params.html = 'Checkbox';
    let checkbox_label            = element('label', label_params);
    let checkbox_bg_color_checked = !!checkbox_params.bgcolor ? checkbox_params.bgcolor : 'transparent';
    let checkbox_bg_color         = !!checkbox_params.bgcolor0 ? checkbox_params.bgcolor0 : checkbox_bg_color_checked;
    let checkbox_color_checked    = !!checkbox_params.fgcolor ? checkbox_params.fgcolor : 'var(--primary)';
    let checkbox_color            = !!checkbox_params.fgcolor0 ? checkbox_params.fgcolor0 : 'transparent';
    const styles    = getComputedStyle(document.documentElement);
    if(checkbox_color.indexOf('var(') != -1)
    {
        const start_i   = checkbox_color.indexOf('var(') + 4;
        const end_i     = checkbox_color.indexOf(')', start_i);
        const var_name  = checkbox_color.substring(start_i, end_i);
        const var_value = styles.getPropertyValue(var_name);
        checkbox_color  = var_value;
    }
    if(checkbox_color.indexOf('#') != -1)
    {
        checkbox_color = checkbox_color.replace('#', '%23');
    }
    if(checkbox_color_checked.indexOf('var(') != -1)
    {
        const start_i   = checkbox_color_checked.indexOf('var(') + 4;
        const end_i     = checkbox_color_checked.indexOf(')', start_i);
        const var_name  = checkbox_color_checked.substring(start_i, end_i);
        const var_value = styles.getPropertyValue(var_name);
        checkbox_color_checked  = var_value;
    }
    if(checkbox_color_checked.indexOf('#') != -1)
    {
        checkbox_color_checked = checkbox_color_checked.replace('#', '%23');
    }
    let style = element('style', {
        html: `
            #${id}~.custom-control-label {
                margin-left: 1.5rem;
                width: 100%;
                width: -moz-available;
                width: -webkit-fill-available;
                width: fill-available;
            }
            #${id}:not(checked)~.custom-control-label:before {
                background-color:${checkbox_bg_color};
            }
            #${id}:checked~.custom-control-label::before {
                background-color:${checkbox_bg_color_checked};
            }
            #${id}:not(checked)~.custom-control-label::after {
                background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='${checkbox_color}' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3e%3c/svg%3e");
            }
            #${id}:checked~.custom-control-label::after {
                background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='${checkbox_color_checked}' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3e%3c/svg%3e");
            }
        `
    });
    container_params.class = 'custom-control custom-checkbox pl-0 ' + (!!container_params.class ? container_params.class : '');
    container_params.html  = [ checkbox, checkbox_label, style ];
    let e = element('div', container_params);
    return e;
};

export default custom_checkbox;
