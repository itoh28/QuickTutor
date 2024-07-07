import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'QuickTutor',
  description:
    '誰でも手軽にマニュアル作成・閲覧ができるマニュアル管理アプリです。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
