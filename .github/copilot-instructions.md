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
