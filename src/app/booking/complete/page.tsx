"use client";

import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Mail,
  User,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";
import { FloatingFlowers } from "@/components/flower-decoration";
import { Footer, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { partners } from "@/lib/mock-data";

function BookingCompleteContent() {
  const searchParams = useSearchParams();
  const partnerId = searchParams.get("partner");
  const dateStr = searchParams.get("date");
  const time = searchParams.get("time");

  const partner = partners.find((p) => p.id === partnerId);
  const date = dateStr ? parseISO(dateStr) : null;

  // Mock Zoom URL
  const zoomUrl = "https://zoom.us/j/1234567890?pwd=example";

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(zoomUrl);
    toast.success("URLをコピーしました");
  };

  return (
    <main className="relative z-10 min-h-screen pt-20">
      <section className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
              予約が完了しました！
            </h1>
            <p className="text-[var(--muted-foreground)]">
              確認メールをお送りしましたのでご確認ください
            </p>
          </div>

          {/* Booking Details Card */}
          <Card className="border-none shadow-soft mb-6 overflow-hidden animate-fade-in-up stagger-1">
            <div className="bg-bloom-gradient p-4 text-white">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Calendar size={20} />
                予約内容
              </h2>
            </div>
            <CardContent className="p-6 space-y-4">
              {/* Partner */}
              {partner && (
                <div className="flex items-center gap-4 pb-4 border-b border-[var(--border)]">
                  <img
                    src={partner.imageUrl}
                    alt={partner.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[var(--accent)]"
                  />
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      担当パートナー
                    </p>
                    <p className="font-bold text-[var(--foreground)]">
                      {partner.name}
                    </p>
                    <p className="text-sm text-[var(--primary)]">
                      {partner.tagline}
                    </p>
                  </div>
                </div>
              )}

              {/* Date & Time */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--input)] flex items-center justify-center">
                  <Clock size={20} className="text-[var(--primary)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">日時</p>
                  <p className="font-bold text-[var(--foreground)]">
                    {date
                      ? format(date, "yyyy年M月d日（E）", { locale: ja })
                      : ""}{" "}
                    {time}
                  </p>
                </div>
              </div>

              {/* Zoom URL */}
              <div className="p-4 bg-[var(--muted)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Video size={18} className="text-[var(--secondary)]" />
                  <p className="font-medium text-[var(--foreground)]">
                    Zoom参加URL
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={zoomUrl}
                    readOnly
                    className="flex-1 bg-white border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] truncate"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyUrl}
                    className="shrink-0"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-2">
                  ※ 当日はこのURLからZoomミーティングに参加してください
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Email Notice */}
          <Card className="border-none shadow-soft mb-6 animate-fade-in-up stagger-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--input)] flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--foreground)] mb-1">
                    確認メールをお送りしました
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    予約の詳細とZoom URLを記載したメールをお送りしました。
                    メールが届かない場合は迷惑メールフォルダをご確認ください。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="border-none shadow-soft mb-6 animate-fade-in-up stagger-3">
            <CardContent className="p-6">
              <h3 className="font-bold text-[var(--foreground)] mb-4">
                当日までの準備
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-green-500 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      Zoomのインストール
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      スムーズに参加するため、事前にZoomアプリのインストールをおすすめします
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-green-500 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      静かな環境の確保
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      可能であれば、集中して話せる静かな場所をご用意ください
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-green-500 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      顔出しは任意です
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      音声のみでの参加もOKです。リラックスしてご参加ください
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up stagger-4">
            <a
              href={zoomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full btn-gradient rounded-full py-6 text-lg">
                <Video size={20} className="mr-2" />
                Zoomを開く
                <ExternalLink size={18} className="ml-2" />
              </Button>
            </a>
            <Link href="/mypage" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-[var(--primary)] text-[var(--primary)] rounded-full py-6 text-lg"
              >
                <User size={20} className="mr-2" />
                マイページへ
              </Button>
            </Link>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-[var(--muted-foreground)]"
              >
                トップページに戻る
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function BookingCompletePage() {
  return (
    <>
      <Header />
      <FloatingFlowers />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <BookingCompleteContent />
      </Suspense>
      <Footer />
    </>
  );
}
