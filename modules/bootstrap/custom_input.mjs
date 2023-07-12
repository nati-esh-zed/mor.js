import element from "../html/element.mjs";

let custom_input_id_top = 0;


export const custom_text = function(container_params, input_params, label_params)
{
    if(!container_params)
        container_params = {};
    if(!input_params)
        input_params = {};
    if(!label_params)
        label_params = {};
    let id = !!input_params.id ? input_params.id : ('custom_input_' + custom_input_id_top++);
    label_params.class = 'col-form-label ' + (!!label_params.class ? label_params.class : '');
    label_params.for   = id;
    label_params.html  = !!label_params.html ? label_params.html : container_params.label;
    input_params.class = 'form-control ' + (!!input_params.class ? input_params.class : '');
    input_params.type  = !!input_params.type ? input_params.type : container_params.type; 
    input_params.id    = id; 
    input_params.name  = !!input_params.name ? input_params.name : id;
    let label = element('label', label_params);
    let input = element('input', input_params);
    // container_params.class = '' + (!!container_params.class ? container_params.class : '');
    container_params.html  = !!label_params.html ? [ label, input ] : [ input ];
    let e = element('div', container_params);
    return e;
};

export default custom_text;
