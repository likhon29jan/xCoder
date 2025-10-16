'use client';

import { FormEvent, useMemo, useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const seedMessages: Message[] = [
  {
    id: 'intro-assistant',
    role: 'assistant',
    content: 'Hi! I am xCoder, your mindful engineering partner. How can we build together today?',
  },
];

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [input, setInput] = useState('');

  const conversation = useMemo(
    () =>
      messages.map((message) => (
        <li
          key={message.id}
          className={
            message.role === 'assistant'
              ? 'self-start rounded-3xl bg-white/8 px-4 py-3 text-sm text-white shadow'
              : 'self-end rounded-3xl bg-white px-4 py-3 text-sm text-neutral-900 shadow'
          }
        >
          {message.content}
        </li>
      )),
    [messages],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;

    const timestamp = Date.now().toString();
    const optimisticMessages: Message[] = [
      ...messages,
      { id: `user-${timestamp}`, role: 'user', content: trimmed },
      {
        id: `assistant-${timestamp}`,
        role: 'assistant',
        content: 'Thanks for sharing. Imagine a future task where we stream live responses from the AI SDK.',
      },
    ];

    setMessages(optimisticMessages);
    setInput('');
  }

  return (
    <div className="flex h-full flex-1 flex-col bg-neutral-950 text-white">
      <div className="flex-1 overflow-y-auto px-6 py-10">
        <ul className="mx-auto flex w-full max-w-3xl flex-col gap-3">{conversation}</ul>
      </div>
      <form
        onSubmit={handleSubmit}
        className="border-t border-white/10 bg-black/60 px-6 py-5 backdrop-blur"
        aria-label="Send a message to xCoder"
      >
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-3xl border border-white/10 bg-neutral-900/80 px-4 py-2">
          <label htmlFor="prompt" className="sr-only">
            Prompt
          </label>
          <input
            id="prompt"
            name="prompt"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Describe what you would like to build..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none"
            autoComplete="off"
          />
          <button
            type="submit"
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
