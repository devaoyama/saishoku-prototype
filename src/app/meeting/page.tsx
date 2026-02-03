"use client";

import {
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  Phone,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { FloatingFlowers } from "@/components/flower-decoration";
import { Footer, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { partners } from "@/lib/mock-data";

function MeetingContent() {
  const searchParams = useSearchParams();
  const partnerId = searchParams.get("partner");
  const connectionType = searchParams.get("type") || "zoom"; // zoom or phone
  const partner = partners.find((p) => p.id === partnerId);

  // Mock Zoom URL and Phone Number
  const zoomUrl = "https://zoom.us/j/1234567890?pwd=example";
  const phoneNumber = "03-1234-5678"; // パートナーの電話番号（IP電話）

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
              準備完了！
            </h1>
            <p className="text-[var(--muted-foreground)]">
              お好みの方法で面談を開始してください
            </p>
          </div>

          {/* Partner Info */}
          {partner && (
            <Card className="border-none shadow-soft mb-6 animate-fade-in-up stagger-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={partner.imageUrl}
                      alt={partner.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[var(--accent)]"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)] mb-1">
                      担当パートナー
                    </p>
                    <p className="font-bold text-lg text-[var(--foreground)]">
                      {partner.name}
                    </p>
                    <p className="text-sm text-[var(--primary)]">
                      {partner.tagline}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Connection Options */}
          <Card className="border-none shadow-soft overflow-hidden animate-fade-in-up stagger-2">
            <Tabs defaultValue={connectionType} className="w-full">
              <TabsList className="w-full rounded-none border-b">
                <TabsTrigger value="zoom" className="flex-1">
                  <Video size={16} className="mr-2" />
                  Zoomで参加
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex-1">
                  <Phone size={16} className="mr-2" />
                  電話で参加
                </TabsTrigger>
              </TabsList>

              {/* Zoom Tab */}
              <TabsContent value="zoom" className="mt-0">
                <div className="bg-bloom-gradient text-white p-8 text-center relative">
                  <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-white/10 blur-3xl" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <Video size={32} />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Zoomミーティング</h2>
                    <p className="text-white/80 text-sm mb-6">
                      パートナーがお待ちしています
                    </p>
                    <a
                      href={zoomUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button className="bg-white text-[var(--primary)] hover:bg-white/90 rounded-full px-8 py-6 text-lg font-bold animate-pulse-glow">
                        <Video size={20} className="mr-2" />
                        Zoomに参加する
                        <ExternalLink size={18} className="ml-2" />
                      </Button>
                    </a>
                  </div>
                </div>
              </TabsContent>

              {/* Phone Tab */}
              <TabsContent value="phone" className="mt-0">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 text-center relative">
                  <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-white/10 blur-3xl" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <Phone size={32} />
                    </div>
                    <h2 className="text-xl font-bold mb-2">電話で相談</h2>
                    <p className="text-white/80 text-sm mb-2">
                      下のボタンをタップして電話をかけてください
                    </p>
                    <p className="text-white/60 text-xs mb-6">
                      ※ 通話料はお客様負担となります
                    </p>
                    <a href={`tel:${phoneNumber.replace(/-/g, "")}`} className="inline-block">
                      <Button className="bg-white text-green-600 hover:bg-white/90 rounded-full px-8 py-6 text-lg font-bold animate-pulse-glow">
                        <Phone size={20} className="mr-2" />
                        {phoneNumber}に電話する
                      </Button>
                    </a>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Tips */}
          <Card className="border-none shadow-soft mt-6 animate-fade-in-up stagger-3">
            <CardContent className="p-6">
              <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <MessageCircle size={18} className="text-[var(--primary)]" />
                面談のヒント
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-green-500 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      顔出しなしでもOK
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      音声のみでリラックスしてお話しいただけます
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
                      途中退出も自由
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      無理のない範囲でご参加ください
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
                      雑談感覚でOK
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      転職の意思が固まっていなくても大丈夫です
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Time Notice */}
          <div className="mt-6 p-4 bg-[var(--muted)] rounded-lg flex items-center gap-3 animate-fade-in-up stagger-4">
            <Clock size={20} className="text-[var(--muted-foreground)]" />
            <p className="text-sm text-[var(--muted-foreground)]">
              面談時間の目安は
              <span className="font-medium text-[var(--foreground)]">
                30分〜60分
              </span>
              程度です。
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link href="/">
              <Button
                variant="outline"
                className="border-[var(--border)] text-[var(--muted-foreground)]"
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

export default function MeetingPage() {
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
        <MeetingContent />
      </Suspense>
      <Footer />
    </>
  );
}
