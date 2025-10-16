export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type Messages = Message[];

export type StreamingOptions = {
  toolChoice?: 'none';
  onFinish?: (payload: { text: string; finishReason: 'stop' | 'length' }) => void | Promise<void>;
};

export type StreamTextResult = {
  toAIStream(): ReadableStream<Uint8Array>;
};

const encoder = new TextEncoder();

export async function streamText(
  messages: Messages,
  _env?: unknown,
  options: StreamingOptions = {},
): Promise<StreamTextResult> {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user');
  const baseContent = latestUserMessage?.content ?? '';

  const normalized = baseContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join(' ');

  const improvedPrompt = normalized.length > 0 ? `Please assist with: ${normalized}` : 'No prompt provided.';

  await options.onFinish?.({ text: improvedPrompt, finishReason: 'stop' });

  return {
    toAIStream() {
      return new ReadableStream<Uint8Array>({
        start(controller) {
          const payload = JSON.stringify({ type: 'text', value: improvedPrompt });
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
          controller.close();
        },
      });
    },
  };
}
