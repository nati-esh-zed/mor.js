
import element from "./html/element.mjs";

export const stylesheet = function()
{
    return element('style', {
        html: `
        .rounded-md { border-radius: .32em; }
        .bg-slate { background-color: slategray !important; }
        .bg-lightgray { background-color: whitesmoke !important; }

        .bg-body-light { background-color: #818a90 !important; }
        .bg-1-light    { background-color: #dadada !important; }
        .bg-2-light    { background-color: #f1f1f1 !important; }
        .bg-3-light    { background-color: #ddd !important; }
        .bg-4-light    { background-color: whitesmoke !important; }
        .bg-5-light    { background-color: #fefefe !important; }
        .fg-1-light    { color: #777 !important; }
        .fg-2-light    { color: #333 !important; }
        .fg-3-light    { color: #333 !important; }
        .fg-4-light    { color: #555 !important; }
        .fg-5-light    { color: #555 !important; }

        .bg-body-dark  { background-color: #111 !important; }
        .bg-1-dark     { background-color: #676767 !important; }
        .bg-2-dark     { background-color: #444 !important; }
        .bg-3-dark     { background-color: dimgrey !important; }
        .bg-4-dark     { background-color: #232323 !important; }
        .bg-5-dark     { background-color: #333 !important; }
        .fg-1-dark     { color: #fff !important; }
        .fg-2-dark     { color: #fff !important; }
        .fg-3-dark     { color: #eee !important; }
        .fg-4-dark     { color: #eee !important; }
        .fg-5-dark     { color: #ddd !important; }
        
        .w-fill {
            width: 100%;
            width: -moz-available;
            width: -webkit-fill-available;
            width: fill-available;
        }
        .h-fill {
            height: 100%;
            height: -moz-available;
            height: -webkit-fill-available;
            height: fill-available;
        }
        .fill {
            width: 100%;
            width: -moz-available;
            width: -webkit-fill-available;
            width: fill-available;
            height: 100%;
            height: -moz-available;
            height: -webkit-fill-available;
            height: fill-available;
        }
        `
    });
};

export default stylesheet;
