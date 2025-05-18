import { App, fsRoutes, staticFiles } from "fresh";
import { type State } from "./utils.ts";

// root configuration required for deno compile
export const app = new App<State>({ root: import.meta.dirname });

app.use(staticFiles());

await fsRoutes(app, {
  loadIsland: (path) => import(`./islands/${path}`),
  loadRoute: (path) => import(`./routes/${path}`),
});

if (import.meta.main) {
  await app.listen();
}

if (Deno.build.standalone) {
  console.log('compiled version')
}