
import element from './html/element.js';
import Jxp     from './lib/jxp/module/Jxp.js';

export class Theme extends Jxp
{
    #id          = null;
    #name        = null;
    #stylesheets = null;
    #scripts     = null;

    append_stylesheets(target)
    {
        if(!!target && !target instanceof Node)
            throw TypeError('Theme.append_stylesheets argument `target` must be instance of `Node`.');
        if(!!target && !!this.#stylesheets && this.#stylesheets.length > 0)
        {
            let e = element('div', {
                id:   this.#id+'_stylesheets',
                html: this.#stylesheets,
            })
            target.appendChild(e);
            return e;
        }
        return null;
    }

    remove_stylesheets(target)
    {
        if(!!this.#id)
        {
            target          = !!target ? target : document;
            let stylesheets = target.querySelectorAll('#'+this.#id+'_stylesheets')
            if(!!stylesheets)
            {
                for(let stylesheet of stylesheets)
                    stylesheet.remove();
                return true;
            }
        }
        return false;
    }

    append_scripts(target)
    {
        if(!!target && !target instanceof Node)
            throw TypeError('Theme.append_scripts argument `target` must be instance of `Node`.');
        if(!!target && !!this.#scripts && this.#scripts.length > 0)
        {
            let e = element('div', {
                id:   this.#id+'_scripts',
                html: this.#scripts,
            })
            target.appendChild(e);
            return e;
        }
        return null;
    }

    remove_scripts(target)
    {
        if(!!this.#id)
        {
            target          = !!target ? target : document;
            let scripts = target.querySelectorAll('#'+this.#id+'_scripts')
            if(!!scripts)
            {
                for(let stylesheet of scripts)
                    stylesheet.remove();
                return true;
            }
        }
        return false;
    }

    constructor(name, jxp_set, stylesheets, scripts, jxp_token)
    {
        super(jxp_token);
        this.#name        = !!name ? name : 'default';
        this.#id          = this.#name+'_theme';
        this.#stylesheets = !!stylesheets ? stylesheets : null;
        this.#scripts     = !!scripts ? scripts : null;
        this.set(jxp_set);
    }

    id()          { return this.#id; }
    name()        { return this.#name; }
    stylesheets() { return this.#stylesheets; }
    scripts()     { return this.#scripts; }

};

export default Theme;
