# AGENTS.md

> **Follow**: Read `.github/copilot-instructions.md` for complete development guidelines  
> **Auto-scan docs**: Access AI SDK at [ai-sdk.dev/llms.txt](https://sdk.vercel.ai/llms.txt)
Follow : https://webcontainer-tutorial.pages.dev/
Follow : https://webcontainers.io/api
---

# Authentication

<Note type="warning">
  AI SDK RSC is currently experimental. We recommend using [AI SDK
  UI](/docs/ai-sdk-ui/overview) for production. For guidance on migrating from
  RSC to UI, see our [migration guide](/docs/ai-sdk-rsc/migrating-to-ui).
</Note>

The RSC API makes extensive use of [`Server Actions`](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) to power streaming values and UI from the server.

Server Actions are exposed as public, unprotected endpoints. As a result, you should treat Server Actions as you would public-facing API endpoints and ensure that the user is authorized to perform the action before returning any data.

```tsx filename="app/actions.tsx"
'use server';

import { cookies } from 'next/headers';
import { createStremableUI } from '@ai-sdk/rsc';
import { validateToken } from '../utils/auth';

export const getWeather = async () => {
  const token = cookies().get('token');

  if (!token || !validateToken(token)) {
    return {
      error: 'This action requires authentication',
    };
  }
  const streamableDisplay = createStreamableUI(null);

  streamableDisplay.update(<Skeleton />);
  streamableDisplay.done(<Weather />);

  return {
    display: streamableDisplay.value,
  };
};
```


## Setup commands
- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Build production: `pnpm build`
- Run tests: `pnpm test`
- Type check: `pnpm typecheck`
- Lint code: `pnpm lint`

## Code style
- TypeScript strict mode
- Single quotes, no semicolons
- Use functional components with hooks
- Prefer `const` over `let`, never `var`
- Use async/await over promise chains
- Keep functions under 50 lines

## Agent architecture
- **Main Orchestrator**: Routes requests to specialist agents (`src/agents/orchestrator.ts`)
- **Code Generator**: AI-powered code creation (`src/agents/code-generator.ts`)
- **Terminal Agent**: Execute commands in WebContainer (`src/agents/terminal.ts`)
- **File System Agent**: Handle all file operations (`src/agents/filesystem.ts`)
- **Deployment Agent**: Deploy to Vercel/Netlify (`src/agents/deployment.ts`)

## Auto-scan logic
- All agents auto-scan project structure on initialization
- Scan command: `await scanner.scanProject('/')` returns project type, framework, dependencies
- Project context loaded before every AI request
- File tree cached and updated on file changes
- Use `ProjectScanner` class in `src/utils/scanner.ts`

## AI SDK integration
- Install: `pnpm add ai @ai-sdk/google
- Use `generateText` for structured output
- Use `streamText` for real-time streaming
- Models: Gemini 2.5 Pro / Gemini 2.5 Pro Lite!
- Always include conversation history in messages array
- Token limit: 180k for Gemini , manage with summarization 
Google Generative AI Provider
The Google Generative AI provider contains language and embedding model support for the Google Generative AI APIs.

Setup
The Google provider is available in the @ai-sdk/google module. You can install it with

pnpm
npm
yarn
bun
pnpm add @ai-sdk/google
Provider Instance
You can import the default provider instance google from @ai-sdk/google:


import { google } from '@ai-sdk/google';
If you need a customized setup, you can import createGoogleGenerativeAI from @ai-sdk/google and create a provider instance with your settings:


import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  // custom settings
});
You can use the following optional settings to customize the Google Generative AI provider instance:

baseURL string

Use a different URL prefix for API calls, e.g. to use proxy servers. The default prefix is https://generativelanguage.googleapis.com/v1beta.

apiKey string

API key that is being sent using the x-goog-api-key header. It defaults to the GOOGLE_GENERATIVE_AI_API_KEY environment variable.

headers Record<string,string>

Custom headers to include in the requests.

fetch (input: RequestInfo, init?: RequestInit) => Promise<Response>

Custom fetch implementation. Defaults to the global fetch function. You can use it as a middleware to intercept requests, or to provide a custom fetch implementation for e.g. testing


## WebContainer setup
- Import: `import { WebContainer } from '@webcontainer/api'`
- Boot: `const container = await WebContainer.boot()`
- File write: `await container.fs.writeFile(path, content)`
- Command: `await container.spawn('npm', ['install'])`
- Stream output from process.output

## Security rules
- Validate all user inputs before processing
- Block dangerous commands: `rm -rf /`, `curl | sh`, `dd if=`, `chmod 777`
- Sanitize file paths to prevent traversal (`..` not allowed)
- Limit process execution time (30s default timeout)
- Rate limit AI calls (100 requests/hour per user)
- Never expose API keys in frontend code

## Testing instructions
- Unit tests: `pnpm test:unit`
- Integration tests: `pnpm test:integration`
- Test one file: `pnpm vitest run <filename>`
- Test pattern: `pnpm vitest run -t "<test name>"`
- Coverage report: `pnpm test:coverage`
- Aim for 80%+ coverage on core agents
- Mock WebContainer in tests using `vi.mock('@webcontainer/api')`
- Mock AI SDK using `vi.mock('ai')`

## Dev environment tips
- Use `pnpm dlx turbo run where <package>` to locate package instead of `ls`
- Install to workspace: `pnpm install --filter <package>`
- Create new package: `pnpm create vite@latest <name> -- --template react-ts`
- Check package name in package.json, not root
- Use dev tools: React DevTools, Redux DevTools for debugging
- Enable source maps for production debugging

## Agent implementation checklist
### Orchestrator Agent
- [ ] Intent classification with 95%+ accuracy
- [ ] Multi-agent coordination logic
- [ ] Conversation history management (max 180k tokens)
- [ ] Error recovery with fallback strategies
- [ ] WebContainer lifecycle management

### Code Generator Agent
- [ ] Context-aware code generation
- [ ] Load copilot-instructions.md into system prompt
- [ ] Multi-file generation support
- [ ] Code validation and formatting
- [ ] Test generation for new code
- [ ] Incremental updates (not full rewrites)

### Terminal Agent
- [ ] Secure command execution with blocklist
- [ ] Real-time output streaming
- [ ] Process lifecycle (start/stop/restart)
- [ ] Error interpretation with AI suggestions
- [ ] Resource limits (CPU/memory)

### File System Agent
- [ ] CRUD operations for files/directories
- [ ] File watching with debouncing
- [ ] Undo/redo support
- [ ] Search with fuzzy matching
- [ ] Automatic backups before overwrites
- [ ] Conflict resolution for concurrent edits

### Deployment Agent
- [ ] Vercel deployment integration
- [ ] Netlify deployment support
- [ ] Pre-deployment validation
- [ ] Environment variable management
- [ ] Build process monitoring
- [ ] Rollback on failure

## Project structure auto-scan
```typescript
// Auto-detect project type
const projectInfo = await scanner.scan()
// Returns: { type, framework, language, dependencies, structure }

// Use in agent prompts
const context = `Project: ${projectInfo.type}, Framework: ${projectInfo.framework}`
```

## Conversation context management
- Keep last 20 messages for recent context
- Summarize older messages when approaching token limit
- Include file changes in metadata
- Track which agent handled each message
- Use structured format: `{ role, content, timestamp, metadata }`

## Error handling patterns
- Try-catch all async operations
- Provide user-friendly error messages (no stack traces to users)
- Log detailed errors for debugging
- Suggest fixes using AI when terminal commands fail
- Implement graceful degradation (fallback to simpler models)

## Performance optimization
- Cache project structure scan (invalidate on file changes)
- Debounce file system operations (300ms)
- Use streaming for all AI responses
- Parallelize independent operations
- Limit concurrent processes to 3
- Implement request queuing for rate limiting

## PR instructions
- Title format: `[agent-name] Brief description`
- Always run `pnpm lint && pnpm test` before committing
- Include test coverage for new features
- Update AGENTS.md if adding new commands or patterns
- Reference related issues with `#issue-number`
- Keep PRs focused (one feature/fix per PR)

## Deployment checklist
- [ ] All tests passing (`pnpm test`)
- [ ] Type check passing (`pnpm typecheck`)
- [ ] Lint check passing (`pnpm lint`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Security audit done (`pnpm audit`)
- [ ] Environment variables configured
- [ ] Error tracking enabled (Sentry)
- [ ] Performance monitoring enabled
- [ ] Smoke tests on staging
- [ ] Documentation updated

## Common commands
- Add dependency: `pnpm add <package>`
- Add dev dependency: `pnpm add -D <package>`
- Remove package: `pnpm remove <package>`
- Update all: `pnpm update`
- Clean install: `rm -rf node_modules && pnpm install`
- Check outdated: `pnpm outdated`
- Run script: `pnpm <script-name>`

## Debugging tips
- Use `console.log` with prefixes: `[Agent:Code]`, `[Agent:Terminal]`
- Enable verbose logging: `DEBUG=* pnpm dev`
- Check WebContainer logs: `container.on('error', console.error)`
- Inspect AI prompts: Log the full messages array before API call
- Monitor token usage: Log `response.usage` after each AI call
- Use React DevTools for component state inspection

## Resources
- AI SDK docs: [ai-sdk.dev/llms.txt](https://sdk.vercel.ai/llms.txt)
- WebContainer API: [webcontainers.io/api](https://webcontainers.io/api)
- Copilot guidelines: `.github/copilot-instructions.md`
- TypeScript handbook: [typescriptlang.org/docs](https://www.typescriptlang.org/docs)

# Google Generative AI Provider

The [Google Generative AI](https://ai.google.dev) provider contains language and embedding model support for
the [Google Generative AI](https://ai.google.dev/api/rest) APIs.

## Setup

The Google provider is available in the `@ai-sdk/google` module. You can install it with

<Tabs items={['pnpm', 'npm', 'yarn', 'bun']}>
  <Tab>
    <Snippet text="pnpm add @ai-sdk/google" dark />
  </Tab>
  <Tab>
    <Snippet text="npm install @ai-sdk/google" dark />
  </Tab>
  <Tab>
    <Snippet text="yarn add @ai-sdk/google" dark />
  </Tab>

  <Tab>
    <Snippet text="bun add @ai-sdk/google" dark />
  </Tab>
</Tabs>

## Provider Instance

You can import the default provider instance `google` from `@ai-sdk/google`:

```ts
import { google } from '@ai-sdk/google';
```

If you need a customized setup, you can import `createGoogleGenerativeAI` from `@ai-sdk/google` and create a provider instance with your settings:

```ts
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  // custom settings
});
```

You can use the following optional settings to customize the Google Generative AI provider instance:

- **baseURL** _string_

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://generativelanguage.googleapis.com/v1beta`.

- **apiKey** _string_

  API key that is being sent using the `x-goog-api-key` header.
  It defaults to the `GOOGLE_GENERATIVE_AI_API_KEY` environment variable.

- **headers** _Record&lt;string,string&gt;_

  Custom headers to include in the requests.

- **fetch** _(input: RequestInfo, init?: RequestInit) => Promise&lt;Response&gt;_

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

## Language Models

You can create models that call the [Google Generative AI API](https://ai.google.dev/api/rest) using the provider instance.
The first argument is the model id, e.g. `gemini-2.5-flash`.
The models support tool calls and some have multi-modal capabilities.

```ts
const model = google('gemini-2.5-flash');
```

You can use Google Generative AI language models to generate text with the `generateText` function:

```ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text } = await generateText({
  model: google('gemini-2.5-flash'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

Google Generative AI language models can also be used in the `streamText`, `generateObject`, and `streamObject` functions
(see [AI SDK Core](/docs/ai-sdk-core)).

Google Generative AI also supports some model specific settings that are not part of the [standard call settings](/docs/ai-sdk-core/settings).
You can pass them as an options argument:

```ts
const model = google('gemini-2.5-flash');

await generateText({
  model,
  providerOptions: {
    google: {
      safetySettings: [
        {
          category: 'HARM_CATEGORY_UNSPECIFIED',
          threshold: 'BLOCK_LOW_AND_ABOVE',
        },
      ],
    },
  },
});
```

The following optional provider options are available for Google Generative AI models:

- **cachedContent** _string_

  Optional. The name of the cached content used as context to serve the prediction.
  Format: cachedContents/\{cachedContent\}

- **structuredOutputs** _boolean_

  Optional. Enable structured output. Default is true.

  This is useful when the JSON Schema contains elements that are
  not supported by the OpenAPI schema version that
  Google Generative AI uses. You can use this to disable
  structured outputs if you need to.

  See [Troubleshooting: Schema Limitations](#schema-limitations) for more details.

- **safetySettings** _Array\<\{ category: string; threshold: string \}\>_

  Optional. Safety settings for the model.

  - **category** _string_

    The category of the safety setting. Can be one of the following:

    - `HARM_CATEGORY_HATE_SPEECH`
    - `HARM_CATEGORY_DANGEROUS_CONTENT`
    - `HARM_CATEGORY_HARASSMENT`
    - `HARM_CATEGORY_SEXUALLY_EXPLICIT`

  - **threshold** _string_

    The threshold of the safety setting. Can be one of the following:

    - `HARM_BLOCK_THRESHOLD_UNSPECIFIED`
    - `BLOCK_LOW_AND_ABOVE`
    - `BLOCK_MEDIUM_AND_ABOVE`
    - `BLOCK_ONLY_HIGH`
    - `BLOCK_NONE`

- **responseModalities** _string[]_
  The modalities to use for the response. The following modalities are supported: `TEXT`, `IMAGE`. When not defined or empty, the model defaults to returning only text.

- **thinkingConfig** _\{ thinkingBudget: number; includeThoughts: boolean \}_

  Optional. Configuration for the model's thinking process. Only supported by specific [Google Generative AI models](https://ai.google.dev/gemini-api/docs/thinking).

  - **thinkingBudget** _number_

    Optional. Gives the model guidance on the number of thinking tokens it can use when generating a response. Setting it to 0 disables thinking, if the model supports it.
    For more information about the possible value ranges for each model see [Google Generative AI thinking documentation](https://ai.google.dev/gemini-api/docs/thinking#set-budget).

  - **includeThoughts** _boolean_

    Optional. If set to true, thought summaries are returned, which are synthisized versions of the model's raw thoughts and offer insights into the model's internal reasoning process.

- **imageConfig** _\{ aspectRatio: string \}_

  Optional. Configuration for the models image generation. Only supported by specific [Google Generative AI models](https://ai.google.dev/gemini-api/docs/image-generation).

  - **aspectRatio** _string_

  Model defaults to generate 1:1 squares, or to matching the output image size to that of your input image. Can be one of the following:

  - 1:1
  - 2:3
  - 3:2
  - 3:4
  - 4:3
  - 4:5
  - 5:4
  - 9:16
  - 16:9
  - 21:9

### Thinking

The Gemini 2.5 series models use an internal "thinking process" that significantly improves their reasoning and multi-step planning abilities, making them highly effective for complex tasks such as coding, advanced mathematics, and data analysis. For more information see [Google Generative AI thinking documentation](https://ai.google.dev/gemini-api/docs/thinking).

You can control thinking budgets and enable a thought summary by setting the `thinkingConfig` parameter.

```ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const model = google('gemini-2.5-flash');

const { text, reasoning } = await generateText({
  model: model,
  prompt: 'What is the sum of the first 10 prime numbers?',
  providerOptions: {
    google: {
      thinkingConfig: {
        thinkingBudget: 8192,
        includeThoughts: true,
      },
    },
  },
});

console.log(text);

console.log(reasoning); // Reasoning summary
```

### File Inputs

The Google Generative AI provider supports file inputs, e.g. PDF files.

```ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const result = await generateText({
  model: google('gemini-2.5-flash'),
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'What is an embedding model according to this document?',
        },
        {
          type: 'file',
          data: fs.readFileSync('./data/ai.pdf'),
          mediaType: 'application/pdf',
        },
      ],
    },
  ],
});
```

You can also use YouTube URLs directly:

```ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const result = await generateText({
  model: google('gemini-2.5-flash'),
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Summarize this video',
        },
        {
          type: 'file',
          data: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          mediaType: 'video/mp4',
        },
      ],
    },
  ],
});
```

<Note>
  The AI SDK will automatically download URLs if you pass them as data, except
  for `https://generativelanguage.googleapis.com/v1beta/files/` and YouTube
  URLs. You can use the Google Generative AI Files API to upload larger files to
  that location. YouTube URLs (public or unlisted videos) are supported directly
  - you can specify one YouTube video URL per request.
</Note>

See [File Parts](/docs/foundations/prompts#file-parts) for details on how to use files in prompts.

### Cached Content

Google Generative AI supports both explicit and implicit caching to help reduce costs on repetitive content.

#### Implicit Caching

Gemini 2.5 models automatically provide cache cost savings without needing to create an explicit cache. When you send requests that share common prefixes with previous requests, you'll receive a 75% token discount on cached content.

To maximize cache hits with implicit caching:

- Keep content at the beginning of requests consistent
- Add variable content (like user questions) at the end of prompts
- Ensure requests meet minimum token requirements:
  - Gemini 2.5 Flash: 1024 tokens minimum
  - Gemini 2.5 Pro: 2048 tokens minimum

```ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

// Structure prompts with consistent content at the beginning
const baseContext =
  'You are a cooking assistant with expertise in Italian cuisine. Here are 1000 lasagna recipes for reference...';

const { text: veggieLasagna } = await generateText({
  model: google('gemini-2.5-pro'),
  prompt: `${baseContext}\n\nWrite a vegetarian lasagna recipe for 4 people.`,
});

// Second request with same prefix - eligible for cache hit
const { text: meatLasagna, providerMetadata } = await generateText({
  model: google('gemini-2.5-pro'),
  prompt: `${baseContext}\n\nWrite a meat lasagna recipe for 12 people.`,
});

// Check cached token count in usage metadata
console.log('Cached tokens:', providerMetadata.google?.usageMetadata);
// e.g.
// {
//   groundingMetadata: null,
//   safetyRatings: null,
//   usageMetadata: {
//     cachedContentTokenCount: 2027,
//     thoughtsTokenCount: 702,
//     promptTokenCount: 2152,
//     candidatesTokenCount: 710,
//     totalTokenCount: 3564
//   }
// }
```

<Note>
  Usage metadata was added to `providerMetadata` in `@ai-sdk/google@1.2.23`. If
  you are using an older version, usage metadata is available in the raw HTTP
  `response` body returned as part of the return value from `generateText`.
</Note>

#### Explicit Caching

For guaranteed cost savings, you can still use explicit caching with Gemini 2.5 and 2.0 models. See the [models page](https://ai.google.dev/gemini-api/docs/models) to check if caching is supported for the used model:

```ts
import { google } from '@ai-sdk/google';
import { GoogleAICacheManager } from '@google/generative-ai/server';
import { generateText } from 'ai';

const cacheManager = new GoogleAICacheManager(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY,
);

const model = 'gemini-2.5-pro';

const { name: cachedContent } = await cacheManager.create({
  model,
  contents: [
    {
      role: 'user',
      parts: [{ text: '1000 Lasagna Recipes...' }],
    },
  ],
  ttlSeconds: 60 * 5,
});

const { text: veggieLasangaRecipe } = await generateText({
  model: google(model),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  providerOptions: {
    google: {
      cachedContent,
    },
  },
});

const { text: meatLasangaRecipe } = await generateText({
  model: google(model),
  prompt: 'Write a meat lasagna recipe for 12 people.',
  providerOptions: {
    google: {
      cachedContent,
    },
  },
});
```

### Code Execution

With [Code Execution](https://ai.google.dev/gemini-api/docs/code-execution), certain models can generate and execute Python code to perform calculations, solve problems, or provide more accurate information.

You can enable code execution by adding the `code_execution` tool to your request.

```ts
import { google } from '@ai-sdk/google';
import { googleTools } from '@ai-sdk/google/internal';
import { generateText } from 'ai';

const { text, toolCalls, toolResults } = await generateText({
  model: google('gemini-2.5-pro'),
  tools: { code_execution: google.tools.codeExecution({}) },
  prompt: 'Use python to calculate the 20th fibonacci number.',
});
```

The response will contain the tool calls and results from the code execution.

### Google Search

With [search grounding](https://ai.google.dev/gemini-api/docs/google-search),
the model has access to the latest information using Google search.
Google search can be used to provide answers around current events:

```ts highlight="8,17-20"
import { google } from '@ai-sdk/google';
import { GoogleGenerativeAIProviderMetadata } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text, sources, providerMetadata } = await generateText({
  model: google('gemini-2.5-flash'),
  tools: {
    google_search: google.tools.googleSearch({}),
  },
  prompt:
    'List the top 5 San Francisco news from the past week.' +
    'You must include the date of each article.',
});

// access the grounding metadata. Casting to the provider metadata type
// is optional but provides autocomplete and type safety.
const metadata = providerMetadata?.google as
  | GoogleGenerativeAIProviderMetadata
  | undefined;
const groundingMetadata = metadata?.groundingMetadata;
const safetyRatings = metadata?.safetyRatings;
```

When Search Grounding is enabled, the model will include sources in the response.

Additionally, the grounding metadata includes detailed information about how search results were used to ground the model's response. Here are the available fields:

- **`webSearchQueries`** (`string[] | null`)

  - Array of search queries used to retrieve information
  - Example: `["What's the weather in Chicago this weekend?"]`

- **`searchEntryPoint`** (`{ renderedContent: string } | null`)

  - Contains the main search result content used as an entry point
  - The `renderedContent` field contains the formatted content

- **`groundingSupports`** (Array of support objects | null)
  - Contains details about how specific response parts are supported by search results
  - Each support object includes:
    - **`segment`**: Information about the grounded text segment
      - `text`: The actual text segment
      - `startIndex`: Starting position in the response
      - `endIndex`: Ending position in the response
    - **`groundingChunkIndices`**: References to supporting search result chunks
    - **`confidenceScores`**: Confidence scores (0-1) for each supporting chunk

Example response:

```json
{
  "groundingMetadata": {
    "webSearchQueries": ["What's the weather in Chicago this weekend?"],
    "searchEntryPoint": {
      "renderedContent": "..."
    },
    "groundingSupports": [
      {
        "segment": {
          "startIndex": 0,
          "endIndex": 65,
          "text": "Chicago weather changes rapidly, so layers let you adjust easily."
        },
        "groundingChunkIndices": [0],
        "confidenceScores": [0.99]
      }
    ]
  }
}
```

### URL Context

Google provides a provider-defined URL context tool.

The URL context tool allows the you to provide specific URLs that you want the model to analyze directly in from the prompt.

```ts highlight="9,13-17"
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text, sources, providerMetadata } = await generateText({
  model: google('gemini-2.5-flash'),
  prompt: `Based on the document: https://ai.google.dev/gemini-api/docs/url-context.
          Answer this question: How many links we can consume in one request?`,
  tools: {
    url_context: google.tools.urlContext({}),
  },
});

const metadata = providerMetadata?.google as
  | GoogleGenerativeAIProviderMetadata
  | undefined;
const groundingMetadata = metadata?.groundingMetadata;
const urlContextMetadata = metadata?.urlContextMetadata;
```

The URL context metadata includes detailed information about how the model used the URL context to generate the response. Here are the available fields:

- **`urlMetadata`** (`{ retrievedUrl: string; urlRetrievalStatus: string; }[] | null`)

  - Array of URL context metadata
  - Each object includes:
    - **`retrievedUrl`**: The URL of the context
    - **`urlRetrievalStatus`**: The status of the URL retrieval

Example response:

```json
{
  "urlMetadata": [
    {
      "retrievedUrl": "https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai",
      "urlRetrievalStatus": "URL_RETRIEVAL_STATUS_SUCCESS"
    }
  ]
}
```

With the URL context tool, you will also get the `groundingMetadata`.

```json
"groundingMetadata": {
    "groundingChunks": [
        {
            "web": {
                "uri": "https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai",
                "title": "Google Generative AI - AI SDK Providers"
            }
        }
    ],
    "groundingSupports": [
        {
            "segment": {
                "startIndex": 67,
                "endIndex": 157,
                "text": "**Installation**: Install the `@ai-sdk/google` module using your preferred package manager"
            },
            "groundingChunkIndices": [
                0
            ]
        },
    ]
}
```

<Note>You can add up to 20 URLs per request.</Note>

<Note>
  The URL context tool is only supported for Gemini 2.0 Flash models and above.
  Check the [supported models for URL context
  tool](https://ai.google.dev/gemini-api/docs/url-context#supported-models).
</Note>

#### Combine URL Context with Search Grounding

You can combine the URL context tool with search grounding to provide the model with the latest information from the web.

```ts highlight="9-10"
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text, sources, providerMetadata } = await generateText({
  model: google('gemini-2.5-flash'),
  prompt: `Based on this context: https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai, tell me how to use Gemini with AI SDK.
    Also, provide the latest news about AI SDK V5.`,
  tools: {
    google_search: google.tools.googleSearch({}),
    url_context: google.tools.urlContext({}),
  },
});

const metadata = providerMetadata?.google as
  | GoogleGenerativeAIProviderMetadata
  | undefined;
const groundingMetadata = metadata?.groundingMetadata;
const urlContextMetadata = metadata?.urlContextMetadata;
```

### Image Outputs

Gemini models with image generation capabilities (`gemini-2.5-flash-image-preview`) support image generation. Images are exposed as files in the response.

```ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const result = await generateText({
  model: google('gemini-2.5-flash-image-preview'),
  prompt:
    'Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme',
});

for (const file of result.files) {
  if (file.mediaType.startsWith('image/')) {
    console.log('Generated image:', file);
  }
}
```

### Safety Ratings

The safety ratings provide insight into the safety of the model's response.
See [Google AI documentation on safety settings](https://ai.google.dev/gemini-api/docs/safety-settings).

Example response excerpt:

```json
{
  "safetyRatings": [
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "probability": "NEGLIGIBLE",
      "probabilityScore": 0.11027937,
      "severity": "HARM_SEVERITY_LOW",
      "severityScore": 0.28487435
    },
    {
      "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
      "probability": "HIGH",
      "blocked": true,
      "probabilityScore": 0.95422274,
      "severity": "HARM_SEVERITY_MEDIUM",
      "severityScore": 0.43398145
    },
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "probability": "NEGLIGIBLE",
      "probabilityScore": 0.11085559,
      "severity": "HARM_SEVERITY_NEGLIGIBLE",
      "severityScore": 0.19027223
    },
    {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "probability": "NEGLIGIBLE",
      "probabilityScore": 0.22901751,
      "severity": "HARM_SEVERITY_NEGLIGIBLE",
      "severityScore": 0.09089675
    }
  ]
}
```

### Troubleshooting

#### Schema Limitations

The Google Generative AI API uses a subset of the OpenAPI 3.0 schema,
which does not support features such as unions.
The errors that you get in this case look like this:

`GenerateContentRequest.generation_config.response_schema.properties[occupation].type: must be specified`

By default, structured outputs are enabled (and for tool calling they are required).
You can disable structured outputs for object generation as a workaround:

```ts highlight="3,8"
const { object } = await generateObject({
  model: google('gemini-2.5-flash'),
  providerOptions: {
    google: {
      structuredOutputs: false,
    },
  },
  schema: z.object({
    name: z.string(),
    age: z.number(),
    contact: z.union([
      z.object({
        type: z.literal('email'),
        value: z.string(),
      }),
      z.object({
        type: z.literal('phone'),
        value: z.string(),
      }),
    ]),
  }),
  prompt: 'Generate an example person for testing.',
});
```

The following Zod features are known to not work with Google Generative AI:

- `z.union`
- `z.record`

### Model Capabilities

| Model                                 | Image Input         | Object Generation   | Tool Usage          | Tool Streaming      | Google Search       | URL Context         |
| ------------------------------------- | ------------------- | ------------------- | ------------------- | ------------------- | ------------------- | ------------------- |
| `gemini-2.5-pro`                      | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| `gemini-2.5-flash`                    | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| `gemini-2.5-flash-lite`               | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| `gemini-2.5-flash-lite-preview-06-17` | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| `gemini-2.0-flash`                    | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| `gemini-1.5-pro`                      | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Cross size={18} /> |
| `gemini-1.5-pro-latest`               | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Cross size={18} /> |
| `gemini-1.5-flash`                    | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Cross size={18} /> |
| `gemini-1.5-flash-latest`             | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Cross size={18} /> |
| `gemini-1.5-flash-8b`                 | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Cross size={18} /> |
| `gemini-1.5-flash-8b-latest`          | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Cross size={18} /> |

<Note>
  The table above lists popular models. Please see the [Google Generative AI
  docs](https://ai.google.dev/gemini-api/docs/models/) for a full list of
  available models. The table above lists popular models. You can also pass any
  available provider model ID as a string if needed.
</Note>

## Gemma Models

You can use [Gemma models](https://deepmind.google/models/gemma/) with the Google Generative AI API.

Gemma models don't natively support the `systemInstruction` parameter, but the provider automatically handles system instructions by prepending them to the first user message. This allows you to use system instructions with Gemma models seamlessly:

```ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text } = await generateText({
  model: google('gemma-3-27b-it'),
  system: 'You are a helpful assistant that responds concisely.',
  prompt: 'What is machine learning?',
});
```

The system instruction is automatically formatted and included in the conversation, so Gemma models can follow the guidance without any additional configuration.

## Embedding Models

You can create models that call the [Google Generative AI embeddings API](https://ai.google.dev/gemini-api/docs/embeddings)
using the `.textEmbedding()` factory method.

```ts
const model = google.textEmbedding('gemini-embedding-001');
```

The Google Generative AI provider sends API calls to the right endpoint based on the type of embedding:

- **Single embeddings**: When embedding a single value with `embed()`, the provider uses the single `:embedContent` endpoint, which typically has higher rate limits compared to the batch endpoint.
- **Batch embeddings**: When embedding multiple values with `embedMany()` or multiple values in `embed()`, the provider uses the `:batchEmbedContents` endpoint.

Google Generative AI embedding models support aditional settings. You can pass them as an options argument:

```ts
import { google } from '@ai-sdk/google';
import { embed } from 'ai';

const model = google.textEmbedding('gemini-embedding-001');

const { embedding } = await embed({
  model,
  value: 'sunny day at the beach',
  providerOptions: {
    google: {
      outputDimensionality: 512, // optional, number of dimensions for the embedding
      taskType: 'SEMANTIC_SIMILARITY', // optional, specifies the task type for generating embeddings
    },
  },
});
```

The following optional provider options are available for Google Generative AI embedding models:

- **outputDimensionality**: _number_

  Optional reduced dimension for the output embedding. If set, excessive values in the output embedding are truncated from the end.

- **taskType**: _string_

  Optional. Specifies the task type for generating embeddings. Supported task types include:

  - `SEMANTIC_SIMILARITY`: Optimized for text similarity.
  - `CLASSIFICATION`: Optimized for text classification.
  - `CLUSTERING`: Optimized for clustering texts based on similarity.
  - `RETRIEVAL_DOCUMENT`: Optimized for document retrieval.
  - `RETRIEVAL_QUERY`: Optimized for query-based retrieval.
  - `QUESTION_ANSWERING`: Optimized for answering questions.
  - `FACT_VERIFICATION`: Optimized for verifying factual information.
  - `CODE_RETRIEVAL_QUERY`: Optimized for retrieving code blocks based on natural language queries.

### Model Capabilities

| Model                  | Default Dimensions | Custom Dimensions   |
| ---------------------- | ------------------ | ------------------- |
| `gemini-embedding-001` | 3072               | <Check size={18} /> |
| `text-embedding-004`   | 768                | <Check size={18} /> |

## Image Models

You can create [Imagen](https://ai.google.dev/gemini-api/imagen) models that call the Google Generative AI API using the `.image()` factory method.
For more on image generation with the AI SDK see [generateImage()](/docs/reference/ai-sdk-core/generate-image).

```ts
import { google } from '@ai-sdk/google';
import { experimental_generateImage as generateImage } from 'ai';

const { image } = await generateImage({
  model: google.image('imagen-3.0-generate-002'),
  prompt: 'A futuristic cityscape at sunset',
  aspectRatio: '16:9',
});
```

Further configuration can be done using Google provider options. You can validate the provider options using the `GoogleGenerativeAIImageProviderOptions` type.

```ts
import { google } from '@ai-sdk/google';
import { GoogleGenerativeAIImageProviderOptions } from '@ai-sdk/google';
import { experimental_generateImage as generateImage } from 'ai';

const { image } = await generateImage({
  model: google.image('imagen-3.0-generate-002'),
  providerOptions: {
    google: {
      personGeneration: 'dont_allow',
    } satisfies GoogleGenerativeAIImageProviderOptions,
  },
  // ...
});
```

The following provider options are available:

- **personGeneration** `allow_adult` | `allow_all` | `dont_allow`
  Whether to allow person generation. Defaults to `allow_adult`.

<Note>
  Imagen models do not support the `size` parameter. Use the `aspectRatio`
  parameter instead.
</Note>

#### Model Capabilities

| Model                     | Aspect Ratios             |
| ------------------------- | ------------------------- |
| `imagen-3.0-generate-002` | 1:1, 3:4, 4:3, 9:16, 16:9 |

# Gemini CLI Provider

The [ai-sdk-provider-gemini-cli](https://github.com/ben-vargas/ai-sdk-provider-gemini-cli) community provider enables using Google's Gemini models through the [@google/gemini-cli-core](https://www.npmjs.com/package/@google/gemini-cli-core) library and Google Cloud Code endpoints. While it works with both Gemini Code Assist (GCA) licenses and API key authentication, it's particularly useful for developers who want to use their existing GCA subscription rather than paid use API keys.

## Version Compatibility

The Gemini CLI provider supports both AI SDK v4 and v5-beta:

| Provider Version | AI SDK Version | Status | Branch                                                                                 |
| ---------------- | -------------- | ------ | -------------------------------------------------------------------------------------- |
| 0.x              | v4             | Stable | [`ai-sdk-v4`](https://github.com/ben-vargas/ai-sdk-provider-gemini-cli/tree/ai-sdk-v4) |
| 1.x-beta         | v5-beta        | Beta   | [`main`](https://github.com/ben-vargas/ai-sdk-provider-gemini-cli/tree/main)           |

## Setup

The Gemini CLI provider is available in the `ai-sdk-provider-gemini-cli` module. Install the version that matches your AI SDK version:

### For AI SDK v5-beta (latest)

<Tabs items={['pnpm', 'npm', 'yarn', 'bun']}>
  <Tab>
    <Snippet text="pnpm add ai-sdk-provider-gemini-cli ai" dark />
  </Tab>
  <Tab>
    <Snippet text="npm install ai-sdk-provider-gemini-cli ai" dark />
  </Tab>
  <Tab>
    <Snippet text="yarn add ai-sdk-provider-gemini-cli ai" dark />
  </Tab>

  <Tab>
    <Snippet text="bun add ai-sdk-provider-gemini-cli ai" dark />
  </Tab>
</Tabs>

### For AI SDK v4 (stable)

<Tabs items={['pnpm', 'npm', 'yarn', 'bun']}>
  <Tab>
    <Snippet text="pnpm add ai-sdk-provider-gemini-cli@^0 ai@^4" dark />
  </Tab>
  <Tab>
    <Snippet text="npm install ai-sdk-provider-gemini-cli@^0 ai@^4" dark />
  </Tab>
  <Tab>
    <Snippet text="yarn add ai-sdk-provider-gemini-cli@^0 ai@^4" dark />
  </Tab>

  <Tab>
    <Snippet text="bun add ai-sdk-provider-gemini-cli@^0 ai@^4" dark />
  </Tab>
</Tabs>

## Provider Instance

You can import `createGeminiProvider` from `ai-sdk-provider-gemini-cli` and create a provider instance with your settings:

```ts
import { createGeminiProvider } from 'ai-sdk-provider-gemini-cli';

// OAuth authentication (recommended)
const gemini = createGeminiProvider({
  authType: 'oauth-personal',
});

// API key authentication
const gemini = createGeminiProvider({
  authType: 'api-key',
  apiKey: process.env.GEMINI_API_KEY,
});
```

You can use the following settings to customize the Gemini CLI provider instance:

- **authType** _'oauth-personal' | 'api-key' | 'gemini-api-key'_

  Required. The authentication method to use.

  - `'oauth-personal'`: Uses existing Gemini CLI credentials from `~/.gemini/oauth_creds.json`
  - `'api-key'`: Standard AI SDK API key authentication (recommended)
  - `'gemini-api-key'`: Gemini-specific API key authentication (identical to `'api-key'`)

  Note: `'api-key'` and `'gemini-api-key'` are functionally identical. We recommend using `'api-key'` for consistency with AI SDK standards, but both options map to the same Gemini authentication method internally.

- **apiKey** _string_

  Required when using API key authentication. Your Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).

## Language Models

You can create models that call Gemini through the CLI using the provider instance.
The first argument is the model ID:

```ts
const model = gemini('gemini-2.5-pro');
```

Gemini CLI supports the following models:

- **gemini-2.5-pro**: Most capable model for complex tasks (64K output tokens)
- **gemini-2.5-flash**: Faster model for simpler tasks (64K output tokens)

### Example: Generate Text

You can use Gemini CLI language models to generate text with the `generateText` function:

```ts
import { createGeminiProvider } from 'ai-sdk-provider-gemini-cli';
import { generateText } from 'ai';

const gemini = createGeminiProvider({
  authType: 'oauth-personal',
});

// AI SDK v4
const { text } = await generateText({
  model: gemini('gemini-2.5-pro'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});

// AI SDK v5-beta
const result = await generateText({
  model: gemini('gemini-2.5-pro'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
console.log(result.content[0].text);
```

Gemini CLI language models can also be used in the `streamText`, `generateObject`, and `streamObject` functions
(see [AI SDK Core](/docs/ai-sdk-core) for more information).

<Note>
  The response format differs between AI SDK v4 and v5-beta. In v4, text is
  accessed directly via `result.text`. In v5-beta, it's accessed via
  `result.content[0].text`. Make sure to use the appropriate format for your AI
  SDK version.
</Note>

### Model Capabilities

| Model              | Image Input         | Object Generation   | Tool Usage          | Tool Streaming      |
| ------------------ | ------------------- | ------------------- | ------------------- | ------------------- |
| `gemini-2.5-pro`   | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| `gemini-2.5-flash` | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |

<Note>
  Images must be provided as base64-encoded data. Image URLs are not supported
  due to the Google Cloud Code endpoint requirements.
</Note>

## Authentication

The Gemini CLI provider supports two authentication methods:

### OAuth Authentication (Recommended)

First, install and authenticate the Gemini CLI globally:

```bash
npm install -g @google/gemini-cli
gemini  # Follow the interactive authentication setup
```

Then use OAuth authentication in your code:

```ts
const gemini = createGeminiProvider({
  authType: 'oauth-personal',
});
```

This uses your existing Gemini CLI credentials from `~/.gemini/oauth_creds.json`.

### API Key Authentication

1. Generate an API key from [Google AI Studio](https://aistudio.google.com/apikey).

2. Set it as an environment variable in your terminal:

   ```bash
   export GEMINI_API_KEY="YOUR_API_KEY"
   ```

   Replace `YOUR_API_KEY` with your generated key.

3. Use API key authentication in your code:

```ts
const gemini = createGeminiProvider({
  authType: 'api-key',
  apiKey: process.env.GEMINI_API_KEY,
});
```

<Note>
  The Gemini API provides a free tier with 100 requests per day using Gemini 2.5
  Pro. You can upgrade to a paid plan for higher rate limits on the [API key
  page](https://aistudio.google.com/apikey).
</Note>

## Features

### Structured Object Generation

Generate structured data using Zod schemas:

```ts
import { generateObject } from 'ai';
import { createGeminiProvider } from 'ai-sdk-provider-gemini-cli';
import { z } from 'zod';

const gemini = createGeminiProvider({
  authType: 'oauth-personal',
});

const result = await generateObject({
  model: gemini('gemini-2.5-pro'),
  schema: z.object({
    name: z.string().describe('Product name'),
    price: z.number().describe('Price in USD'),
    features: z.array(z.string()).describe('Key features'),
  }),
  prompt: 'Generate a laptop product listing',
});

console.log(result.object);
```

### Streaming Responses

Stream text for real-time output:

```ts
import { streamText } from 'ai';
import { createGeminiProvider } from 'ai-sdk-provider-gemini-cli';

const gemini = createGeminiProvider({
  authType: 'oauth-personal',
});

const result = await streamText({
  model: gemini('gemini-2.5-pro'),
  prompt: 'Write a story about a robot learning to paint',
});

// Both v4 and v5 use the same streaming API
for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

For more examples and features, including tool usage and multimodal input, see the [provider documentation](https://github.com/ben-vargas/ai-sdk-provider-gemini-cli).

## Model Parameters

You can configure model behavior with standard AI SDK parameters:

```ts
// AI SDK v4
const model = gemini('gemini-2.5-pro', {
  temperature: 0.7, // Controls randomness (0-2)
  maxTokens: 1000, // Maximum output tokens (defaults to 65536)
  topP: 0.95, // Nucleus sampling threshold
});

// AI SDK v5-beta
const model = gemini('gemini-2.5-pro', {
  temperature: 0.7, // Controls randomness (0-2)
  maxOutputTokens: 1000, // Maximum output tokens (defaults to 65536)
  topP: 0.95, // Nucleus sampling threshold
});
```

<Note>
  In AI SDK v5-beta, the `maxTokens` parameter has been renamed to
  `maxOutputTokens`. Make sure to use the correct parameter name for your
  version.
</Note>

## Limitations

- Requires Node.js ≥ 18
- OAuth authentication requires the Gemini CLI to be installed globally
- Image URLs not supported (use base64-encoded images)
- Very strict character length constraints in schemas may be challenging
- Some AI SDK parameters not supported: `frequencyPenalty`, `presencePenalty`, `seed`
- Only function tools supported (no provider-defined tools)

## Requirements

- Node.js 18 or higher
- Gemini CLI installed globally for OAuth authentication (`npm install -g @google/gemini-cli`)
- Valid Google account or Gemini API key

---

**Version**: 1.0.0  
**Last Updated**: 2025-10-17
