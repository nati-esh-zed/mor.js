
export class cookie
{
    static set(name, value, exdays, path, domain) 
    {
        let expires = '';
        if(exdays > 0)
        {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            expires = "expires=" + d.toUTCString();
        }
        else if(exdays < 0)
        {
            const d = new Date();
            d.setTime(0);
            expires = "expires=" + d.toUTCString();
        }
        document.cookie = name + "=" 
            + ((!!value)  ? value : '')
            + ((!!path)   ? ";path="+path:"")
            + ((!!domain) ? ";domain="+domain:"")
            + ";" + expires;
    }
    
    static delete(name, path, domain) 
    {
        if(this.get(name)) 
        {
            const d = new Date();
            d.setTime(0);
            expires = "expires=" + d.toUTCString();
            document.cookie = name + '='
                + ((!!path) ? ';path='+path:'')
                + ((!!domain)?';domain='+domain:'')
                + expires;
            return true;
        }
        return false;
    }
    
    static get(name) 
    {
        let cname = name + "=";
        let ca    = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) 
        {
            let c = ca[i]; 
            while(c.charAt(0) == ' ')
            {
                c = c.substring(1);
            } 
            if(c.indexOf(name) == 0)
            {
                return c.substring(name.length, c.length); 
            } 
        } 
        return null; 
    }
};

export default cookie;
