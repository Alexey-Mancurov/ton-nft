import Head from "next/head";

interface HeadIndexProps {
  title?: string;
  description?: string;
}

export const HeadIndex: React.FC<HeadIndexProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};
