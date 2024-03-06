import { NftItem } from "@/utils/api/ton/types";

export interface AdaptedNftItem extends NftItem {
  friendlyAddress: string;
}
