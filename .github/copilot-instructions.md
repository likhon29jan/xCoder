# Copilot Instructions for xCoder

## Project Overview
xCoder is an AI-powered web development agent that enables full-stack application development directly in the browser using StackBlitz's WebContainers. This project integrates cutting-edge AI models with an in-browser development environment to provide complete control over the filesystem, Node.js server, package manager, terminal, and browser console.

## Code Style and Standards

▲ AI Elements
A command-line interface for installing AI Elements components - a component library built on top of shadcn/ui to help you build AI-native applications faster.

Overview
AI Elements provides pre-built, customizable React components specifically designed for AI applications, including conversations, messages, code blocks, reasoning displays, and more. The CLI makes it easy to add these components to your Next.js project.

Installation
You can use the AI Elements CLI directly with npx, or install it globally:

# Use directly (recommended)
npx ai-elements@latest

# Or using shadcn cli
npx shadcn@latest add https://registry.ai-sdk.dev/registry.json
Prerequisites
Before using AI Elements, ensure your project meets these requirements:

Node.js 18 or later
Next.js project with AI SDK installed
shadcn/ui initialized in your project (npx shadcn@latest init)
Tailwind CSS configured (AI Elements supports CSS Variables mode only)
Usage
Install All Components
Install all available AI Elements components at once:

npx ai-elements@latest
This command will:

Set up shadcn/ui if not already configured
Install all AI Elements components to your configured components directory
Add necessary dependencies to your project
Install Specific Components
Install individual components using the add command:

npx ai-elements@latest add <component-name>
Examples:

# Install the message component
npx ai-elements@latest add message

# Install the conversation component
npx ai-elements@latest add conversation

# Install the code-block component
npx ai-elements@latest add code-block
Alternative: Use with shadcn CLI
You can also install components using the standard shadcn/ui CLI:

# Install all components
npx shadcn@latest add https://registry.ai-sdk.dev/registry.json

# Install a specific component
npx shadcn@latest add https://registry.ai-sdk.dev/message.json
Available Components
AI Elements includes the following components:

Component	Description
actions	Interactive action buttons for AI responses
branch	Branch visualization for conversation flows
code-block	Syntax-highlighted code display with copy functionality
conversation	Container for chat conversations
image	AI-generated image display component
inline-citation	Inline source citations
loader	Loading states for AI operations
message	Individual chat messages with avatars
prompt-form	Controlled form wrapper for prompt submission
prompt-input	Advanced input component with model selection
prompt-input-attachments	Opt-in file/image attachments for prompt input
reasoning	Display AI reasoning and thought processes
response	Formatted AI response display
source	Source attribution component
suggestion	Quick action suggestions
task	Task completion tracking
tool	Tool usage visualization
web-preview	Embedded web page previews
Quick Start Example
After installing components, you can use them in your React application:

'use client';

import { useChat } from '@ai-sdk/react';
import {
  Conversation,
  ConversationContent,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
} from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';

export default function Chat() {
  const { messages } = useChat();

  return (
    <Conversation>
      <ConversationContent>
        {messages.map((message, index) => (
          <Message key={index} from={message.role}>
            <MessageContent>
              <Response>{message.content}</Response>
            </MessageContent>
          </Message>
        ))}
      </ConversationContent>
    </Conversation>
  );
}
How It Works
The AI Elements CLI:

Detects your package manager (npm, pnpm, yarn, or bun) automatically
Fetches component registry from https://registry.ai-sdk.dev/registry.json
Installs components using the shadcn/ui CLI under the hood
Adds dependencies and integrates with your existing shadcn/ui setup
Components are installed to your configured shadcn/ui components directory (typically @/components/ai-elements/) and become part of your codebase, allowing for full customization.

Configuration
AI Elements uses your existing shadcn/ui configuration. Components will be installed to the directory specified in your components.json file.

### General Principles
- Write clean, maintainable, and self-documenting code
- Follow functional programming principles where applicable
- Prefer composition over inheritance
- Keep functions small and focused on a single responsibility
- Use descriptive variable and function names that clearly indicate purpose

### TypeScript/JavaScript Standards
- Use TypeScript for all new code with strict mode enabled
- Prefer `const` over `let`, avoid `var`
- Use async/await over promises chains for better readability
- Implement proper error handling with try-catch blocks
- Use ES6+ features: destructuring, spread operators, arrow functions
- Add JSDoc comments for complex functions and public APIs
- Use meaningful type annotations - avoid `any` type unless absolutely necessary

### React Best Practices
- Use functional components with hooks
- Keep components small and focused (under 200 lines)
- Extract custom hooks for reusable logic
- Use proper prop typing with TypeScript interfaces
- Implement proper error boundaries for error handling
- Optimize re-renders using React.memo, useMemo, and useCallback when necessary
- Follow the hooks rules strictly (only call at top level, only in React functions)

### File Structure
- Organize files by feature, not by type
- Keep related files close together
- Use index files for clean exports
- Name files using kebab-case for components: `my-component.tsx`
- Use descriptive folder names that indicate the feature or domain

## Architecture Patterns

### WebContainer Integration
- Always handle WebContainer operations asynchronously
- Implement proper error handling for filesystem operations
- Clean up resources when components unmount
- Use streaming for terminal output to provide real-time feedback
- Handle process lifecycle correctly (spawn, monitor, terminate)

### State Management
- Use React Context for global state when appropriate
- Consider Zustand or similar lightweight solutions for complex state
- Keep state as local as possible
- Lift state only when necessary for sharing between components
- Document state flow for complex features

### API Integration
- Create dedicated API service files for external integrations
- Implement proper error handling and retry logic
- Use environment variables for API keys and configuration
- Add request/response logging for debugging
- Implement rate limiting awareness

## Testing Guidelines

### Unit Tests
- Write tests for all business logic and utilities
- Aim for high coverage on critical paths
- Use descriptive test names that explain what is being tested
- Follow AAA pattern: Arrange, Act, Assert
- Mock external dependencies appropriately

### Integration Tests
- Test component interactions and data flow
- Test WebContainer operations in isolated environments
- Verify terminal output and filesystem changes

### Testing Tools
- Use Jest for unit testing
- Use React Testing Library for component tests
- Consider Playwright for E2E tests

## AI Model Integration

### Prompt Engineering
- Design clear, specific prompts for AI models
- Include relevant context from the codebase
- Implement fallback behavior for AI failures
- Add rate limiting and cost controls
- Log AI interactions for debugging and improvement

### Model Selection
- Choose appropriate models based on task complexity
- Consider response time and cost tradeoffs
- Implement model switching based on user preferences
- Cache responses where appropriate to reduce costs

## Security Considerations

### Input Validation
- Sanitize all user inputs before processing
- Validate file paths to prevent directory traversal
- Implement Content Security Policy (CSP)
- Escape user-generated content before rendering

### Authentication & Authorization
- Implement secure authentication flows
- Use environment variables for sensitive data
- Never commit secrets to version control
- Implement proper session management

### WebContainer Security
- Limit resource usage (CPU, memory, filesystem)
- Implement sandboxing for user code execution
- Validate all packages before installation
- Monitor for suspicious activities

## Performance Optimization

### General Guidelines
- Implement code splitting for large applications
- Use lazy loading for routes and heavy components
- Optimize bundle size by analyzing with webpack-bundle-analyzer
- Implement proper caching strategies
- Monitor and optimize Core Web Vitals

### WebContainer Performance
- Minimize filesystem operations
- Batch operations when possible
- Implement proper cleanup to prevent memory leaks
- Monitor resource usage and set limits

## Error Handling

### User-Facing Errors
- Provide clear, actionable error messages
- Avoid technical jargon in user messages
- Suggest solutions when possible
- Log detailed errors for debugging

### Developer Errors
- Use structured logging with appropriate levels
- Include context in error messages
- Implement error tracking (Sentry, LogRocket, etc.)
- Create specific error classes for different error types

## Documentation Standards

### Code Comments
- Write self-documenting code first
- Add comments only for complex logic or non-obvious decisions
- Keep comments up-to-date with code changes
- Use JSDoc for public APIs

### README and Docs
- Keep README concise and focused on getting started
- Document architecture decisions in ADR format
- Maintain API documentation
- Include examples and use cases
- Document environment setup and dependencies

## Git Workflow

### Commit Messages
- Use conventional commits format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore
- Write clear, concise commit messages
- Reference issues in commit messages

### Branch Strategy
- Use feature branches for new development
- Keep branches short-lived
- Rebase feature branches before merging
- Delete branches after merging

### Pull Requests
- Write descriptive PR titles and descriptions
- Include screenshots for UI changes
- Link related issues
- Request reviews from appropriate team members
- Ensure CI passes before merging

## Specific Features

### Terminal Integration
- Provide real-time output streaming
- Support ANSI color codes
- Implement command history
- Handle long-running processes gracefully
- Provide clear visual feedback for process status

### File System Operations
- Use virtual filesystem efficiently
- Implement file watching for live updates
- Support drag-and-drop for file uploads
- Provide clear feedback for filesystem operations
- Implement undo/redo where appropriate

### Package Management
- Support npm, pnpm, and yarn
- Show installation progress
- Handle dependency conflicts gracefully
- Cache packages when possible
- Validate package.json before operations

### Code Editor
- Implement syntax highlighting for all major languages
- Provide code completion and IntelliSense
- Support multiple file tabs
- Implement find and replace functionality
- Add keyboard shortcuts for common operations

## Deployment and CI/CD

### Build Process
- Optimize production builds
- Minimize bundle size
- Generate source maps for debugging
- Run tests before deployment
- Use environment-specific configurations

### Continuous Integration
- Run tests on all PRs
- Perform linting and type checking
- Build and verify bundles
- Run security audits
- Generate test coverage reports

## Accessibility (a11y)

### Standards
- Follow WCAG 2.1 AA guidelines
- Implement proper ARIA labels
- Ensure keyboard navigation works everywhere
- Provide text alternatives for non-text content
- Test with screen readers

### Best Practices
- Use semantic HTML elements
- Maintain proper heading hierarchy
- Ensure sufficient color contrast
- Make interactive elements keyboard accessible
- Provide clear focus indicators

## Browser Compatibility
- Support modern browsers (Chrome, Firefox, Safari, Edge)
- Test on different screen sizes and devices
- Implement progressive enhancement
- Provide fallbacks for unsupported features
- Use feature detection, not browser detection

## Code Review Guidelines

### What to Look For
- Code correctness and logic errors
- Performance implications
- Security vulnerabilities
- Test coverage
- Documentation completeness
- Adherence to coding standards

### Review Etiquette
- Be constructive and respectful
- Explain the "why" behind suggestions
- Distinguish between required changes and suggestions
- Approve PRs promptly when ready
- Ask questions if something is unclear

## Troubleshooting Common Issues

### WebContainer Issues
- Check browser compatibility (requires SharedArrayBuffer)
- Verify CORS headers are properly configured
- Check for memory leaks in long-running processes
- Monitor filesystem quota usage

### Performance Issues
- Profile with browser DevTools
- Check for unnecessary re-renders
- Analyze bundle size
- Monitor WebContainer resource usage
- Check network requests

### Build Issues
- Clear node_modules and reinstall
- Check for version conflicts
- Verify environment variables
- Check TypeScript configuration
- Review webpack/vite configuration

## Resources and References
- WebContainer API Documentation: https://webcontainers.io
- React Documentation: https://react.dev
- TypeScript Documentation: https://www.typescriptlang.org
- MDN Web Docs: https://developer.mozilla.org

## Notes for AI-Assisted Development
When generating code for xCoder:
- Always consider the WebContainer environment limitations
- Ensure code works in a browser-based filesystem
- Handle Node.js API differences in browser context
- Test thoroughly in the actual WebContainer environment
- Consider offline capabilities when possible
- Prioritize user experience and real-time feedback
- Keep the AI model interactions efficient and cost-effective

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

*   
