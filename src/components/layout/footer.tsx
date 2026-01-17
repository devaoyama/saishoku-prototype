import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-bloom-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">才</span>
              </div>
              <span className="font-bold text-lg text-[var(--foreground)]">
                才職<span className="text-[var(--primary)]">エージェント</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              今よりもっと輝ける。
              <br />
              才能を、最適な職へ。
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--input)] flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--primary)] hover:text-white transition-all"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--input)] flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--primary)] hover:text-white transition-all"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Service Links */}
          <div>
            <h3 className="font-bold text-[var(--foreground)] mb-4">
              サービス
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  即時面談
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  予約面談
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  パートナー一覧
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-[var(--foreground)] mb-4">
              サポート
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  サービス紹介
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  よくある質問
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-[var(--foreground)] mb-4">法的情報</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/company"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  運営会社
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <p className="text-center text-sm text-[var(--muted-foreground)]">
            © 2026 才職エージェント All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
