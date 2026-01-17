"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
  Calendar,
  ChevronRight,
  Clock,
  Edit,
  ExternalLink,
  LogOut,
  Mail,
  Phone,
  User,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FloatingFlowers } from "@/components/flower-decoration";
import { Footer, Header } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { partners } from "@/lib/mock-data";

// Mock user data
const mockUser = {
  name: "山田 太郎",
  email: "yamada@example.com",
  phone: "090-1234-5678",
  createdAt: "2026-01-10",
};

// Mock upcoming booking
const mockUpcomingBooking = {
  id: "1",
  partnerId: "1",
  date: "2026-01-20",
  time: "14:00",
  zoomUrl: "https://zoom.us/j/1234567890?pwd=example",
};

// Mock booking history
const mockBookingHistory = [
  {
    id: "h1",
    partnerId: "3",
    date: "2026-01-15",
    time: "11:00",
    status: "completed",
  },
  {
    id: "h2",
    partnerId: "1",
    date: "2026-01-10",
    time: "15:00",
    status: "completed",
  },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<
    "upcoming" | "history" | "profile"
  >("upcoming");

  const upcomingPartner = partners.find(
    (p) => p.id === mockUpcomingBooking.partnerId,
  );

  return (
    <>
      <Header />
      <FloatingFlowers />

      <main className="relative z-10 min-h-screen pt-20">
        <section className="px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
                マイページ
              </h1>
              <p className="text-[var(--muted-foreground)]">
                こんにちは、{mockUser.name}さん
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {[
                { id: "upcoming", label: "次回の面談", icon: Calendar },
                { id: "history", label: "予約履歴", icon: Clock },
                { id: "profile", label: "プロフィール", icon: User },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "upcoming" && (
              <div className="space-y-6 animate-fade-in-up">
                {mockUpcomingBooking ? (
                  <Card className="border-none shadow-soft overflow-hidden">
                    <div className="bg-bloom-gradient p-4 text-white">
                      <h2 className="font-bold text-lg flex items-center gap-2">
                        <Calendar size={20} />
                        次回の面談予定
                      </h2>
                    </div>
                    <CardContent className="p-6">
                      {/* Partner Info */}
                      {upcomingPartner && (
                        <div className="flex items-center gap-4 pb-4 border-b border-[var(--border)] mb-4">
                          <img
                            src={upcomingPartner.imageUrl}
                            alt={upcomingPartner.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-[var(--accent)]"
                          />
                          <div>
                            <p className="text-sm text-[var(--muted-foreground)]">
                              担当パートナー
                            </p>
                            <p className="font-bold text-[var(--foreground)]">
                              {upcomingPartner.name}
                            </p>
                            <p className="text-sm text-[var(--primary)]">
                              {upcomingPartner.tagline}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Date & Time */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--input)] flex items-center justify-center">
                          <Clock size={20} className="text-[var(--primary)]" />
                        </div>
                        <div>
                          <p className="text-sm text-[var(--muted-foreground)]">
                            日時
                          </p>
                          <p className="font-bold text-[var(--foreground)]">
                            {format(
                              new Date(mockUpcomingBooking.date),
                              "yyyy年M月d日（E）",
                              { locale: ja },
                            )}{" "}
                            {mockUpcomingBooking.time}
                          </p>
                        </div>
                      </div>

                      {/* Zoom Button */}
                      <a
                        href={mockUpcomingBooking.zoomUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full btn-gradient rounded-full py-6 text-lg">
                          <Video size={20} className="mr-2" />
                          Zoomに参加する
                          <ExternalLink size={18} className="ml-2" />
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-none shadow-soft">
                    <CardContent className="p-8 text-center">
                      <Calendar
                        size={48}
                        className="mx-auto mb-4 text-[var(--muted-foreground)]"
                      />
                      <h3 className="font-bold text-[var(--foreground)] mb-2">
                        予約された面談はありません
                      </h3>
                      <p className="text-sm text-[var(--muted-foreground)] mb-6">
                        パートナーを選んで面談を予約しましょう
                      </p>
                      <Link href="/#partners">
                        <Button className="btn-gradient rounded-full">
                          パートナーを探す
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Action */}
                <Card className="border-none shadow-soft">
                  <CardContent className="p-4">
                    <Link
                      href="/#partners"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--input)] flex items-center justify-center">
                          <Video size={18} className="text-[var(--primary)]" />
                        </div>
                        <span className="font-medium text-[var(--foreground)]">
                          今すぐ話せるパートナーを探す
                        </span>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-[var(--muted-foreground)]"
                      />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-4 animate-fade-in-up">
                {mockBookingHistory.length > 0 ? (
                  mockBookingHistory.map((booking) => {
                    const bookingPartner = partners.find(
                      (p) => p.id === booking.partnerId,
                    );
                    return (
                      <Card
                        key={booking.id}
                        className="border-none shadow-soft"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            {bookingPartner && (
                              <img
                                src={bookingPartner.imageUrl}
                                alt={bookingPartner.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-[var(--accent)]"
                              />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-bold text-[var(--foreground)]">
                                  {bookingPartner?.name}
                                </p>
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-700 text-xs"
                                >
                                  完了
                                </Badge>
                              </div>
                              <p className="text-sm text-[var(--muted-foreground)]">
                                {format(
                                  new Date(booking.date),
                                  "yyyy年M月d日（E）",
                                  { locale: ja },
                                )}{" "}
                                {booking.time}
                              </p>
                            </div>
                            <Link href={`/partners/${booking.partnerId}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-[var(--primary)] text-[var(--primary)]"
                              >
                                再予約
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <Card className="border-none shadow-soft">
                    <CardContent className="p-8 text-center">
                      <Clock
                        size={48}
                        className="mx-auto mb-4 text-[var(--muted-foreground)]"
                      />
                      <h3 className="font-bold text-[var(--foreground)] mb-2">
                        まだ履歴はありません
                      </h3>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        面談を受けると履歴がここに表示されます
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6 animate-fade-in-up">
                <Card className="border-none shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-[var(--foreground)]">
                        基本情報
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[var(--primary)]"
                      >
                        <Edit size={16} className="mr-1" />
                        編集
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-3 bg-[var(--muted)] rounded-lg">
                        <User size={20} className="text-[var(--primary)]" />
                        <div>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            お名前
                          </p>
                          <p className="font-medium text-[var(--foreground)]">
                            {mockUser.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-3 bg-[var(--muted)] rounded-lg">
                        <Mail size={20} className="text-[var(--primary)]" />
                        <div>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            メールアドレス
                          </p>
                          <p className="font-medium text-[var(--foreground)]">
                            {mockUser.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-3 bg-[var(--muted)] rounded-lg">
                        <Phone size={20} className="text-[var(--primary)]" />
                        <div>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            電話番号
                          </p>
                          <p className="font-medium text-[var(--foreground)]">
                            {mockUser.phone || "未設定"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Logout */}
                <Card className="border-none shadow-soft">
                  <CardContent className="p-4">
                    <button
                      type="button"
                      className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-[var(--muted)] transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <LogOut size={18} className="text-red-500" />
                      </div>
                      <span className="font-medium text-red-500">
                        ログアウト
                      </span>
                    </button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
