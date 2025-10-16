import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { Form, useActionData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import { orchestrate } from "../../src/agents/orchestrator";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const prompt = formData.get("prompt") as string;
  const result = await orchestrate(prompt);
  return json({ result });
}

export default function Index() {
  const actionData = useActionData<typeof action>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", padding: "2rem" }}>
      <h1>Welcome to xCoder</h1>
      <p>Enter a prompt to generate a React component.</p>
      <Form method="post">
        <input type="text" name="prompt" style={{ width: "100%", padding: "0.5rem" }} />
        <button type="submit" style={{ marginTop: "1rem" }}>Generate</button>
      </Form>
      {actionData?.result && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Generated Code:</h2>
          <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "0.25rem" }}>
            <code>{actionData.result}</code>
          </pre>
        </div>
      )}
    </div>
  );
}