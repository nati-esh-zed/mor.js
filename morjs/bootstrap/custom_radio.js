import element from "../html/element.js";

let custom_radio_input_id_top = 0;

/**
 * 
 * - set `container_params.label` or `label_params.html` to set the label.
 * - set `radio_params.bgcolor0` to set the unchecked switch background color.
 * - set `radio_params.bgcolor` to set the checked switch background color.
 * - set `radio_params.fgcolor0` to set the unchecked switch foreground color.
 * - set `radio_params.fgcolor` to set the checked switch foreground color.
 * 
 * @param {Object} container_params 
 * @param {Object} radio_params 
 * @param {Object} label_params 
 * @returns created custom radio `div` element
 * 
 */
export const custom_radio = function(container_params, radio_params, label_params)
{
    if(!radio_params)
        radio_params = {};
    if(!container_params)
        container_params = {};
    if(!label_params)
        label_params = {};
    let id = !!radio_params.id ? radio_params.id : ('custom_radio_input_' + (!!radio_params.name ? radio_params.name : '') + '_' + custom_radio_input_id_top++);
    radio_params.class = 'custom-control-input ' + (!!radio_params.class ? radio_params.class : '');
    radio_params.type  = 'radio';
    radio_params.id    = id;
    radio_params.name  = !!radio_params.name ? radio_params.name 
        : (!!container_params.name ? container_params.name : id);
    const CIRCLE       = 0;
    const CHECK        = 1;
    let radio_mark     = CIRCLE;
    if(radio_params.mark != undefined)
    {
        radio_mark = radio_params.mark == 'check' ? CHECK : CIRCLE;
    }
    let radio = element('input', radio_params);
    label_params.class = 'custom-control-label ' + (!!label_params.class ? label_params.class : '');
    label_params.for   = id;
    label_params.html  = (!!label_params.html ? label_params.html : container_params.value);
    if(!label_params.html) 
        label_params.html = 'Radio';
    let radio_label            = element('label', label_params);
    let radio_bg_color_checked = !!radio_params.bgcolor ? radio_params.bgcolor : 'transparent';
    let radio_bg_color         = !!radio_params.bgcolor0 ? radio_params.bgcolor0 : radio_bg_color_checked;
    let radio_color_checked    = !!radio_params.fgcolor ? radio_params.fgcolor : 'var(--primary)';
    let radio_color            = !!radio_params.fgcolor0 ? radio_params.fgcolor0 : 'transparent';
    if(radio_color.indexOf('var(') != -1)
    {
        const start_i   = radio_color.indexOf('var(') + 4;
        const end_i     = radio_color.indexOf(')', start_i);
        const var_name  = radio_color.substring(start_i, end_i);
        const styles    = getComputedStyle(document.documentElement);
        const var_value = styles.getPropertyValue(var_name);
        radio_color  = var_value;
    }
    if(radio_color.indexOf('#') != -1)
    {
        radio_color = radio_color.replace('#', '%23');
    }
    if(radio_color_checked.indexOf('var(') != -1)
    {
        const start_i   = radio_color_checked.indexOf('var(') + 4;
        const end_i     = radio_color_checked.indexOf(')', start_i);
        const var_name  = radio_color_checked.substring(start_i, end_i);
        const styles    = getComputedStyle(document.documentElement);
        const var_value = styles.getPropertyValue(var_name);
        radio_color_checked  = var_value;
    }
    if(radio_color_checked.indexOf('#') != -1)
    {
        radio_color_checked = radio_color_checked.replace('#', '%23');
    }
    const check_mark = function(color)
    {
        return "background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='"+color+"' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3e%3c/svg%3e\")";
    };
    const circle_mark = function(color) 
    {
        return "background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='-4 -4 8 8'%3e%3ccircle r='4' fill='"+color+"'/%3e%3c/svg%3e\")";
    };
    const mark         = radio_mark == CHECK ? check_mark(radio_color) : circle_mark(radio_color);
    const mark_checked = radio_mark == CHECK ? check_mark(radio_color_checked) : circle_mark(radio_color_checked);
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
                background-color:${radio_bg_color};
            }
            #${id}:checked~.custom-control-label::before {
                background-color:${radio_bg_color_checked};
            }
            #${id}:not(checked)~.custom-control-label::after {
                ${mark};
            }
            #${id}:checked~.custom-control-label::after {
                ${mark_checked};
            }
        `
    });
    container_params.class = 'custom-control custom-radio pl-0 ' + (!!container_params.class ? container_params.class : '');
    container_params.html  = [ radio, radio_label, style ];
    let e = element('div', container_params);
    return e;
};

export default custom_radio;
