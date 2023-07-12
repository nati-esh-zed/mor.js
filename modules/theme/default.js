
import Jxp from '/lib/jxp/module/Jxp.js';

export let default_theme = new Jxp();

export let theme_type = 'light';

// default_theme.set({
//     'dark-theme-bg':       'bg-dark',
//     'dark-theme-text':     'text-light',
//     'dark-theme-border':   'border-light',
//     'dark-theme':          '@dark-theme-bg @dark-theme-text @dark-theme-border',
//     'light-theme-bg':      'bg-light',
//     'light-theme-text':    'text-dark',
//     'light-theme-border':  '',
//     'light-theme':         '@light-theme-bg @light-theme-text @light-theme-border',
//     'theme-bg':            '@'+theme_type+'-theme-bg',
//     'theme-text':          '@'+theme_type+'-theme-text',
//     'theme-border':        '@'+theme_type+'-theme-border',
//     'theme':               '@theme-bg @theme-text @theme-border',
// });

export default default_theme;
