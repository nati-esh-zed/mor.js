import element from "../html/element.mjs";
import custom_file from "../bootstrap/custom_file.mjs";
import custom_checkbox from "../bootstrap/custom_checkbox.mjs";
import custom_switch from "../bootstrap/custom_switch.mjs";
import custom_radio from "../bootstrap/custom_radio.mjs";
import custom_select from "../bootstrap/custom_select.mjs";
import custom_range from "../bootstrap/custom_range.mjs";
import custom_input from "../bootstrap/custom_input.mjs";

export const bootstrap = function(theme, theme_type)
{
    return [
        element('div', {
            class: 'jxp:app_section', 
            html: [
                element('div', { class: 'jxp:app_title', html: 'custom checkbox' }),
                element('div', { class: 'jxp:app_body', html: [ 
                    custom_checkbox({class: 'd-inline-block col-6'}),
                    custom_checkbox({class: 'd-inline-block col-6'},{checked: true}),
                    custom_checkbox({value: 'custom checkbox', class: 'd-inline-block col-6'}, {bgcolor: '#ffb', fgcolor: '#f37'}),
                    custom_checkbox({value: 'custom checkbox', class: 'd-inline-block col-6'}, {checked: true, bgcolor0: '#ffb', bgcolor: '#ff7', fgcolor0: '#adb5bd', fgcolor: '#f37'})
                ]})
            ]}
        ),
        element('div', {
            class: 'jxp:app_section', 
            html: [
                element('div', { class: 'jxp:app_title', html: 'custom switch' }),
                element('div', { class: 'jxp:app_body', html: [ 
                    custom_switch({class: 'd-inline-block col-6'}),
                    custom_switch({class: 'd-inline-block col-6'},{checked: true}),
                    custom_switch({label: 'custom switch', class: 'd-inline-block col-6'}, {bgcolor: '#ffb', fgcolor: '#f37'}),
                    custom_switch({label: 'custom switch', class: 'd-inline-block col-6'}, {checked: true, bgcolor0: '#ffb', bgcolor: '#ff7', fgcolor0: '#adb5bd', fgcolor: '#f37'})
                ]})
            ]}
        ),
        element('div', {
            class: 'jxp:app_section', 
            html: [
                element('div', { class: 'jxp:app_title', html: 'custom checkbox' }),
                element('div', { class: 'jxp:app_body', html: [ 
                    custom_radio({class: 'd-inline-block col-6'},{name: 'choice-one'}),
                    custom_radio({class: 'd-inline-block col-6'},{name: 'choice-one', checked: true}),
                    custom_radio({value: 'default circle mark', class: 'd-inline-block col-6'}, {name: 'choice-two', bgcolor: '#ffa', fgcolor: '#f37'}),
                    custom_radio({value: 'default circle mark', class: 'd-inline-block col-6'}, {name: 'choice-two', checked: true, bgcolor0: '#ffb', bgcolor: '#ff7', fgcolor0: '#adb5bd', fgcolor: '#f37'}),
                    custom_radio({value: 'check mark', class: 'd-inline-block col-6'}, {name: 'choice-three', mark: 'check', bgcolor: '#ffa', fgcolor: '#f37'}),
                    custom_radio({value: 'check mark', class: 'd-inline-block col-6'}, {name: 'choice-three', mark: 'check', checked: true, bgcolor0: '#ffb', bgcolor: '#ff7', fgcolor0: '#adb5bd', fgcolor: '#f37'})
                ]})
            ]}
        ),
        element('div', {
            class: 'jxp:app_section', 
            html: [
                element('div', { class: 'jxp:app_title', html: 'custom select' }),
                element('div', { class: 'jxp:app_body', html: [ 
                    custom_select([{html: 'select fruit', selected: true}, 'apple', 'banana', 'avoocado'], {class: 'my-1', name: 'fruits', onchange: function(evt) { console.log(evt.target.name + ': ' + evt.target.value); }}), 
                    custom_select([{html: 'small', selected: true}, 'normal', 'large'], {class: 'custom-select-sm my-1'}), 
                    custom_select(['small', {html: 'normal', selected: true}, 'large'], {class: 'my-1'}), 
                    custom_select(['small', 'normal', {html: 'large', selected: true}], {class: 'custom-select-lg my-1'}), 
                ] })
            ]}
        ),
        element('div', {
            class: 'jxp:app_section', 
            html: [
                element('div', { class: 'jxp:app_title', html: 'custom range' }),
                element('div', { class: 'jxp:app_body', html: [ 
                    custom_range(),
                    custom_range(null, 
                        { 
                            track_color: '#ffb', 
                            thumb_color: '#f37', 
                            track_border: '1px solid #aaa', 
                            thumb_border: '1px solid #333' 
                        }
                    ),
                    custom_range(
                        { 
                            label: 'custom range' 
                        }, 
                        {
                            track_border: '.32mm solid #aaa', 
                            onchange: function(evt)
                            {
                                console.log(evt.target.name + ': ' + evt.target.value) 
                            } 
                        }
                    ),
                    custom_range(
                        { 
                            class: 'd-inline-flex row mx-0 p-2 border rounded bg-light text-dark my-1 col-sm-4' 
                        }, 
                        { 
                            class: 'col',
                            name: 'one', 
                            value: 0, 
                            step: 0.01, 
                            max: 1.0, 
                            track_color: '#aaa',
                            thumb_color: 'var(--light)',
                            thumb_border: '.7mm solid var(--primary)',
                            // track_border: '.32mm solid #aaa',
                            onchange: function(evt) 
                            {
                                console.log(evt.target.name + ': ' + evt.target.value); 
                            } 
                        }, 
                        {
                            class: 'pr-3 my-0',
                        }
                    ),
                    custom_range(
                        { 
                            class: 'd-inline-flex row mx-0 p-2 border rounded bg-dark text-light my-1 col-sm-4' 
                        }, 
                        { 
                            class: 'col',
                            name: 'two', 
                            value: 0, 
                            step: 0.01, 
                            max: 1.0, 
                            // track_color: 'var(--light)',
                            thumb_color: 'var(--dark)',
                            // track_border: '.32mm solid #777',
                            thumb_border: '.7mm solid var(--light)',
                            onchange: function(evt) 
                            {
                                console.log(evt.target.name + ': ' + evt.target.value); 
                            } 
                        }, 
                        {
                            class: 'pr-3 my-0',
                        }
                    ),
                    custom_range(
                        { 
                            class: 'd-inline-flex row mx-0 p-2 border rounded bg-primary text-light my-1 col-sm-4' 
                        }, 
                        { 
                            class: 'col',
                            name: 'three', 
                            value: 0, 
                            step: 0.01, 
                            max: 1.0, 
                            track_color: 'var(--light)',
                            thumb_color: 'var(--dark)',
                            // track_border: '.32mm solid #777',
                            thumb_border: '.7mm solid var(--light)',
                            onchange: function(evt) 
                            {
                                console.log(evt.target.name + ': ' + evt.target.value); 
                            } 
                        }, 
                        {
                            class: 'pr-3 my-0',
                        }
                    ),
                ]})
            ]}
        ),
        element('div', {
            class: 'jxp:app_section', 
            html: [
                element('div', { class: 'jxp:app_title', html: 'custom file' }),
                element('div', { class: 'jxp:app_body', html: [ 
                    custom_file({class: 'my-1'}), 
                    custom_file({class: 'my-1'},{multiple:true},{class: 'bg-primary text-light'}), 
                    custom_file({class: 'my-1'},{multiple:true},{style: 'background-color: #ffa;'}), 
                ] })
            ]}
        ),
        element('div', {
            class: 'jxp:app_section', 
            html: [
                element('div', { class: 'jxp:app_title', html: 'custom input' }),
                element('div', { class: 'jxp:app_body', html: [ 
                    element('div', {
                        class: 'row mx-0 my-2 p-3 border rounded',
                        html: [
                            custom_input({ type: 'text', class: 'form-group col-sm p-1' }, { placeholder: 'name' }),
                            custom_input({ type: 'email', class: 'form-group col-sm p-1' }, { placeholder: 'someone@example.com' }),
                            custom_input({ type: 'date', class: 'form-group col-sm p-1' }, { placeholder: 'date' })
                        ]
                    }),
                    element('div', {
                        class: 'my-2 p-3 border rounded',
                        html: [
                            custom_input(
                                { label: 'Name', type: 'text', class: 'form-group row mx-0' }, 
                                { class: 'd-inline-block col-sm '},
                                { class: 'd-inline-block pr-2 '},
                            ),
                            custom_input(
                                { label: 'Email', type: 'email', class: 'form-group row mx-0' }, 
                                { class: 'd-inline-block col-sm', placeholder: 'someone@example.com'},
                                { class: 'd-inline-block pr-2 '},
                            ),
                            custom_input(
                                { label: 'Date', type: 'date', class: 'form-group row mx-0' }, 
                                { class: 'd-inline-block col-sm', placeholder: 'date' },
                                { class: 'd-inline-block pr-2 '},
                            ),
                        ]
                    }),
                    element('div', {
                        class: 'my-2 p-3 border rounded',
                        html: [
                            custom_input({ label: 'Name', type: 'text', class: 'form-group' }),
                            custom_input({ label: 'Search', type: 'search', class: 'form-group' }, { placeholder: 'search' }),
                            custom_input({ label: 'Password', type: 'password', class: 'form-group' }, { placeholder: 'password' }),
                            custom_input({ label: 'Number', type: 'number', class: 'form-group' }, { placeholder: 'number' }),
                            custom_input({ label: 'Email', type: 'email', class: 'form-group' }, { placeholder: 'someone@example.com' }),
                            custom_input({ label: 'Date', type: 'date', class: 'form-group' }, { placeholder: 'date' }),
                            custom_input({ label: 'Datetime-local', type: 'datetime-local', class: 'form-group' }, { placeholder: 'datetime-local' }),
                            custom_input({ label: 'Month', type: 'month', class: 'form-group' }, { placeholder: 'month' }),
                            custom_input({ label: 'Tel', type: 'tel', class: 'form-group' }, { placeholder: '+999 9999 999999' }),
                            custom_input({ label: 'Time', type: 'time', class: 'form-group' }, { placeholder: 'time' }),
                            custom_input({ label: 'Url', type: 'url', class: 'form-group' }, { placeholder: 'url' }),
                            custom_input({ label: 'Week', type: 'week', class: 'form-group' }, { placeholder: 'week' }),
                            custom_input({ label: 'Image', type: 'image', class: 'form-group' }, { class: 'w-auto', src: '/media/image/logo.png' }),
                            custom_input({ label: 'Button', type: 'button', class: 'form-group' }, { value: 'button' }),
                            custom_input({ label: 'Reset', type: 'reset', class: 'form-group' }, { value: 'reset' }),
                            custom_input({ label: 'Submit', type: 'submit', class: 'form-group' }, { value: 'submit' }),
                        ]
                    }),
                ]}),
            ]}
        ),
    ];
}

export default bootstrap;
