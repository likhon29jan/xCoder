/**
 * A placeholder for the terminal agent.
 * In the future, this will execute commands in a WebContainer.
 *
 * @param command The command to execute.
 * @returns A hardcoded response.
 */
export function runCommand(command: string): string {
  console.log(`Running command: ${command}`);
  return `> ${command}\nCommand executed successfully.`;
}