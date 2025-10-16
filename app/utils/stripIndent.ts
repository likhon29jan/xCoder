export const stripIndent = (value: string) => {
  const lines = value.replace(/^\n/, '').split('\n')
  const indent = lines
    .filter(line => line.trim().length > 0)
    .reduce<number | null>((acc, line) => {
      const match = line.match(/^\s+/)
      if (!match) {
        return acc === null ? 0 : Math.min(acc, 0)
      }
      const length = match[0].length
      if (acc === null) {
        return length
      }
      return Math.min(acc, length)
    }, null) ?? 0

  return lines.map(line => line.slice(indent)).join('\n')
}
