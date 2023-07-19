
export const R = {
    'en': {
        title: 'mor.js app',
    },
    langs: ['en'],
    get: function(key)
    {
        return R[document.documentElement.lang][key];
    }
};

export default R;
