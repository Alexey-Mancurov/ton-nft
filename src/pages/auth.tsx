import { HeadIndex } from "@/layout/head/head";
import Script from "next/script";

export default function Auth() {
  return (
    <div>
      <HeadIndex title="TON NFT auth" description="TON NFT auth" />
      <main>
        <Script
          id="telegram-auth"
          async
          src="https://telegram.org/js/telegram-widget.js?22"
          data-telegram-login="MancLogin_bot"
          data-size="large"
          data-auth-url='https://ton-nft-1vxe.vercel.app'
          data-request-access="write"
        ></Script>
      </main>
    </div>
  );
}
