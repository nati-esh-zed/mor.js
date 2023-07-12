
import element from "/modules/html/element.js";

let custom_range_input_id_top = 0;

/**
 * - set container_params.label to set the label's html as a shortcut  
 * - setting range_params.name and not container_params.label will set the 
 *   label's html to range_params.name  
 * - set range_params.[track|thumb]_[color|border|style] to style the slider  
 *   track and thumb. color and border are formatted like   
 *   'background-color: ${track_color}'  
 *   , and style is just appended.  
 * 
 * @param {Object} container_params 
 * @param {Object} range_params 
 * @param {Object} label_params 
 * @returns created custom range `div` element
 * 
 */
export const custom_range = function(container_params, range_params, label_params, range_container_params)
{
    if(!container_params)
        container_params = {};
    if(!range_params)
        range_params = {};
    if(!label_params)
        label_params = {};
    let id = !!range_params.id ? range_params.id : ('custom_range_input_' + custom_range_input_id_top++);
    range_params.class = 'custom-range ' + (!!range_params.class ? range_params.class : '');
    range_params.type  = 'range';
    range_params.id    = id;
    range_params.name  = !!range_params.name ? range_params.name : id;
    label_params.for   = id;
    label_params.html  = !!container_params.label 
        ? container_params.label 
        : (!!range_params.name
            ? range_params.name
            : 'Range');
    let range_input  = element('input', range_params);
    let range_label  = element('label', label_params);
    let track_color  = !!range_params.track_color ? ('background-color: '+range_params.track_color+';') : '';
    let thumb_color  = !!range_params.thumb_color ? ('background-color: '+range_params.thumb_color+';') : '';
    let track_border = !!range_params.track_border ? ('border: '+range_params.track_border+';') : '';
    let thumb_border = !!range_params.thumb_border ? ('border: '+range_params.thumb_border+';') : '';
    let track_style  = !!range_params.track_style ? ('style: '+range_params.track_style+';') : '';
    let thumb_style  = !!range_params.thumb_style ? ('style: '+range_params.thumb_style+';') : '';
    let track_css = `
        #${id}::-webkit-slider-runnable-track { ${track_color}\n${track_border}\n${track_style} \n}
        #${id}::-moz-range-track              { ${track_color}\n${track_border}\n${track_style} \n}
        #${id}::-ms-track                     { ${track_color}\n${track_border}\n${track_style} \n}
    `;
    let thumb_css = `
        #${id}::-webkit-slider-thumb { ${thumb_color}\n${thumb_border}\n${thumb_style} \n}
        #${id}::-moz-range-thumb     { ${thumb_color}\n${thumb_border}\n${thumb_style} \n}
        #${id}::-ms-thumb            { ${thumb_color}\n${thumb_border}\n${thumb_style} \n}
    `;
    let style = element('style', { html: track_css + thumb_css });
    container_params.html = [ range_label, range_input, style ];
    let e  = element('div', container_params);
    return e;
};

export default custom_range;
