
import Theme      from './Theme.js';
import PageIndex  from './PageIndex.js';
import cookie     from './lib/cookie/module/cookie.js';

export class App 
{
    data = {};

    #states               = {};
    #state_load_listeners = {};
    
    #target       = null;
    #theme        = null;
    #themes       = null;
    #theme_key    = null;
    #main         = null;
    #page_index   = null;
    #page         = null;

    #theme_target         = document.head;
    #theme_scripts_target = document.body;

    #cookie_name = 'app_states';

    constructor(target, main, page_index, themes, theme_key)
    {
        if(!!target && !target instanceof Node)
            throw 'App argument `target` must be instance of `Node`.';
        if(!!main && typeof(main) != 'function')
            throw 'App argument `main` must be of type `function`.';
        if(!!page_index && !page_index instanceof PageIndex)
            throw 'App argument `page_index` must be instance of `PageIndex`.';
        if(!!themes && !themes instanceof Object)
            throw 'App argument `themes` must be instance of `Object`.';
        if(!!theme_key && typeof(theme_key) !='string')
            throw 'App argument `theme_key` must be instance of `string`.';
        const saved_states = this.load_states();
        this.#target      = !!target     ? target     : null;
        this.#main        = !!main       ? main       : null;
        this.#page_index  = !!page_index ? page_index : null;
        this.#themes      = !!themes     ? themes     : null;
        this.set_page(!!saved_states ? saved_states.page : null, false);
        this.set_theme(!!saved_states ? saved_states.theme : theme_key, false);
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
        let cookie_val = null;
        if(!!this.#states)
        {
            for(let [key, value] of Object.entries(this.#states))
            {
                if(value instanceof Object)
                {
                    for(let [subkey, subvalue] of Object.entries(value))
                    {
                        if(!cookie_val)
                            cookie_val = key+'.'+subkey+'='+subvalue;
                        else
                            cookie_val += '&'+key+'.'+subkey+'='+subvalue;
                    }
                }
                else
                {
                    if(!cookie_val)
                        cookie_val = key+'='+value;
                    else
                        cookie_val += '&'+key+'='+value;
                }
            }
        }
        cookie.set(this.#cookie_name, cookie_val);
    }

    load_states()
    {
        let cookie_val = cookie.get(this.#cookie_name);
        if(cookie_val)
        {
            let states = {};
            let usp = new URLSearchParams(cookie_val);
            for(let [key, value] of usp.entries())
            {
                if(key.indexOf('.') != -1)
                {
                    const keys    = key.split('.');
                    const page_key = keys[0];
                    const sub_key  = keys[1];
                    if(!states[page_key])
                        states[page_key] = {};
                    states[page_key][sub_key] = value;
                }
                else
                    states[key] = value;
            }
            for(let page_i of [null, this.#page])
            {
                if(!!this.#state_load_listeners[page_i])
                {
                    for(let callback of this.#state_load_listeners[page_i].callbacks)
                        callback(this, states);
                }
            }
            this.#states = states;
            return this.#states;
        }
        return null;
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
        if(this.#theme)
        {
            this.#theme.update();
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

    set_target(target, reload)
    {
        if(!!this.#target)
            this.#target.replaceChildren(null);
        this.#target = target;
        if(!!reload)
            this.reload();
    }

    set_theme(theme_key, reload)
    {
        if(!!this.#themes && !!this.#themes[theme_key])
        {
            if(!!this.#theme)
            {
                this.#theme.remove_stylesheets(this.#theme_target);
                this.#theme.remove_scripts(this.#theme_scripts_target);
                this.#theme.stop();
            }
            this.#theme_key = theme_key;
            this.#theme     = this.#themes[this.#theme_key];
            this.#theme.append_stylesheets(this.#theme_target);
            this.#theme.append_scripts(this.#theme_scripts_target);
            this.#theme.observe();
            this.set_state(null, 'theme', this.#theme_key);
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

    states()      { return this.#states; }
    target()      { return this.#target; }
    theme()       { return this.#theme; }
    themes()      { return this.#themes; }
    theme_key()   { return this.#theme_key; }
    main()        { return this.#main; }
    page_index()  { return this.#page_index; }
    page()        { return this.#page; }

};

export default App;
