import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "才職エージェント | 今よりもっと輝ける。才能を、最適な職へ。",
  description: "キャリアも、マインドも、ビジュアルも。人間的市場価値の最大化を支援する20代特化型キャリアパートナーサービス",
  keywords: ["転職", "キャリア相談", "20代", "即時面談", "キャリアパートナー"],
  openGraph: {
    title: "才職エージェント | 今よりもっと輝ける。",
    description: "思い立った瞬間に、信頼できる人と話せる即時面談プラットフォーム",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
