export interface NftItem {
  address: string;
  approved_by: string[];
  collection: Collection;
  index: number;
  metadata: Metadata;
  owner: Owner;
  previews: PreviewItem[];
  verified: boolean;
}

export type NftsData = { nft_items: NftItem[] }

export interface Collection {
  address: string;
  description: string;
  name: string;
}

export interface Metadata {
  attributes: Attribute[];
  description: string;
  image: string;
  marketplace: string;
  name: string;
}

export interface Attribute {
  discount: number;
  ref: number;
  trait_type: string;
  value: string;
  weight: number;
}

export interface Owner {
  address: string;
  is_scam: boolean;
  is_wallet: boolean;
}

export interface PreviewItem {
  resolution: string;
  url: string;
}
