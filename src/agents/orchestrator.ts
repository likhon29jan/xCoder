import { generateCode } from './code-generator';
import { runCommand } from './terminal';
import { writeFile } from './filesystem';
import { deploy } from './deployment';
import { scanProject } from '../utils/scanner';

/**
 * The main orchestrator for the AI agent.
 * It receives a prompt and routes it to the appropriate agent.
 *
 * @param prompt The user's prompt.
 * @returns The result from the agent.
 */
export async function orchestrate(prompt: string): Promise<string> {
  if (prompt.startsWith('generate code')) {
    return await generateCode(prompt);
  }

  if (prompt.startsWith('run command')) {
    const command = prompt.substring('run command'.length).trim();
    return runCommand(command);
  }

  if (prompt.startsWith('write file')) {
    const [path, ...content] = prompt.substring('write file'.length).trim().split(' ');
    return writeFile(path, content.join(' '));
  }

  if (prompt.startsWith('deploy')) {
    return deploy();
  }

  if (prompt.startsWith('scan project')) {
    return scanProject();
  }

  return 'Unknown command. Try "generate code", "run command", "write file", "deploy", or "scan project".';
}