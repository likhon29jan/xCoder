/// <reference types="@remix-run/cloudflare" />

import '@remix-run/cloudflare';

declare module '*?url' {
  const url: string;
  export default url;
}

declare module '*.css?url' {
  const url: string;
  export default url;
}

declare module '*.scss?url' {
  const url: string;
  export default url;
}

declare module '@unocss/reset/tailwind-compat.css?url' {
  const url: string;
  export default url;
}

declare module 'react-toastify/dist/ReactToastify.css?url' {
  const url: string;
  export default url;
}

declare module '@xterm/xterm/css/xterm.css?url' {
  const url: string;
  export default url;
}
