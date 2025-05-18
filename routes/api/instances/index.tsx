import { define } from "../../../utils.ts";

export type Instance = {
  url: string;
  apiKey: string;
  name: string;
  id: string;
};

function getItems(): Instance[] {
  return [
    {
      "id": "1",
      "url": "http://15.204.243.201",
      "apiKey": "ptlc_",
      "name": "Instance 1",
    }
  ];
}

// Store and export mock data
export const instances: Instance[] = getItems();

export const handler = define.handlers({
  GET(ctx) {
    return Response.json(instances);
  },
});
