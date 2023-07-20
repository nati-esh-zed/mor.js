
export const R = {
    'en': {
        title:    'mor.js app/hello_world',
        greeting: 'Hello world!',
    },

    langs: ['en'],
    get: function(key, lang)
    {
        lang = !!lang ? lang 
            : (!!document.documentElement.lang
                ? document.documentElement.lang
                : R.langs[0]);
        if(!R[lang])
            throw Error('R.get(...): `lang` parameter; language not supported.');
        let value = R[lang][key];
        if(!value)
            throw Error('R.get(...): `key` not found. \''+key+'\'');
        return value;
    }
};

export default R;
