"use client";

import {
  BarChart3,
  Briefcase,
  ChevronRight,
  FileText,
  Link2,
  Settings,
  Tag,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  candidates,
  funnelData,
  jobs,
  selections,
} from "@/lib/mock-data";

export default function AdminDashboard() {
  // サマリー統計
  const activeCandidates = candidates.filter(
    (c) => c.status === "in_progress" || c.status === "new"
  ).length;
  const matchedCandidates = candidates.filter(
    (c) => c.status === "matched" || c.status === "hired"
  ).length;
  const activeJobs = jobs.filter((j) => j.status === "active").length;
  const activeSelections = selections.filter(
    (s) => !["hired", "rejected", "declined"].includes(s.status)
  ).length;

  // 今月の内定数
  const hiredThisMonth = selections.filter(
    (s) => s.status === "hired"
  ).length;

  // 決定率（簡易計算）
  const decisionRate = funnelData.find((f) => f.stage === "入社決定")?.conversionRate || 0;

  const menuItems = [
    {
      title: "候補者管理",
      description: "候補者の一覧・詳細・タグ編集",
      icon: Users,
      href: "/admin/candidates",
      badge: `${activeCandidates}名対応中`,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "求人管理",
      description: "求人の一覧・詳細・タグ編集",
      icon: Briefcase,
      href: "/admin/jobs",
      badge: `${activeJobs}件公開中`,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "マッチング・選考管理",
      description: "選考状況の管理・結果入力",
      icon: UserCheck,
      href: "/admin/selections",
      badge: `${activeSelections}件進行中`,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "タグマスタ管理",
      description: "性格・志向性・カルチャータグの管理",
      icon: Tag,
      href: "/admin/tags",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "外部連携",
      description: "各アカウントのGoogleカレンダーAPI登録",
      icon: Link2,
      href: "/admin/integrations",
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Settings size={24} className="text-slate-600" />
          <h1 className="text-2xl font-bold text-foreground">
            運営ダッシュボード
          </h1>
        </div>
        <p className="text-muted-foreground">
          CRM・選考管理・AI機能・外部連携など、運営に必要な機能にアクセスできます
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users size={20} className="text-blue-500" />
              <TrendingUp size={16} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {activeCandidates}
            </p>
            <p className="text-xs text-muted-foreground">対応中候補者</p>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Briefcase size={20} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold text-foreground">{activeJobs}</p>
            <p className="text-xs text-muted-foreground">公開中求人</p>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <FileText size={20} className="text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {hiredThisMonth}
            </p>
            <p className="text-xs text-muted-foreground">今月の内定</p>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 size={20} className="text-slate-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {decisionRate}%
            </p>
            <p className="text-xs text-muted-foreground">決定率</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center`}
                  >
                    <item.icon size={24} className={item.color} />
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>
                <div className="flex items-center text-slate-600 text-sm font-medium">
                  詳細を見る
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-foreground mb-4">クイックアクション</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/candidates?status=new">
            <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">
                      新規候補者を確認
                    </p>
                    <p className="text-sm text-muted-foreground">
                      初回面談待ちの候補者がいます
                    </p>
                  </div>
                  <Badge className="bg-blue-500 text-white">
                    {candidates.filter((c) => c.status === "new").length}件
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/selections?status=offer">
            <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">
                      内定承諾待ちを確認
                    </p>
                    <p className="text-sm text-muted-foreground">
                      条件交渉中の案件があります
                    </p>
                  </div>
                  <Badge className="bg-green-500 text-white">
                    {selections.filter((s) => s.status === "offer").length}件
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
