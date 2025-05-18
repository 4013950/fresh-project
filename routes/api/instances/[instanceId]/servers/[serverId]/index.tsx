// Missing permissions and more meta in response type

import { define } from "../../../../../../utils.ts";
import { Server } from "../../index.tsx";

async function getServerData(
  uuid: string,
  url: string,
  apiKey: string,
): Promise<Server> {
  const res = await fetch(`${url}/api/client/servers/${uuid}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Deno.errors.InvalidData("Res not ok");

  return res.json();
}

export const handler = define.handlers({
  async GET(ctx) {
    // @ts-ignore wip middleware issue

    const instance = ctx.state.instance;

    const { serverId } = ctx.params;

    const servers = await getServerData(
      serverId,
      instance.attributes.url,
      instance.attributes.apiKey,
    );

    return Response.json(servers);
  },
});
