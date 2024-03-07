import { NftItem } from "./types";

const BASE_URL = "https://tonapi.io/";
const API_VERVION = "v2";
const NFTS_DATA_ENDPOINT = "/nfts/_bulk";

export const getNftsData = async (
  addresses: string[]
): Promise<{ nft_items: NftItem[] }> => {
  const data = (
    await fetch(`${BASE_URL}${API_VERVION}${NFTS_DATA_ENDPOINT}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ account_ids: addresses }),
    })
  ).json();

  return data;
};
