
import html  from '../html/html.js';
import Theme from '../Theme.js';

export const themes = {
    default: new Theme('default', 
        {
            'html': 'h-100',
            'body': 'h-100 bg-body',
            'main': 'h-100 bg-main p-1 center',
            'greeting': 'h3 p-4 mx-auto text-center bg-primary text-light border-md rounded-pill shadow anim-greeting',
        },
        [
            html.style({
                html: `
                    .center {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 200px;
                    }
                    .bg-body {
                        background-color: rgb(37 89 169);
                        background-image: linear-gradient(to bottom left, rgb(25 3 104), rgb(207 117 12));
                        background-attachment: fixed;
                    }
                    .border-md {
                        border: 1.5mm solid #fff; 
                    }
                    @keyframes kf-bounce {
                        0%, 20%, 60%, 90%, 100% { transform: scaleX(1.05) translateY(0); } 
                        45%  { transform: scaleX(1) translateY(-15mm); } 
                        70%  { transform: scaleX(1) translateY(-1mm); } 
                    }
                    .anim-greeting {
                        animation-name: kf-bounce;
                        animation-duration: 1s;
                        animation-timing-function: ease;
                        animation-iteration-count: infinite;
                    }
                `
            })
        ])
};

export default themes;
