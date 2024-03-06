import { getNftsData } from "@/utils/api/ton";

export const adaptedNftsData = async (addresses: string[]) => {
  const data = (await getNftsData(addresses)).nft_items.map(
    (metadata, index) => ({
      ...metadata,
      friendlyAddress: addresses[index],
    })
  );
  return data
};
