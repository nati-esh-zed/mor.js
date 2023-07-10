
import Jxp from '../../lib/jxp/Jxp.mjs';

let default_theme = new Jxp();

let theme_base = 'dark';

default_theme.set({
    'dark-theme-bg':       'bg-dark',
    'dark-theme-text':     'text-light',
    'dark-theme-border':   'border-light',
    'dark-theme':          '@dark-theme-bg @dark-theme-text @dark-theme-border',
    'light-theme-bg':      'bg-light',
    'light-theme-text':    'text-dark',
    'light-theme-border':  'border-dark',
    'light-theme':         '@light-theme-bg @light-theme-text @light-theme-border',
    'theme-bg':            '@'+theme_base+'-theme-bg',
    'theme-text':          '@'+theme_base+'-theme-text',
    'theme-border':        '@'+theme_base+'-theme-border',
    'theme':               '@theme-bg @theme-text @theme-border',
});

default_theme.set({
    'mvert':             'my-1',
    'body':              '@theme',
    'app_main':          '@theme container border col col-sm-8',
    'app_header':        '@theme-border row border-bottom bg-info text-light p-0',
    'app_title':         'font-weight-bold h3 py-3 px-4',
    'app_body':          'align-middle text-center rounded mx-auto p-5',
    'num-display':       'd-block text-center border border-info rounded-pill @mvert px-4 py-2',
    'button':            'btn btn-block rounded-pill @mvert px-3 py-2',
    'button-increment':  '@button btn-success',
    'button-decrement':  '@button btn-warning',
});

export default default_theme;
