// Ensures a valid instance is provided and provides the associated api key
import { FreshContext } from "fresh";
import { Instance, instances } from "../index.tsx";

interface State {
  instance: Instance;
}

function getInstance(id: string): Instance | null {
  return instances.find((instance) => instance.attributes.id === id) ?? null;
}

export async function handler(
  ctx: FreshContext<State>,
) {
  const id = ctx.params.instanceId;
  const item = getInstance(id);

  if (item === null) {
    throw new Deno.errors.NotFound("Instance not found");
  }

  ctx.state.instance = item;
  const resp = await ctx.next();
  return resp;
}
