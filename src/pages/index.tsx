import Image from "next/image";
import styles from "@/sections/home/styles/home.module.css";
import { HeadIndex } from "@/layout/head/head";
import { Header } from '@/layout/header/header';

export default function Home() {
  return (
    <>
      <HeadIndex title='TON NFT' description='TON NFT application'/>
      <Header />
      <main className={styles.main}>
      </main>
    </>
  );
}
