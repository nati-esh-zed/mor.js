
import element from "/modules/html/element.js";

let custom_select_id_top = 0;

/**
 * - parameter `options` must be `Array` of strings or `Object` option attributes.  
 *    if the array element is a `String` then the option's `html` and `value` are set to it.
 * 
 * 
 * @param {Array} options 
 * @param {Object} select_params 
 * @param {Object} option_params 
 * @returns created custom `select` element
 * 
 */
export const custom_select = function(options, select_params, option_params)
{
    if(!select_params)
        select_params = {};
    if(!option_params)
        option_params = {};
    select_params.class = 'custom-select ' + (!!select_params.class ? select_params.class : '');
    let id = !!select_params.id ? select_params.id : ('custom_select_' + custom_select_id_top++);
    select_params.id     = id; 
    select_params.name   = !!select_params.name ? select_params.name : id;
    if(options instanceof Array && options.length > 0)
    {
        let options_html = Array();
        for(let option of options)
        {
            if(typeof(option) == 'string')
            {
                let option_params_i  = option_params;
                option_params_i.html  = option;
                option_params_i.value = option;
                options_html.push(element('option', option_params_i));
            }
            else if(options instanceof Object)
            {
                let option_params_i = {
                   ...option_params,
                   ...option
                };
                options_html.push(element('option', option_params_i));
            }
        }
        select_params.html = options_html;
    }
    let e  = element('select', select_params);
    return e;
};

export default custom_select;
