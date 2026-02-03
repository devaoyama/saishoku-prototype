"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink,
  Mic,
  Power,
  Settings,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { FloatingFlowers } from "@/components/flower-decoration";
import { Footer, Header } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Mock partner data (logged in partner)
const mockPartner = {
  id: "1",
  name: "山田 花子",
  imageUrl:
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
};

// Mock today's bookings
const mockTodayBookings = [
  {
    id: "b1",
    userName: "田中 太郎",
    userEmail: "tanaka@example.com",
    time: "10:00",
    topic: "転職の方向性について相談したい",
    zoomUrl: "https://zoom.us/j/1234567890",
  },
  {
    id: "b2",
    userName: "佐藤 花子",
    userEmail: "sato@example.com",
    time: "14:00",
    topic: "",
    zoomUrl: "https://zoom.us/j/0987654321",
  },
  {
    id: "b3",
    userName: "鈴木 一郎",
    userEmail: "suzuki@example.com",
    time: "16:00",
    topic: "年収アップについて",
    zoomUrl: "https://zoom.us/j/1122334455",
  },
];

export default function PartnerDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const handleAvailabilityChange = (checked: boolean) => {
    setIsAvailable(checked);
    toast.success(
      checked ? "即時対応をONにしました" : "即時対応をOFFにしました",
    );
  };

  const today = new Date();

  return (
    <>
      <Header />
      <FloatingFlowers />

      <main className="relative z-10 min-h-screen pt-20 bg-gray-50">
        <section className="px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <img
                  src={mockPartner.imageUrl}
                  alt={mockPartner.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[var(--accent)]"
                />
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    パートナーダッシュボード
                  </p>
                  <h1 className="text-xl font-bold text-[var(--foreground)]">
                    {mockPartner.name}
                  </h1>
                </div>
              </div>
              <Link href="/partner/slots">
                <Button
                  variant="outline"
                  className="border-[var(--primary)] text-[var(--primary)]"
                >
                  <Settings size={16} className="mr-2" />
                  予約枠管理
                </Button>
              </Link>
            </div>

            {/* Status Card */}
            <Card className="border-none shadow-soft mb-6 overflow-hidden">
              <div
                className={`p-4 ${
                  isAvailable ? "bg-green-500" : "bg-gray-400"
                } text-white transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Power size={24} />
                    <div>
                      <h2 className="font-bold text-lg">即時対応ステータス</h2>
                      <p className="text-sm opacity-90">
                        {isAvailable
                          ? "現在、即時面談を受付中です"
                          : "即時面談を停止中です"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isAvailable}
                    onCheckedChange={handleAvailabilityChange}
                    className="data-[state=checked]:bg-white data-[state=checked]:text-green-500"
                  />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-medium text-[var(--foreground)] mb-4">
                  対応可能形式
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="video"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Video size={18} className="text-[var(--primary)]" />
                      ビデオ相談OK
                    </Label>
                    <Switch
                      id="video"
                      checked={videoEnabled}
                      onCheckedChange={setVideoEnabled}
                      className="data-[state=checked]:bg-[var(--primary)]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="audio"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Mic size={18} className="text-[var(--secondary)]" />
                      音声のみOK
                    </Label>
                    <Switch
                      id="audio"
                      checked={audioEnabled}
                      onCheckedChange={setAudioEnabled}
                      className="data-[state=checked]:bg-[var(--secondary)]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Bookings */}
            <Card className="border-none shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={20} className="text-[var(--primary)]" />
                    <h2 className="font-bold text-[var(--foreground)]">
                      本日の予約
                    </h2>
                    <Badge className="bg-[var(--input)] text-[var(--primary)]">
                      {mockTodayBookings.length}件
                    </Badge>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {format(today, "yyyy年M月d日（E）", { locale: ja })}
                  </p>
                </div>

                {mockTodayBookings.length > 0 ? (
                  <div className="space-y-4">
                    {mockTodayBookings.map((booking, index) => (
                      <div
                        key={booking.id}
                        className={`p-4 rounded-lg bg-[var(--muted)] ${
                          index === 0 ? "ring-2 ring-[var(--primary)]" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[var(--input)] flex items-center justify-center">
                              <Clock
                                size={18}
                                className="text-[var(--primary)]"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-[var(--foreground)]">
                                {booking.time}
                              </p>
                              {index === 0 && (
                                <Badge className="bg-[var(--primary)] text-white text-xs">
                                  次の面談
                                </Badge>
                              )}
                            </div>
                          </div>
                          <a
                            href={booking.zoomUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              className={
                                index === 0
                                  ? "btn-gradient"
                                  : "bg-[var(--secondary)]"
                              }
                            >
                              <Video size={14} className="mr-1" />
                              Zoom
                              <ExternalLink size={12} className="ml-1" />
                            </Button>
                          </a>
                        </div>

                        <div className="pl-13 space-y-2">
                          <div className="flex items-center gap-2">
                            <Users
                              size={14}
                              className="text-[var(--muted-foreground)]"
                            />
                            <p className="text-sm text-[var(--foreground)]">
                              {booking.userName}
                            </p>
                            <span className="text-xs text-[var(--muted-foreground)]">
                              ({booking.userEmail})
                            </span>
                          </div>
                          {booking.topic && (
                            <p className="text-sm text-[var(--muted-foreground)] bg-white p-2 rounded">
                              相談テーマ: {booking.topic}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar
                      size={48}
                      className="mx-auto mb-4 text-[var(--muted-foreground)]"
                    />
                    <p className="text-[var(--muted-foreground)]">
                      本日の予約はありません
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/partner/slots">
                <Card className="border-none shadow-soft card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--input)] flex items-center justify-center">
                          <Calendar
                            size={18}
                            className="text-[var(--primary)]"
                          />
                        </div>
                        <span className="font-medium text-[var(--foreground)]">
                          予約枠を管理
                        </span>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-[var(--muted-foreground)]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/partner/recommendations">
                <Card className="border-none shadow-soft card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--input)] flex items-center justify-center">
                          <Sparkles
                            size={18}
                            className="text-[var(--primary)]"
                          />
                        </div>
                        <span className="font-medium text-[var(--foreground)]">
                          おすすめ求人を確認
                        </span>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-[var(--muted-foreground)]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href={`/partners/${mockPartner.id}`}>
                <Card className="border-none shadow-soft card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--input)] flex items-center justify-center">
                          <Users
                            size={18}
                            className="text-[var(--secondary)]"
                          />
                        </div>
                        <span className="font-medium text-[var(--foreground)]">
                          公開プロフィールを確認
                        </span>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-[var(--muted-foreground)]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/ai/resume">
                <Card className="border-none shadow-soft card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--input)] flex items-center justify-center">
                          <Sparkles
                            size={18}
                            className="text-green-500"
                          />
                        </div>
                        <span className="font-medium text-[var(--foreground)]">
                          AI履歴書作成
                        </span>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-[var(--muted-foreground)]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
