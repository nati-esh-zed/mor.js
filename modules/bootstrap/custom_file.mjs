import element from "../html/element.mjs";

let custom_file_input_id_top = 0;

/**
 * - `file_input_params.id` is set to `'custom_file_input_${id_top++}'` by default
 * - the `label_params.html` is updated using a `change` event listener.
 * 
 * @param {Object} container_params 
 * @param {Object} file_input_params 
 * @param {Object} label_params 
 * @returns created custom file `div` element 
 * 
 */
export const custom_file = function(container_params, file_input_params, label_params)
{
    if(!file_input_params)
        file_input_params = {};
    if(!container_params)
        container_params = {};
    if(!label_params)
        label_params = {};
    let id = !!file_input_params.id ? file_input_params.id : ('custom_file_input_' + custom_file_input_id_top++);
    file_input_params.class = 'custom-file-input overflow-auto' + (!!file_input_params.class ? file_input_params.class : '');
    file_input_params.type  = 'file';
    file_input_params.id    = id;
    file_input_params.name  = !!file_input_params.name ? file_input_params.name : id;
    let file_input = element('input', file_input_params);
    label_params.class = 'custom-file-label ' + (!!label_params.class ? label_params.class : '');
    label_params.for   = id;
    if(!label_params.html) 
        label_params.html = 'Choose file' + (!!file_input_params.multiple ? 's' : '');
    let file_input_label = element('label', label_params);
    container_params.class = 'custom-file ' + (!!container_params.class ? container_params.class : '');
    container_params.html  = [ file_input, file_input_label ];
    let e = element('div', container_params);
    e.addEventListener('change', function(evt)
    {
        let files = '';
        if(file_input.files.length > 0)
        {
            let i = 0;
            let last_i = (file_input.files.length - 1) * (file_input.files.length > 0);
            for(let file of file_input.files)
            {
                files += file.name;
                if(i++ < last_i)
                    files += ', ';
            }
        }
        else
        {
            files = 'Choose file' + (!!file_input_params.multiple ? 's' : '')
        }
        file_input_label.innerHTML = files;
    });
    return e;
};

export default custom_file;
