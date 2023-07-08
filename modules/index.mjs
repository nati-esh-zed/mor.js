
import fragment from './html/fragment.mjs'; 
import element from './html/element.mjs'; 
import header from './header.mjs';
import navbar from './navbar.mjs';
import main from './main.mjs';

const index = function()
{
    return fragment([
        header('Experiment'),
        navbar(),
        main(),
    ]);
};

export default index;

