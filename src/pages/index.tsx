import styles from "@/sections/home/styles/home.module.css";
import { HeadIndex } from "@/layout/head/head";
import { Header } from "@/layout/header/header";
import { getTable } from "@/utils/api/noiton";
import { AdaptedNftItem } from "@/sections/home/utils/types";
import { adaptedNftsData } from "@/sections/home/utils/adaptedNftsData";
import { countsToFirstView, useHome } from "@/sections/home/utils/useHome.hook";

export interface HomeProps {
  frendsAddresses: string[];
  nftsData: AdaptedNftItem[];
}

export default function Home({ frendsAddresses, nftsData }: HomeProps) {
  const { nfts, refLoader, loading, error } = useHome(
    frendsAddresses,
    nftsData
  );

  return (
    <>
      <HeadIndex title="TON NFT" description="TON NFT application" />
      <Header />
      <main className={styles.main}>
        {nfts.map((nft) => (
          <div className={styles.nftItem} key={nft.friendlyAddress}>
            <img
              width={100}
              height={100}
              src={nft.previews[1].url}
              alt={nft.metadata.name}
            />
            <div>NFT friendly address: {nft.friendlyAddress}</div>
            <div>NFT raw address: {nft.address}</div>
            <div>Owner address: {nft.owner.address}</div>
            <div>Name: {nft.metadata.name}</div>
            <div>
              Description:{" "}
              {nft.metadata.description || "There is no description"}
            </div>
          </div>
        ))}
        <div ref={refLoader}></div>
        {loading && <div>LOADING...</div>}
        {error && <div>Something went wrong.</div>}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const nftTableRows = await getTable();

  const frendsAddresses = nftTableRows.map(
    (item) => item.table_row.cells[0][0].plain_text
  );

  const firstAddresses = [...frendsAddresses].splice(0, countsToFirstView);

  const nftsData = await adaptedNftsData(firstAddresses);

  return { props: { frendsAddresses, nftsData }, revalidate: 600 };
}
