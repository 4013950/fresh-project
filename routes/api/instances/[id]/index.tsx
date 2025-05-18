import { define } from "../../../../utils.ts";
import { instances } from "../index.tsx";
import type { Instance } from "../[id].tsx/index.tsx";

function getItem(id: string): Instance | null {
  return instances.find((instance) => instance.id === id) ?? null;
}

export const handler = define.handlers({
  async GET(ctx) {
    const id = ctx.params.id;
    const item = getItem(id);
    if (item === null) throw new Deno.errors.NotFound("Item not found");

      const res = await fetch(`${item.url}/api/client`, {
        headers: {
          Authorization: `Bearer ${item.apiKey}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Deno.errors.InvalidData("Res not ok")

    return Response.json(await res.json());
  },
});
