import { Client } from "@notionhq/client";
import { TableRowBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export const getTable = async (): Promise<TableRowBlockObjectResponse[]> => {
  const response = await notion.blocks.children.list({
    block_id: process.env.NOTION_TABLE_ID as string,
  });

  return response.results as TableRowBlockObjectResponse[];
};
