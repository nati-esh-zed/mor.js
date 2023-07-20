
import Theme      from './Theme.js';
import PageIndex  from './PageIndex.js';
import cookie     from './lib/cookie/module/cookie.js';

export class App 
{
    data = {};

    #storages = {
        'url_search': {
            name: 'url_search',
            get: function(key) 
            {
                let usp = new URLSearchParams(location.search);
                let value = usp.get(key);
                value = !!value ? decodeURI(value) : null;
                return value;
            },
            set: function(key, value) 
            {
                let usp = new URLSearchParams(location.search);
                value = !!value ? encodeURI(value) : '';
                usp.set(key, value);
                const usp_str = '?'+usp.toString();
                window.history.replaceState(null, null, usp_str);
            },
            delete: function(key) 
            {
                let usp = new URLSearchParams(location.search);
                if(usp.has(key))
                {
                    usp.delete(key);
                    const usp_str = '?'+usp.toString();
                    window.history.replaceState(null, null, usp_str);
                    return true;
                }
                return false;
            }
        },
        'cookie': {
            name: 'cookie',
            get: function(key) 
            {
                return cookie.get(key);
            },
            set: function(key, value) 
            {
                cookie.set(key, value);
            },
            delete: function(key) 
            {
                return cookie.delete(key);
            }
        },
        'local': {
            name: 'local',
            get: function(key) 
            {
                return localStorage.getItem(key);
            },
            set: function(key, value) 
            {
                value = !!value ? value : '';
                localStorage.setItem(key, value);
            },
            delete: function(key) 
            {
                return localStorage.removeItem(key);
            }
        },
        'session': {
            name: 'session',
            get: function(key) 
            {
                return sessionStorage.getItem(key);
            },
            set: function(key, value) 
            {
                value = !!value ? value : '';
                sessionStorage.setItem(key, value);
            },
            delete: function(key) 
            {
                return sessionStorage.removeItem(key);
            }
        },
    };

    #states               = { page: null, theme: null, };
    #state_load_listeners = {};
    
    #title        = null;
    #storage      = null;
    #target       = null;
    #themes       = null;
    #theme        = null;
    #theme_ref    = null;
    #main         = null;
    #page_index   = null;
    #page         = null;

    #theme_target         = document.head;
    #theme_scripts_target = document.body;

    /**
     * 
     * @param {Node|string|object} target_or_params valid HTML Node, or query string, or object map of consrtuctor params
     * @param {string} title document.title
     * @param {function} main main function called on reload to populate the target
     * @param {PageIndex} page_index PageIndex for mapping page to function
     * @param {object} themes registry of themes
     * @param {string} theme valid key of themes
     * @param {string} storage storage key. one of App.storages() 
     * @param {object} custom_storage custom storage to add to the instance storages. 
     *  `{
     *      name:   'name', 
     *      get:    function(key){...}, 
     *      set:    function(key, value){...}, 
     *      delete: function(key){...} 
     *  }`
     */
    constructor(target_or_params, title, main, page_index, themes, theme, storage, custom_storage)
    {
        let target = null;
        if(typeof(target_or_params) == 'string')
        {
            target = target_or_params;
        }
        else if(target_or_params instanceof Node)
        {
            target = target_or_params;
        }
        else if(target_or_params instanceof Object)
        {
            target          = target_or_params.target;
            title           = target_or_params.title;
            main            = target_or_params.main;
            page_index      = target_or_params.page_index;
            themes          = target_or_params.themes;
            theme           = target_or_params.theme;
            storage         = target_or_params.storage;
            custom_storage  = target_or_params.custom_storage;
        }
        else
        {
            throw Error('App argument `target_or_params` must be either of `Node`, `string`, or `object`.'); 
        }
        if(typeof(target) == 'string')
            target = document.querySelector(target);
        if(!target)
            throw Error('App argument `target` must not be be null.');
        if(!!target && !target instanceof Node)
            throw Error('App argument `target` must be instance of `Node`.');
        if(!!title && typeof(title) !='string')
            throw Error('App argument `title` must be of type `string`.');
        if(!!main && typeof(main) != 'function')
            throw Error('App argument `main` must be of type `function`.');
        if(!!page_index && !page_index instanceof PageIndex)
            throw Error('App argument `page_index` must be instance of `PageIndex`.');
        if(!!themes && !themes instanceof Object)
            throw Error('App argument `themes` must be instance of `Object`.');
        if(!!theme && typeof(theme) !='string')
            throw Error('App argument `theme` must be of type `string`.');
        if(!!storage && typeof(storage) !='string')
            throw Error('App argument `storage` must be of type `string`.');
        if(!!custom_storage)
        {
            if(!custom_storage instanceof Object)
                throw Error('App argument `custom_storage` must be instance of `Object`.');
            if(!custom_storage['name'] || !custom_storage['get'] || !custom_storage['set'])
                throw Error('App argument `custom_storage` must have `name`, `get` and `set` defined.');
            if(typeof(custom_storage.name) != 'string')
                throw Error('App argument `custom_storage.name` must be of type `string`.');
            if(typeof(custom_storage.get) != 'function')
                throw Error('App argument `custom_storage.get` must be a `function`.');
            if(typeof(custom_storage.set) != 'function')
                throw Error('App argument `custom_storage.set` must be a `function`.');
            if(typeof(custom_storage.delete) != 'function')
                throw Error('App argument `custom_storage.delete` must be a `function`.');
            this.#storages[custom_storage.name] = custom_storage;
        }
        storage = !!storage ? storage : 'local';
        if(!this.#storages[storage])
            throw Error('App argument `storage` must be one of ')+Object.keys(this.#storages);
        this.#storage      = this.#storages[storage];
        this.#target       = !!target     ? target     : null;
        this.#main         = !!main       ? main       : null;
        this.#page_index   = !!page_index ? page_index : null;
        this.#themes       = !!themes     ? themes     : null;
        this.load_states();
        const state_title = this.get_state(null, 'title');
        const state_page  = this.get_state(null, 'page');
        const state_theme = this.get_state(null, 'theme');
        title = !!state_title ? state_title : title;
        if(!!title)
            this.set_title(title);
        this.set_page(!!state_page ? state_page : null, false);
        this.set_theme(!!state_theme ? state_theme : theme, false);
        this.add_state_load_listener(null, function(app, states)
        {
            app.set_page(app.get_state(null, 'page'), true);
            app.set_theme(app.get_state(null, 'theme'));
        });
    }

    set_state(page, state_key, state_value)
    {
        let changed = false;
        if(!!page)
        {
            if(!this.#states[page])
                this.#states[page] = {};
            changed = this.#states[page][state_key] != state_value;    
            this.#states[page][state_key] = state_value;
        }
        else
        {
            changed = this.#states[state_key] != state_value;
            this.#states[state_key] = state_value;
        }
        this.save_states();
    }

    get_state(page, state_key)
    {
        if(!!page)
        {
            if(!!this.#states[page])
            {
                return this.#states[page][state_key];
            }
        }
        else if(!!this.#states[state_key])
        {
            return this.#states[state_key];
        }
        return null;
    }

    add_state_load_listener(page, callback)
    {
        if(!!callback && typeof(callback) == 'function')
        {
            if(!this.#state_load_listeners[page])
            {
                this.#state_load_listeners[page] = {
                    page:      page,
                    callbacks: Array(),
                };
            }
            if(!!this.#state_load_listeners[page])
            {
                this.#state_load_listeners[page].callbacks.push(callback)
                return true;
            }
        }
        return false;
    }

    save_states()
    {
        if(!!this.#states)
        {
            for(let [key, value] of Object.entries(this.#states))
            {
                if(!value || typeof(value) == 'string')
                {
                    this.#storage.set(key, value);
                }
                else if(value instanceof Object)
                {
                    for(let [subkey, subvalue] of Object.entries(value))
                    {
                        this.#storage.set(key+'.'+subkey, subvalue);
                    }
                }
            }
        }
    }

    load_states()
    {
        for(let [key, value] of Object.entries(this.#states))
        {
            if(!value || typeof(value) == 'string')
            {
                let value = this.#storage.get(key);
                this.#states[key] = value;
            }
            else if(value instanceof Object)
            {
                for(let [subkey, subvalue] of Object.entries(value))
                {
                    let value = this.#storage.get(key+'.'+subkey);
                    this.#states[key][subkey] = subvalue;
                }
            }
        }
        for(let page_i of [null, this.#page])
        {
            if(!!this.#state_load_listeners[page_i])
            {
                for(let callback of this.#state_load_listeners[page_i].callbacks)
                    callback(this, this.#states);
            }
        }
        return this.#states;
    }

    clear_states_from_storage(reload)
    {
        if(!!this.#states)
        {
            for(let [key, value] of Object.entries(this.#states))
            {
                if(!value || typeof(value) == 'string')
                {
                    this.#storage.delete(key);
                }
                else if(value instanceof Object)
                {
                    for(let subkey of Object.keys(value))
                    {
                        this.#storage.delete(key+'.'+subkey);
                    }
                }
            }
        }
        if(reload)
            this.reload();
    }

    reload(...args)
    {
        if(!!this.#target)
        {
            let html = null;
            if(!!this.#main)
            {
                html = this.#main(this);
            }
            else if(!!this.#page_index)
            {
                html = this.#page_index.fetch(this.#page, false, ...args);
            }
            if(!!html)
            {
                if(html instanceof Node || html instanceof DocumentFragment)
                    this.#target.replaceChildren(html);
                else if(typeof(html) == 'string')
                    this.#target.innerHTML = html;
            }
        }
        if(this.#theme_ref)
        {
            this.#theme_ref.update();
        }
        this.save_states();
    }

    fetch_page(page, return_null_if_not_found, ...args)
    {
        if(!!this.#page_index)
        {
            page = !!page ? page : this.#page_index.default_page();
            return this.#page_index.fetch(page, return_null_if_not_found, ...args);
        }
        return null;
    }

    set_title(title)
    {
        title = !!title ? title : '';
        this.#title = title;
        document.title = title;
    }

    set_storage(storage, dont_remove_from_previous, reload)
    {
        storage = !!storage ? storage : 'local';
        if(!this.#storages[storage])
            throw Error('App argument `storage` must be one of ')+Object.keys(this.#storages);
        // check if storage is same
        if(this.#storages[storage] === this.#storage)
            return true;
        // remove the states from the previous storage
        if(!dont_remove_from_previous && !!this.#storage)
        {
            this.clear_states_from_storage(false);
        }
        this.#storage = this.#storages[storage];
        // migrate states to the new storage
        this.save_states();
        if(!!reload)
            this.reload();
        return true;
    }

    set_target(target, reload)
    {
        if(!!this.#target)
            this.#target.replaceChildren(null);
        this.#target = target;
        if(!!reload)
            this.reload();
    }

    set_theme(theme, reload)
    {
        if(!!this.#themes && !!this.#themes[theme])
        {
            if(!!this.#theme_ref)
            {
                this.#theme_ref.remove_stylesheets(this.#theme_target);
                this.#theme_ref.remove_scripts(this.#theme_scripts_target);
                this.#theme_ref.stop();
            }
            this.#theme     = theme;
            this.#theme_ref = this.#themes[this.#theme];
            this.#theme_ref.append_stylesheets(this.#theme_target);
            this.#theme_ref.append_scripts(this.#theme_scripts_target);
            this.#theme_ref.observe();
            this.set_state(null, 'theme', this.#theme);
            if(!!reload)
                this.reload();
            return true;
        }
        return false;
    }

    set_main(main, reload)
    {
        this.#main = main;
        if(!!reload)
            this.reload();
    }

    set_page_index(page_index, reload)
    {
        this.#page_index = page_index;
        if(!!reload)
            this.reload();
    }

    set_page(page, reload, ...args)
    {
        this.#page = !!page ? page : 
            (!!this.#page_index 
                ? this.#page_index.default_page() 
                : null);
        this.set_state(null, 'page', this.#page);
        if(!!reload)
            this.reload(...args);
    }

    title()       { return this.#title; }
    storages()    { return Object.keys(this.#storages); }
    storage()     { return this.#storage; }
    states()      { return this.#states; }
    target()      { return this.#target; }
    theme_ref()   { return this.#theme_ref; }
    themes()      { return this.#themes; }
    theme()       { return this.#theme; }
    main()        { return this.#main; }
    page_index()  { return this.#page_index; }
    page()        { return this.#page; }

};

export default App;
