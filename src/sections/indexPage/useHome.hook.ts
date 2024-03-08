import { useCallback, useEffect, useRef, useState } from "react";
import { NftItem } from "@/utils/api/ton/types";
import { getNftsData } from "@/utils/api/ton";
import { STATUS } from "@/utils/api/status";

export const countsToFirstView = 5;
export const timeForRerequest = 5000;

export const useHome = (frendsAddresses: string[], nftsData: NftItem[]) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [nfts, setNfts] = useState(nftsData);
  const refLoader = useRef<HTMLDivElement>(null);
  let refTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    },
    []
  );

  const setNewNfts = async (nextAddresses: string[]) => {
    const nftsData = await getNftsData(nextAddresses);
    if ("nft_items" in nftsData) {
      setNfts([...nfts, ...nftsData.nft_items]);
      setLoading(false);
      return;
    }

    return nftsData;
  };

  useEffect(() => {
    if (nfts.length >= frendsAddresses.length) {
      return;
    }
    if (page !== 1) {
      (async () => {
        try {
          setLoading(true);
          setError(false);
          const nextAddresses = [...frendsAddresses].splice(
            nfts.length,
            countsToFirstView
          );

          const nftsData = await setNewNfts(nextAddresses);
          if (nftsData?.status === STATUS.TOO_MANY_REQUESTS) {
            refTimeout.current = setTimeout(async () => {
              await setNewNfts(nextAddresses);
            }, timeForRerequest);
          }
        } catch {
          setLoading(false);
          setError(true);
        }
      })();
    }

    return () => {
      refTimeout.current && clearTimeout(refTimeout.current);
    };
  }, [page]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (refLoader.current) observer.observe(refLoader.current);
  }, [handleObserver]);

  return { nfts, refLoader, loading, error };
};
