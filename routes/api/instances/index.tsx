import { define } from "../../../utils.ts";

export type Instance = {
  object: "instance";
  attributes: {
    id: string;
    url: string;
    apiKey: string;
    name: string;
  };
};

type Instances = {
  object: "list";
  data: Instance[];
};

function getInstances(): Instances {
  return {
    object: "list",
    data: [
      {
        object: "instance",
        attributes: {
          id: "1",
          url: "http://15.204.243.201",
          apiKey: "ptlc_",
          name: "Instance 1",
        },
      },
    ],
  };
}

// Store and export mock data
const instanceList = getInstances();
export const instances = instanceList.data;

/* Todo
 - Omit keys unless ?include=keys (or similar) is specified
 - Add query: type	Optional	string	The type of user. Possible values: admin, admin-all, owner.
*/
export const handler = define.handlers({
  GET(_ctx) {
    return Response.json(instanceList);
  },
});
