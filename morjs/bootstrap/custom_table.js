
import element from "../html/element.js";

export const custom_table = function(table_data, table_params, thead_params, tbody_params, tr_params, th_params, td_params)
{
    if(!table_params)
        table_params = {};
    if(!thead_params)
        thead_params = {};
    if(!tbody_params)
        tbody_params = {};
    if(!tr_params)
        tr_params = {};
    if(!th_params)
        th_params = {};
    if(!td_params)
        td_params = {};
    table_params.class = 'table ' + (!!table_params.class ? table_params.class : '');
    // thead_params.class = '' + (!!thead_params.class ? thead_params.class : '');
    // tbody_params.class = '' + (!!tbody_params.class ? tbody_params.class : '');
    // tr_params.class    = '' + (!!tr_params.class ? tr_params.class : '');
    // th_params.class    = '' + (!!th_params.class ? th_params.class : '');
    // td_params.class    = '' + (!!td_params.class ? td_params.class : '');
    let thead = Array();
    for(let header of table_data.header)
    {
        th_params.scope = !!th_params.scope ? th_params.scope : 'col';
        th_params.html = header;
        thead.push(element('th', th_params))
    }
    tr_params.html = thead;
    let thead_html = element('tr', tr_params);
    let tbody_html = Array();
    for(let row of table_data.rows)
    {
        let col_i = 0;
        let row_e = Array();
        if(row instanceof Array)
        {
            for(let value of row)
            {
                if(col_i++ == 0)
                {
                    th_params.scope = !!th_params.scope ? th_params.scope : 'row';
                    th_params.html  = value;
                    row_e.push(element('th', th_params))
                }
                else
                {
                    td_params.html  = value;
                    row_e.push(element('td', td_params))
                }
            }
        }
        else
        {
            for(let value of Object.values(row))
            {
                if(col_i++ == 0)
                {
                    th_params.scope = !!th_params.scope ? th_params.scope : 'row';
                    th_params.html  = value;
                    row_e.push(element('th', th_params))
                }
                else
                {
                    td_params.html  = value;
                    row_e.push(element('td', td_params))
                }
            }
        }
        tr_params.html = row_e;
        tbody_html.push(element('tr', tr_params));
    }
    thead_params.html = thead_html;
    tbody_params.html = tbody_html;
    table_params.html = [
        element('thead', thead_params),
        element('tbody', tbody_params),
    ];
    let e  = element('table', table_params);
    return e;
};

export default custom_table;
