// Does not follow Pterodactyl's path of /files/list rather just /files

import { define } from "../../../../../../utils.ts";

interface FileAttributes {
  name: string;
  mode: string;
  mode_bits: string;
  size: number;
  is_file: boolean;
  is_symlink: boolean;
  mimetype: string;
  created_at: string;
  modified_at: string;
}

interface FileObject {
  object: 'file_object';
  attributes: FileAttributes;
}

export interface Files {
  object: 'list';
  data: FileObject[];
}

async function getServerFiles(
  uuid: string,
  url: string,
  apiKey: string,
): Promise<Files> {
  const res = await fetch(`${url}/api/client/servers/${uuid}/files/list`, {
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

    const files = await getServerFiles(
      serverId,
      instance.attributes.url,
      instance.attributes.apiKey,
    );

    return Response.json(files);
  },
});
