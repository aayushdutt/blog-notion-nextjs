import { Client } from "@notionhq/client";
import { TPost } from "../types";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async (databaseId: string): Promise<TPost[]> => {
  const response: any = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results as TPost[];
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

// export const getPageFromSlug = async (slug) => {
//   const response = await notion.pages.retrieve({ page_id: pageId });
//   return response;
// };

export const getBlocks = async (blockId) => {
  const blocks = [];
  let cursor;
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks;
};
