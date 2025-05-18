import { define } from "../../../../utils.ts";

export interface SFTPDetails {
  ip: string;
  port: string;
}

export interface Limits {
  memory: number;
  swap: number;
  disk: number;
  io: number;
  cpu: number;
  threads: null;
  oom_disabled: boolean;
}

export interface FeatureLimits {
  databases: number;
  allocations: number;
  backups: number;
}

export interface Allocation {
  object: "allocation";
  attributes: {
    id: number;
    ip: string;
    ip_alias: string;
    port: number;
    notes: string | null;
    is_default: boolean;
  };
}

export interface EggVariable {
  name: string;
  description: string;
  env_variable: string;
  default_value: string;
  server_value: string;
  is_editable: boolean;
  rules: string;
}

export interface Relationships {
  allocations: {
    object: "list";
    data: Allocation[];
  };
  variables: {
    object: "list";
    data: EggVariable[];
  };
}

type EggFeature = "eula" | "java_version" | "gsl_token" | "pid_limit" | "steam_disk_space";

export interface ServerAttributes {
  server_owner: boolean;
  identifier: string;
  internal_id: number;
  uuid: string;
  name: string;
  node: string;
  is_node_under_maintenance: string;
  sftp_details: SFTPDetails;
  description: string;
  limits: Limits;
  invocation: string;
  docker_image: string;
  egg_features: EggFeature[]; // eula, java_version, gsl_token, pid_limit, steam_disk_space
  feature_limits: FeatureLimits;
  status: null;
  is_suspended: boolean;
  is_installing: boolean;
  is_transferring: boolean;
  relationships: Relationships;
}

export interface Server {
  object: "server";
  attributes: ServerAttributes;
}

export interface Servers {
  object: "list";
  data: Server[];
  meta: Meta;
}

export interface Meta {
  pagination: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
}

async function getInstanceData(url: string, apiKey: string): Promise<Servers> {
  const res = await fetch(`${url}/api/client`, {
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

    const servers = await getInstanceData(
      instance.attributes.url,
      instance.attributes.apiKey,
    );

    return Response.json(servers);
  },
});
