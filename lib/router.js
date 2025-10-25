import { lazy } from 'alemonjs';

var response = defineResponse([
    {
        regular: /^(#|\/)?ai(-)?(help|帮助)/i,
        handler: lazy(() => import('./response/help/res.js'))
    },
    {
        regular: /^(#|\/)ai/,
        handler: lazy(() => import('./response/api/res.js'))
    },
    {
        regular: /^(#|\/)ai-clear/,
        handler: lazy(() => import('./response/clear/res.js'))
    },
    {
        regular: /^(#|\/)ai-set/,
        handler: lazy(() => import('./response/set/res.js'))
    }
]);

export { response as default };
