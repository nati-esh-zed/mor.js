

const base_url = window.location.origin + window.location.pathname;

export const navindex = [
    {'name': 'home',      'href': base_url + '?page=home'},
    {'name': 'app',       'href': base_url + '?page=app'},
    {'name': 'bootstrap', 'href': base_url + '?page=bootstrap'},
    {'name': 'about',     'href': base_url + '?page=about'},
];

export default navindex;
