---
title: Remix · Cloudflare Pages docs
description: Remix is a framework that focused on web standard. The framework is
  no longer recommended for new projects by the authors and its successor React
  Router should be used instead.
lastUpdated: 2025-09-26T14:28:21.000Z
chatbotDeprioritize: false
tags: Remix
source_url:
  html: https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/
  md: https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/index.md
---

[Remix](https://remix.run/) is a framework that focused on web standard. The framework is no longer recommended for new projects by the authors and its successor React Router should be used instead.

To start a new React Router project please refer to the [React Router Workers guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router).

And if you have an existing Remix application consider migrating it to React Router as described in the [official Remix upgrade documentation](https://reactrouter.com/upgrading/remix).

---
title: React Router (formerly Remix) · Cloudflare Workers docs
description: Create a React Router application and deploy it to Cloudflare Workers
lastUpdated: 2025-10-02T15:06:56.000Z
chatbotDeprioritize: false
tags: Full stack
source_url:
  html: https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/
  md: https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/index.md
---

**Start from CLI**: Scaffold a full-stack app with [React Router v7](https://reactrouter.com/) and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) for lightning-fast development.

* npm

  ```sh
  npm create cloudflare@latest -- my-react-router-app --framework=react-router
  ```

* yarn

  ```sh
  yarn create cloudflare my-react-router-app --framework=react-router
  ```

* pnpm

  ```sh
  pnpm create cloudflare@latest my-react-router-app --framework=react-router
  ```

**Or just deploy**: Create a full-stack app using React Router v7, with CI/CD and previews all set up for you.

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/react-router-starter-template)

Note

SPA mode and prerendering are not currently supported when using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/). If you wish to use React Router in an SPA then we recommend starting with the [React template](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/) and using React Router [as a library](https://reactrouter.com/start/data/installation).

## What is React Router?

[React Router v7](https://reactrouter.com/) is a full-stack React framework for building web applications. It combines with the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) to provide a first-class experience for developing, building and deploying your apps on Cloudflare.

## Creating a full-stack React Router app

1. **Create a new project with the create-cloudflare CLI (C3)**

   * npm

     ```sh
     npm create cloudflare@latest -- my-react-router-app --framework=react-router
     ```

   * yarn

     ```sh
     yarn create cloudflare my-react-router-app --framework=react-router
     ```

   * pnpm

     ```sh
     pnpm create cloudflare@latest my-react-router-app --framework=react-router
     ```

   How is this project set up?

   Below is a simplified file tree of the project.

   `react-router.config.ts` is your [React Router config file](https://reactrouter.com/explanation/special-files#react-routerconfigts). In this file:

   * `ssr` is set to `true`, meaning that your application will use server-side rendering.
   * `future.unstable_viteEnvironmentApi` is set to `true` to enable compatibility with the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

   `vite.config.ts` is your [Vite config file](https://vite.dev/config/). The React Router and Cloudflare plugins are included in the `plugins` array. The [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) runs your server code in the Workers runtime, ensuring your local development environment is as close to production as possible.

   `wrangler.jsonc` is your [Worker config file](https://developers.cloudflare.com/workers/wrangler/configuration/). In this file:

   * `main` points to `./workers/app.ts`. This is the entry file for your Worker. The default export includes a [`fetch` handler](https://developers.cloudflare.com/workers/runtime-apis/fetch/), which delegates the request to React Router.
   * If you want to add [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to resources on Cloudflare's developer platform, you configure them here.

2. **Develop locally**

   After creating your project, run the following command in your project directory to start a local development server.

   * npm

     ```sh
     npm run dev
     ```

   * yarn

     ```sh
     yarn run dev
     ```

   * pnpm

     ```sh
     pnpm run dev
     ```

   What's happening in local development?

   This project uses React Router in combination with the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/). This means that your application runs in the Cloudflare Workers runtime, just like in production, and enables access to local emulations of bindings.

3. **Deploy your project**

   Your project can be deployed to a `*.workers.dev` subdomain or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) from your own machine or from any CI/CD system, including Cloudflare's own [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/).

   The following command will build and deploy your project. If you are using CI, ensure you update your ["deploy command"](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#build-settings) configuration appropriately.

   * npm

     ```sh
     npm run deploy
     ```

   * yarn

     ```sh
     yarn run deploy
     ```

   * pnpm

     ```sh
     pnpm run deploy
     ```

## Use bindings with React Router

With bindings, your application can be fully integrated with the Cloudflare Developer Platform, giving you access to compute, storage, AI and more.

Once you have configured the bindings in the Wrangler configuration file, they are then available within `context.cloudflare` in your loader or action functions:

```ts
export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}


export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome message={loaderData.message} />;
}
```

As you have direct access to your Worker entry file (`workers/app.ts`), you can also add additional exports such as [Durable Objects](https://developers.cloudflare.com/durable-objects/) and [Workflows](https://developers.cloudflare.com/workflows/)

Example: Using Workflows

Here is an example of how to set up a simple Workflow in your Worker entry file.

```ts
import { createRequestHandler } from "react-router";
import { WorkflowEntrypoint, type WorkflowStep, type WorkflowEvent } from 'cloudflare:workers';


declare global {
  interface CloudflareEnvironment extends Env {}
}


type Env = {
  MY_WORKFLOW: Workflow;
};


export class MyWorkflow extends WorkflowEntrypoint<Env> {
  override async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
    await step.do("first step", async () => {
      return { output: "First step result" };
    });


    await step.sleep("sleep", "1 second");


    await step.do("second step", async () => {
      return { output: "Second step result" };
    });


    return "Workflow output";
  }
}


const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);


export default {
  async fetch(request, env, ctx) {
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
```

Configure it in your Wrangler configuration file:

* wrangler.jsonc

  ```jsonc
  {
    "workflows": [
      {
        "name": "my-workflow",
        "binding": "MY_WORKFLOW",
        "class_name": "MyWorkflow"
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  [[workflows]]
  name = "my-workflow"
  binding = "MY_WORKFLOW"
  class_name = "MyWorkflow"
  ```

And then use it in your application:

```ts
export async function action({ context }: Route.LoaderArgs) {
  const env = context.cloudflare.env;
  const instance = await env.MY_WORKFLOW.create({ params: { "hello": "world" })
  return { id: instance.id, details: instance.status() };
}
```

With bindings, your application can be fully integrated with the Cloudflare Developer Platform, giving you access to compute, storage, AI and more.

[Bindings ](https://developers.cloudflare.com/workers/runtime-apis/bindings/)Access to compute, storage, AI and more.
# Upgrading from Remix  | React Router
React Router v7 requires the following minimum versions:

*   `node@20`
*   `react@18`
*   `react-dom@18`

React Router v7 is the next major version of Remix after v2 (see our ["Incremental Path to React 19" blog post](https://remix.run/blog/incremental-path-to-react-19) for more information).

If you have enabled all [Remix v2 future flags](https://remix.run/docs/start/future-flags), upgrading from Remix v2 to React Router v7 mainly involves updating dependencies.

The majority of steps 2-8 can be automatically updated using a [codemod](https://codemod.com/registry/remix-2-react-router-upgrade) created by community member [James Restall](https://github.com/jrestall).

1\. Adopt future flags
----------------------

**👉 Adopt future flags**

Adopt all existing [future flags](https://remix.run/docs/start/future-flags) in your Remix v2 application.

2\. Update dependencies
-----------------------

Most of the "shared" APIs that used to be re-exported through the runtime-specific packages (`@remix-run/node`, `@remix-run/cloudflare`, etc.) have all been collapsed into `react-router` in v7. So instead of importing from `@react-router/node` or `@react-router/cloudflare`, you'll import those directly from `react-router`.

```
-import { redirect } from "@remix-run/node";
+import { redirect } from "react-router";

```


The only APIs you should be importing from the runtime-specific packages in v7 are APIs that are specific to that runtime, such as `createFileSessionStorage` for Node and `createWorkersKVSessionStorage` for Cloudflare.

**👉 Run the codemod (automated)**

You can automatically update your packages and imports with the following [codemod](https://codemod.com/registry/remix-2-react-router-upgrade). This codemod updates all of your packages and imports. Be sure to commit any pending changes before running the codemod, in case you need to revert.

```
npx codemod remix/2/react-router/upgrade

```


**👉 Install the new dependencies**

After the codemod updates your dependencies, you need to install the dependencies to remove Remix packages and add the new React Router packages.

**👉 Update your dependencies (manual)**

If you prefer not to use the codemod, you can manually update your dependencies.

Expand to see a table of package name changes in alphabetical order


|Remix v2 Package                |   |React Router v7 Package                  |
|--------------------------------|---|-----------------------------------------|
|@remix-run/architect            |➡️ |@react-router/architect                  |
|@remix-run/cloudflare           |➡️ |@react-router/cloudflare                 |
|@remix-run/dev                  |➡️ |@react-router/dev                        |
|@remix-run/express              |➡️ |@react-router/express                    |
|@remix-run/fs-routes            |➡️ |@react-router/fs-routes                  |
|@remix-run/node                 |➡️ |@react-router/node                       |
|@remix-run/react                |➡️ |react-router                             |
|@remix-run/route-config         |➡️ |@react-router/dev                        |
|@remix-run/routes-option-adapter|➡️ |@react-router/remix-routes-option-adapter|
|@remix-run/serve                |➡️ |@react-router/serve                      |
|@remix-run/server-runtime       |➡️ |react-router                             |
|@remix-run/testing              |➡️ |react-router                             |


3\. Change `scripts` in `package.json`
--------------------------------------

If you used the codemod you can skip this step as it was automatically completed.

**👉 Update the scripts in your `package.json`**


|Script   |Remix v2                         |   |React Router v7                         |
|---------|---------------------------------|---|----------------------------------------|
|dev      |remix vite:dev                   |➡️ |react-router dev                        |
|build    |remix vite:build                 |➡️ |react-router build                      |
|start    |remix-serve build/server/index.js|➡️ |react-router-serve build/server/index.js|
|typecheck|tsc                              |➡️ |react-router typegen && tsc             |


4\. Add a `routes.ts` file
--------------------------

If you used the codemod _and_ Remix v2 `v3_routeConfig` flag, you can skip this step as it was automatically completed.

In React Router v7 you define your routes using the `app/routes.ts` file. View the [routing documentation](../start/framework/routing) for more information.

**👉 Update dependencies (if using Remix v2 `v3_routeConfig` flag)**

```
-import { type RouteConfig } from "@remix-run/route-config";
-import { flatRoutes } from "@remix-run/fs-routes";
-import { remixRoutesOptionAdapter } from "@remix-run/routes-option-adapter";
+import { type RouteConfig } from "@react-router/dev/routes";
+import { flatRoutes } from "@react-router/fs-routes";
+import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";

export default [
  // however your routes are defined
] satisfies RouteConfig;

```


**👉 Add a `routes.ts` file (if _not_ using Remix v2 `v3_routeConfig` flag)**

For backwards-compatibility, there are a few ways to adopt `routes.ts` to align with your route setup in Remix v2:

1.  If you were using the "flat routes" [file-based convention](../how-to/file-route-conventions), you can continue to use that via the new `@react-router/fs-routes` package:
    
    ```
import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default flatRoutes() satisfies RouteConfig;

```

    
2.  If you were using the "nested" convention from Remix v1 via the `@remix-run/v1-route-convention` package, you can continue using that as well in conjunction with `@react-router/remix-routes-option-adapter`:
    
    ```
import { type RouteConfig } from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";
import { createRoutesFromFolders } from "@remix-run/v1-route-convention";

export default remixRoutesOptionAdapter(
  createRoutesFromFolders,
) satisfies RouteConfig;

```

    
3.  If you were using the `routes` option to define config-based routes, you can keep that config via `@react-router/remix-routes-option-adapter`:
    
    ```
import { type RouteConfig } from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";

export default remixRoutesOptionAdapter(
  (defineRoutes) => {
    return defineRoutes((route) => {
      route("/", "home/route.tsx", { index: true });
      route("about", "about/route.tsx");
      route("", "concerts/layout.tsx", () => {
        route("trending", "concerts/trending.tsx");
        route(":city", "concerts/city.tsx");
      });
    });
  },
) satisfies RouteConfig;

```

    
    *   Be sure to also remove the `routes` option in your `vite.config.ts`:
        
        ```
export default defineConfig({
  plugins: [
    remix({
      ssr: true,
-     ignoredRouteFiles: ['**/*'],
-     routes(defineRoutes) {
-       return defineRoutes((route) => {
-         route("/somewhere/cool/*", "catchall.tsx");
-       });
-     },
    })
    tsconfigPaths(),
  ],
});

```

        

5\. Add a React Router config
-----------------------------

**👉 Add `react-router.config.ts` your project**

The config that was previously passed to the `remix` plugin in `vite.config.ts` is now exported from `react-router.config.ts`.

Note: At this point you should remove the v3 future flags you added in step 1.

```
touch react-router.config.ts

```


```
export default defineConfig({
  plugins: [
-   remix({
-     ssr: true,
-     future: {/* all the v3 flags */}
-   }),
+   reactRouter(),
    tsconfigPaths(),
  ],
});

```


```
+import type { Config } from "@react-router/dev/config";
+export default {
+  ssr: true,
+} satisfies Config;

```


6\. Add React Router plugin to `vite.config`
--------------------------------------------

If you used the codemod you can skip this step as it was automatically completed.

**👉 Add `reactRouter` plugin to `vite.config`**

Change `vite.config.ts` to import and use the new `reactRouter` plugin from `@react-router/dev/vite`:

```
-import { vitePlugin as remix } from "@remix-run/dev";
+import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
-   remix(),
+   reactRouter(),
    tsconfigPaths(),
  ],
});

```


7\. Enable type safety
----------------------

If you are not using TypeScript, you can skip this step.

React Router automatically generates types for your route modules into a `.react-router/` directory at the root of your app. This directory is fully managed by React Router and should be gitignore'd. Learn more about the [new type safety features](../explanation/type-safety).

**👉 Add `.react-router/` to `.gitignore`**

```
.react-router/

```


**👉 Update `tsconfig.json`**

Update the `types` field in your `tsconfig.json` to include:

*   `.react-router/types/**/*` path in the `include` field
*   The appropriate `@react-router/*` package in the `types` field
*   `rootDirs` for simplified relative imports

```
{
  "include": [
    /* ... */
+   ".react-router/types/**/*"
  ],
  "compilerOptions": {
-   "types": ["@remix-run/node", "vite/client"],
+   "types": ["@react-router/node", "vite/client"],
    /* ... */
+   "rootDirs": [".", "./.react-router/types"]
  }
}

```


8\. Rename components in entry files
------------------------------------

If you used the codemod you can skip this step as it was automatically completed.

If you have an `entry.server.tsx` and/or an `entry.client.tsx` file in your application, you will need to update the main components in these files:

```
-import { RemixServer } from "@remix-run/react";
+import { ServerRouter } from "react-router";

-<RemixServer context={remixContext} url={request.url} />,
+<ServerRouter context={remixContext} url={request.url} />,

```


```
-import { RemixBrowser } from "@remix-run/react";
+import { HydratedRouter } from "react-router/dom";

hydrateRoot(
  document,
  <StrictMode>
-   <RemixBrowser />
+   <HydratedRouter />
  </StrictMode>,
);

```


9\. Update types for `AppLoadContext`
-------------------------------------

If you were using `remix-serve` you can skip this step. This is only applicable if you were using a custom server in Remix v2.

Since React Router can be used as both a React framework _and_ a stand-alone routing library, the `context` argument for `LoaderFunctionArgs` and `ActionFunctionArgs` is now optional and typed as `any` by default. You can register types for your load context to get type safety for your loaders and actions.

👉 **Register types for your load context**

Before you migrate to the new `Route.LoaderArgs` and `Route.ActionArgs` types, you can temporarily augment `LoaderFunctionArgs` and `ActionFunctionArgs` with your load context type to ease migration.

```
declare module "react-router" {
  // Your AppLoadContext used in v2
  interface AppLoadContext {
    whatever: string;
  }

  // TODO: remove this once we've migrated to `Route.LoaderArgs` instead for our loaders
  interface LoaderFunctionArgs {
    context: AppLoadContext;
  }

  // TODO: remove this once we've migrated to `Route.ActionArgs` instead for our actions
  interface ActionFunctionArgs {
    context: AppLoadContext;
  }
}

export {}; // necessary for TS to treat this as a module

```


Using `declare module` to register types is a standard TypeScript technique called [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation). You can do this in any TypeScript file covered by your `tsconfig.json`'s `include` field, but we recommend a dedicated `env.ts` within your app directory.

👉 **Use the new types**

Once you adopt the [new type generation](../explanation/type-safety), you can remove the `LoaderFunctionArgs`/`ActionFunctionArgs` augmentations and use the `context` argument from [`Route.LoaderArgs`](about:blank/start/framework/data-loading#server-data-loading) and [`Route.ActionArgs`](about:blank/start/framework/actions#server-actions) instead.

```
declare module "react-router" {
  // Your AppLoadContext used in v2
  interface AppLoadContext {
    whatever: string;
  }
}

export {}; // necessary for TS to treat this as a module

```

# Remix on Vercel

Remix is a fullstack, [server-rendered](#server-side-rendering-ssr) React framework. Its built-in features for nested pages, error boundaries, transitions between loading states, and more, enable developers to create modern web apps.

With Vercel, you can deploy server-rendered Remix and Remix V2 applications to Vercel with zero configuration. When using the [Remix Vite plugin](https://remix.run/docs/en/main/future/vite), static site generation using [SPA mode](https://remix.run/docs/en/main/future/spa-mode) is also supported.

It is highly recommended that your application uses the Remix Vite plugin, in conjunction with the [Vercel Preset](#vercel-vite-preset), when deploying to Vercel.

## [Getting started](#getting-started)

To get started with Remix on Vercel:

*   If you already have a project with Remix, install [Vercel CLI](/docs/cli) and run the `vercel` command from your project's root directory
*   Clone one of our Remix example repos to your favorite git provider and deploy it on Vercel with the button below:

[Deploy our Remix template, or view a live example.](/templates/remix/remix-boilerplate)

[Deploy](/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvercel%2Ftree%2Fmain%2Fexamples%2Fremix&template=remix)[Live Example](https://remix-run-template.vercel.app)

*   Or, choose a template from Vercel's marketplace:

Vercel deployments can [integrate with your git provider](/docs/git) to [generate preview URLs](/docs/deployments/environments#preview-environment-pre-production) for each pull request you make to your Remix project.

## [`@vercel/remix`](#@vercel/remix)

The [`@vercel/remix`](https://www.npmjs.com/package/@vercel/remix) package exposes useful types and utilities for Remix apps deployed on Vercel, such as:

*   [`json`](https://remix.run/docs/en/main/utils/json)
*   [`defer`](https://remix.run/docs/en/main/utils/defer)
*   [`createCookie`](https://remix.run/docs/en/main/utils/cookies#createcookie)

To best experience Vercel features such as [streaming](#response-streaming), [Vercel Functions](#vercel-functions), and more, we recommend importing utilities from `@vercel/remix` rather than from standard Remix packages such as `@remix-run/node`.

`@vercel/remix` should be used anywhere in your code that you normally would import utility functions from the following packages:

*   [`@remix-run/node`](https://www.npmjs.com/package/@remix-run/node)
*   [`@remix-run/cloudflare`](https://www.npmjs.com/package/@remix-run/cloudflare)
*   [`@remix-run/server-runtime`](https://www.npmjs.com/package/@remix-run/server-runtime)

To get started, navigate to the root directory of your Remix project with your terminal and install `@vercel/remix` with your preferred package manager:

pnpmyarnnpmbun

```
pnpm i @vercel/remix
```

## [Vercel Vite Preset](#vercel-vite-preset)

When using the [Remix Vite plugin](https://remix.run/docs/en/main/future/vite) (highly recommended), you should configure the Vercel Preset to enable the full feature set that Vercel offers.

To configure the Preset, add the following lines to your `vite.config` file:

/vite.config.ts

```
import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vercelPreset } from '@vercel/remix/vite';
 
installGlobals();
 
export default defineConfig({
  plugins: [
    remix({
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
  ],
});
```

Using this Preset enables Vercel-specific functionality such as rendering your Remix application with Vercel Functions.

## [Server-Side Rendering (SSR)](#server-side-rendering-ssr)

Server-Side Rendering (SSR) allows you to render pages dynamically on the server. This is useful for pages where the rendered data needs to be unique on every request. For example, checking authentication or looking at the location of an incoming request.

Remix routes defined in `app/routes` are deployed with server-side rendering by default.

The following example demonstrates a basic route that renders with SSR:

/app/routes/\_index.tsx

TypeScript

TypeScriptJavaScript

```
export default function IndexRoute() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>This route is rendered on the server</h1>
    </div>
  );
}
```

### [Vercel Functions](#vercel-functions)

Vercel Functions execute using Node.js. They enable developers to write functions that use resources that scale up and down based on traffic demands. This prevents them from failing during peak hours, but keeps them from running up high costs during periods of low activity.

Remix API routes in `app/routes` are deployed as Vercel Functions by default.

The following example demonstrates a basic route that renders a page with the heading, "Welcome to Remix with Vercel":

/app/routes/serverless-example.tsx

TypeScript

TypeScriptJavaScript

```
export default function Serverless() {
  return <h1>Welcome to Remix with Vercel</h1>;
}
```

To summarize, Server-Side Rendering (SSR) with Remix on Vercel:

*   Scales to zero when not in use
*   Scales automatically with traffic increases
*   Has framework-aware infrastructure to generate Vercel Functions

## [Response streaming](#response-streaming)

[Streaming HTTP responses](/docs/functions/streaming-functions)

with Remix on Vercel is supported with Vercel Functions. See the [Streaming](https://remix.run/docs/en/main/guides/streaming) page in the Remix docs for general instructions.

The following example demonstrates a route that simulates a throttled network by delaying a promise's result, and renders a loading state until the promise is resolved:

/app/routes/defer-route.tsx

TypeScript

TypeScriptJavaScript

```
import { Suspense } from 'react';
import { Await, useLoaderData } from '@remix-run/react';
import { defer } from '@vercel/remix';
 
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
 
export async function loader({ request }) {
  const version = process.versions.node;
 
  return defer({
    // Don't let the promise resolve for 1 second
    version: sleep(1000).then(() => version),
  });
}
 
export default function DeferredRoute() {
  const { version } = useLoaderData();
 
  return (
    <Suspense fallback={'Loading…'}>
      <Await resolve={version}>{(version) => <strong>{version}</strong>}</Await>
    </Suspense>
  );
}
```

To summarize, Streaming with Remix on Vercel:

*   Offers faster Function response times, improving your app's user experience
*   Allows you to return large amounts of data without exceeding Vercel Function response size limits
*   Allows you to display Instant Loading UI from the server with Remix's `defer()` and `Await`

[Learn more about Streaming](/docs/functions/streaming-functions)

## [`Cache-Control` headers](#cache-control-headers)

Vercel's [CDN](/docs/cdn) caches your content at the edge in order to serve data to your users as fast as possible. [Static caching](/docs/edge-cache#static-files-caching) works with zero configuration.

By adding a `Cache-Control` header to responses returned by your Remix routes, you can specify a set of caching rules for both client (browser) requests and server responses. A cache must obey the requirements defined in the Cache-Control header.

Remix supports header modifications with the [`headers`](https://remix.run/docs/en/main/route/headers) function, which you can export in your routes defined in `app/routes`.

The following example demonstrates a route that adds `Cache Control` headers which instruct the route to:

*   Return cached content for requests repeated within 1 second without revalidating the content
*   For requests repeated after 1 second, but before 60 seconds have passed, return the cached content and mark it as stale. The stale content will be revalidated in the background with a fresh value from your [`loader`](https://remix.run/docs/en/1.14.0/route/loader) function

/app/routes/example.tsx

TypeScript

TypeScriptJavaScript

```
import type { HeadersFunction } from '@vercel/remix';
 
export const headers: HeadersFunction = () => ({
  'Cache-Control': 's-maxage=1, stale-while-revalidate=59',
});
 
export async function loader() {
  // Fetch data necessary to render content
}
```

See [our docs on cache limits](/docs/edge-cache#limits) to learn the max size and lifetime of caches stored on Vercel.

To summarize, using `Cache-Control` headers with Remix on Vercel:

*   Allow you to cache responses for server-rendered Remix apps using Vercel Functions
*   Allow you to serve content from the cache _while updating the cache in the background_ with `stale-while-revalidate`

[Learn more about caching](/docs/edge-cache#how-to-cache-responses)

## [Analytics](#analytics)

Vercel's Analytics features enable you to visualize and monitor your application's performance over time. The Analytics tab in your project's dashboard offers detailed insights into your website's visitors, with metrics like top pages, top referrers, and user demographics.

To use Analytics, navigate to the Analytics tab of your project dashboard on Vercel and select Enable in the modal that appears.

To track visitors and page views, we recommend first installing our `@vercel/analytics` package by running the terminal command below in the root directory of your Remix project:

pnpmyarnnpmbun

```
pnpm i @vercel/analytics
```

Then, follow the instructions below to add the `Analytics` component to your app. The `Analytics` component is a wrapper around Vercel's tracking script, offering a seamless integration with Remix.

Add the following component to your `root` file:

app/root.tsx

TypeScript

TypeScriptJavaScript

```
import { Analytics } from '@vercel/analytics/react';
 
export default function App() {
  return (
    <html lang="en">
      <body>
        <Analytics />
      </body>
    </html>
  );
}
```

To summarize, Analytics with Remix on Vercel:

*   Enables you to track traffic and see your top-performing pages
*   Offers you detailed breakdowns of visitor demographics, including their OS, browser, geolocation and more

[Learn more about Analytics](/docs/analytics)

## [Using a custom `app/entry.server` file](#using-a-custom-app/entry.server-file)

By default, Vercel supplies an implementation of the `entry.server` file which is configured for streaming to work with Vercel Functions. This version will be used when no `entry.server` file is found in the project, or when the existing `entry.server` file has not been modified from the base Remix template.

However, if your application requires a customized `app/entry.server.jsx` or `app/entry.server.tsx` file (for example, to wrap the `<RemixServer>` component with a React context), you should base it off of this template:

/app/entry.server.tsx

TypeScript

TypeScriptJavaScript

```
import { RemixServer } from '@remix-run/react';
import { handleRequest, type EntryContext } from '@vercel/remix';
 
export default async function (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  let remixServer = <RemixServer context={remixContext} url={request.url} />;
  return handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixServer,
  );
}
```

## [Using a custom `server` file](#using-a-custom-server-file)

Defining a custom `server` file is not supported when using the Remix Vite plugin on Vercel.

It's usually not necessary to define a custom server.js file within your Remix application when deploying to Vercel. In general, we do not recommend it.

If your project requires a custom [`server`](https://remix.run/docs/en/main/file-conventions/remix-config#md-server) file, you will need to [install `@vercel/remix`](#@vercel/remix) and import `createRequestHandler` from `@vercel/remix/server`. The following example demonstrates a basic `server.js` file:

server.ts

TypeScript

TypeScriptJavaScript

```
import { createRequestHandler } from '@vercel/remix/server';
import * as build from '@remix-run/dev/server-build';
 
export default createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext() {
    return {
      nodeLoadContext: true,
    };
  },
});
```

## [More benefits](#more-benefits)

See [our Frameworks documentation page](/docs/frameworks) to learn about the benefits available to all frameworks when you deploy on Vercel.

## [More resources](#more-resources)

Learn more about deploying Remix projects on Vercel with the following resources:

*   [Explore Remix in a monorepo](/templates/remix/turborepo-kitchensink)
*   [Deploy our Product Roadmap template](/templates/remix/roadmap-voting-app-rowy)
*   [Explore the Remix docs](https://remix.run/docs/en/main)
```
import type { Route } from "./+types/my-route";

export function loader({ context }: Route.LoaderArgs) {}
// { whatever: string }  ^^^^^^^

export function action({ context }: Route.ActionArgs) {}
// { whatever: string }  ^^^^^^^

```


Congratulations! You are now on React Router v7. Go ahead and run your application to make sure everything is working as expected.
---
title: "Remix on Netlify"
description: "Learn about Remix on our platform. Create a new Remix app or update the deploy target for an existing Remix app."
---

Remix gives you a server and browser runtime that focuses on performance and excellent user experiences. With Remix, you get a number of built-in tools to build better websites, such as nested routes, parallel data requests, and robust built-in error handling.

## Key features

These features provide important benefits for Remix projects, including those built by and deployed with Netlify.

- **Nested routes.** By default, Remix creates routes for components that serve as boundaries for data loading and code splitting.
- **Parallel data requests by default.** Instead of waiting on sequential requests, Remix processes requests in parallel and then sends a complete HTML document.
- **Built-in global error handling.** Remix has built-in error handling for server and client rendering and server side data handling. Error boundaries don't block the entire page from rendering, only the affected component.

## Netlify integration

You can create a Remix app and deploy it on Netlify using the Netlify starter template for Remix with the command `npx create-remix@latest --template netlify/remix-template`. This template automatically creates everything you need to deploy to Netlify - including a pre-configured `netlify.toml` file with [typical build settings](/build/frameworks/overview#remix).

### Create a new Remix app to deploy to Netlify

You can use the command line to scaffold a new project based on the Netlify starter template for Remix. This can streamline the process of getting your project up and running.

1. In your terminal, run `npx create-remix@latest --template netlify/remix-template`.
2. Choose where you want to create your project.
3. Decide whether you want to use TypeScript or JavaScript.
4. Enter **Y** to have `create-remix` run `npm install` for your project.
5. Choose whether you want to run your app with functions or [edge functions](#edge-functions).
6. Follow the starter template README to get your project running.

### Update the deploy target for an existing Remix app

If you have an existing Remix project that isn't deployed on Netlify and you want to change the deploy target to Netlify, you need to create a new Remix project.

1. Create a [new Remix project](#create-a-new-remix-app-to-deploy-to-netlify) with Netlify as the deploy target.
2. Replace the new project's `app` directory with the `app` directory from your old project.

#### Manual configuration

Alternatively, you can configure this manually.

First, ensure you're using Remix Vite. If not, [follow this
guide](https://developers.netlify.com/guides/how-to-deploy-remix-vite-to-netlify/).

Then, install Netlify's Remix adapter and add its Vite plugin to your Vite config:

```bash
npm install --save-dev @netlify/remix-adapter
```

### Tabs Component:

<TabItem label="vite.config.ts">

```typescript
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// ↓ add this
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    netlifyPlugin() // ← add this
  ]
});
```

</TabItem>

<TabItem label="vite.config.js">

```js
import { vitePlugin as remix } from "@remix-run/dev";
// ↓ add this
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";

export default {
  plugins: [
    remix(),
    netlifyPlugin() // ← add this
  ]
};
```

</TabItem>

### Edge Functions

[Edge Functions](/build/edge-functions/overview) connect the Netlify platform and workflow with an open runtime standard at the network edge. This enables you to build fast, personalized web experiences with an ecosystem of development tools, including Remix.

To take advantage of Netlify Edge Functions with Remix, follow the steps above to [create a new Remix app to deploy on Netlify](#create-a-new-remix-app-to-deploy-to-netlify). When the CLI prompts you to select the type of functions to run your Remix app with, select **Netlify Edge Functions**.

## More resources

- [Typical Remix build settings](/build/frameworks/overview#remix)
- [Netlify starter template for Remix](https://github.com/netlify/remix-template)
- [Deploy Remix to Netlify](https://remix.run/docs/en/main/guides/deployment#netlify)
- [Developer guide: build a high-performance Remix image component with Unpic and Netlify Image CDN](https://developers.netlify.com/guides/build-a-remix-image-component-with-unpic-netlify-image-cdn/)
- [Remix docs about HTTP handlers and adapters](https://remix.run/docs/en/v1/pages/technical-explanation#http-handler-and-adapters)
