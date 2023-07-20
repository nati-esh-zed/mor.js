
export const R = {
    'en': {
        title: 'mor.js app',
    },

    langs: ['en'],
    get: function(key, lang)
    {
        lang = !!lang ? lang 
            : (!!document.documentElement.lang
                ? document.documentElement.lang
                : R.langs[0]);
        if(!R[lang])
            throw 'R.get(...): `lang` parameter; language not supported.';
        return R[lang][key];
    }
};

export default R;
