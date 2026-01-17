"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    // 現在トップページにいる場合はスクロールのみ
    if (pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // 別ページにいる場合は遷移してからスクロール
      router.push(`/#${sectionId}`);
      // 少し遅延させてスクロール
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }

    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-bloom-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">才</span>
            </div>
            <span className="font-bold text-lg text-[var(--foreground)]">
              才職<span className="text-[var(--primary)]">エージェント</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              ホーム
            </Link>
            <a
              href="/#partners"
              onClick={(e) => scrollToSection(e, "partners")}
              className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors cursor-pointer"
            >
              パートナー一覧
            </a>
            <a
              href="/#how-it-works"
              onClick={(e) => scrollToSection(e, "how-it-works")}
              className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors cursor-pointer"
            >
              サービス紹介
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--input)]"
              >
                ログイン
              </Button>
            </Link>
            <a
              href="/#partners"
              onClick={(e) => scrollToSection(e, "partners")}
            >
              <Button className="btn-gradient rounded-full px-6">
                今すぐ相談する
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-[var(--foreground)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-[var(--border)] animate-fade-in-up">
          <nav className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              ホーム
            </Link>
            <a
              href="/#partners"
              onClick={(e) => scrollToSection(e, "partners")}
              className="block text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors py-2 cursor-pointer"
            >
              パートナー一覧
            </a>
            <a
              href="/#how-it-works"
              onClick={(e) => scrollToSection(e, "how-it-works")}
              className="block text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors py-2 cursor-pointer"
            >
              サービス紹介
            </a>
            <div className="pt-3 border-t border-[var(--border)] space-y-2">
              <Link href="/login" className="block">
                <Button
                  variant="outline"
                  className="w-full border-[var(--primary)] text-[var(--primary)]"
                >
                  ログイン
                </Button>
              </Link>
              <a
                href="/#partners"
                onClick={(e) => scrollToSection(e, "partners")}
                className="block"
              >
                <Button className="w-full btn-gradient rounded-full">
                  今すぐ相談する
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
