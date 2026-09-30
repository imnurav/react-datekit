import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
});

export const { docs: changelogDocs, meta: changelogMeta } = defineDocs({
  dir: 'content/changelog',
});

export default defineConfig();
