import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { docs, meta } from "../../.source/server";
import { loader } from "fumadocs-core/source";

export const source = loader({
  baseUrl: "/docs",
  source: toFumadocsSource(docs, meta),
});
