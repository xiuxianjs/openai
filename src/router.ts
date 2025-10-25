import { lazy } from 'alemonjs';

export default defineResponse([
  {
    regular: /^(#|\/)?ai(-)?(help|帮助)/i,
    handler: lazy(() => import('@src/response/help/res'))
  },
  {
    regular: /^(#|\/)ai/,
    handler: lazy(() => import('@src/response/api/res'))
  },
  {
    regular: /^(#|\/)ai-clear/,
    handler: lazy(() => import('@src/response/clear/res'))
  },
  {
    regular: /^(#|\/)ai-set/,
    handler: lazy(() => import('@src/response/set/res'))
  }
]);
