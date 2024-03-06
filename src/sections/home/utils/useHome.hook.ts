import { useCallback, useEffect, useRef, useState } from "react";
import { AdaptedNftItem } from "./types";
import { adaptedNftsData } from "./adaptedNftsData";

export const countsToFirstView = 5;

export const useHome = (
  frendsAddresses: string[],
  nftsData: AdaptedNftItem[]
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [nfts, setNfts] = useState(nftsData);
  const refLoader = useRef<HTMLDivElement>(null);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    },
    []
  );

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
          const nftsData = await adaptedNftsData(nextAddresses);
          setNfts([...nfts, ...nftsData]);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setError(true);
        }
      })();
    }
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
