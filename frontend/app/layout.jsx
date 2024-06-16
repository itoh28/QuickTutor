import { Inter } from 'next/font/google';
import './globals.css';
import GetCsrfToken from './_components/GetCsrfToken';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'QuickTutor',
  description: '誰でも手軽にマニュアルの作成・閲覧ができます。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
