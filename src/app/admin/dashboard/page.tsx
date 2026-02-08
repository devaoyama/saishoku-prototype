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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const mockPartner = {
  id: "1",
  name: "山田 花子",
  imageUrl:
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
};

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

export default function AdminPartnerDashboardPage() {
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
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img
            src={mockPartner.imageUrl}
            alt={mockPartner.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-border"
          />
          <div>
            <p className="text-sm text-muted-foreground">
              パートナーダッシュボード
            </p>
            <h1 className="text-xl font-bold text-foreground">
              {mockPartner.name}
            </h1>
          </div>
        </div>
        <Link href="/admin/slots">
          <Button variant="outline" size="sm">
            <Settings size={16} className="mr-2" />
            予約枠管理
          </Button>
        </Link>
      </div>

      <Card className="border border-border bg-card shadow-sm mb-6 overflow-hidden">
        <div
          className={`p-4 ${
            isAvailable ? "bg-green-600" : "bg-slate-500"
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
              className="data-[state=checked]:bg-white data-[state=checked]:text-green-600"
            />
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-medium text-foreground mb-4">対応可能形式</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="video"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Video size={18} className="text-slate-600" />
                ビデオ相談OK
              </Label>
              <Switch
                id="video"
                checked={videoEnabled}
                onCheckedChange={setVideoEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="audio"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Mic size={18} className="text-slate-600" />
                音声のみOK
              </Label>
              <Switch
                id="audio"
                checked={audioEnabled}
                onCheckedChange={setAudioEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border bg-card shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-slate-600" />
              <h2 className="font-bold text-foreground">本日の予約</h2>
              <Badge variant="secondary">{mockTodayBookings.length}件</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {format(today, "yyyy年M月d日（E）", { locale: ja })}
            </p>
          </div>

          {mockTodayBookings.length > 0 ? (
            <div className="space-y-4">
              {mockTodayBookings.map((booking, index) => (
                <div
                  key={booking.id}
                  className={`p-4 rounded-lg bg-muted ${
                    index === 0 ? "ring-2 ring-slate-400" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Clock size={18} className="text-slate-600" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">
                          {booking.time}
                        </p>
                        {index === 0 && (
                          <Badge className="bg-slate-600 text-white text-xs">
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
                      <Button size="sm" variant="default">
                        <Video size={14} className="mr-1" />
                        Zoom
                        <ExternalLink size={12} className="ml-1" />
                      </Button>
                    </a>
                  </div>
                  <div className="pl-13 space-y-2">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-muted-foreground" />
                      <p className="text-sm text-foreground">
                        {booking.userName}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        ({booking.userEmail})
                      </span>
                    </div>
                    {booking.topic && (
                      <p className="text-sm text-muted-foreground bg-card p-2 rounded border border-border">
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
                className="mx-auto mb-4 text-muted-foreground"
              />
              <p className="text-muted-foreground">本日の予約はありません</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/admin/slots">
          <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Calendar size={18} className="text-slate-600" />
                  </div>
                  <span className="font-medium text-foreground">
                    予約枠を管理
                  </span>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/profile">
          <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Users size={18} className="text-slate-600" />
                  </div>
                  <span className="font-medium text-foreground">
                    プロフィールを編集
                  </span>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/ai/resume">
          <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Sparkles size={18} className="text-green-600" />
                  </div>
                  <span className="font-medium text-foreground">
                    AI履歴書作成
                  </span>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
