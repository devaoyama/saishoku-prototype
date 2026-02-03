"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FloatingFlowers } from "@/components/flower-decoration";
import { Footer, Header } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cvMetrics, funnelData } from "@/lib/mock-data";

// 経路別の集計データを計算
const sourceMetrics = cvMetrics.reduce(
  (acc, metric) => {
    if (!acc[metric.source]) {
      acc[metric.source] = {
        source: metric.source,
        impressions: 0,
        clicks: 0,
        registrations: 0,
        meetings: 0,
      };
    }
    acc[metric.source].impressions += metric.impressions;
    acc[metric.source].clicks += metric.clicks;
    acc[metric.source].registrations += metric.registrations;
    acc[metric.source].meetings += metric.meetings;
    return acc;
  },
  {} as Record<
    string,
    {
      source: string;
      impressions: number;
      clicks: number;
      registrations: number;
      meetings: number;
    }
  >
);

const sourceData = Object.values(sourceMetrics);

const COLORS = ["#FF6B9D", "#C77DFF", "#7B68EE", "#4ECDC4", "#45B7D1", "#F7DC6F"];

export default function AnalyticsPage() {
  // サマリー計算
  const totalRegistrations = sourceData.reduce(
    (sum, s) => sum + s.registrations,
    0
  );
  const totalMeetings = sourceData.reduce((sum, s) => sum + s.meetings, 0);
  const overallCVR = totalRegistrations > 0
    ? ((totalMeetings / totalRegistrations) * 100).toFixed(1)
    : "0";

  return (
    <>
      <Header />
      <FloatingFlowers />

      <main className="relative z-10 min-h-screen pt-20 bg-gray-50">
        <section className="px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <Link
                href="/admin"
                className="inline-flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-4"
              >
                <ArrowLeft size={16} className="mr-1" />
                運営ダッシュボードに戻る
              </Link>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-[var(--foreground)]">
                    CV計測・分析
                  </h1>
                  <p className="text-[var(--muted-foreground)]">
                    経路別CV計測・ファネル分析
                  </p>
                </div>
                <Select defaultValue="7d">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">過去7日間</SelectItem>
                    <SelectItem value="30d">過去30日間</SelectItem>
                    <SelectItem value="90d">過去90日間</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-none shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 size={20} className="text-blue-500" />
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      <ArrowUp size={12} className="mr-1" />
                      12%
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">
                    {totalRegistrations}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    総登録数
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp size={20} className="text-green-500" />
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      <ArrowUp size={12} className="mr-1" />
                      8%
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">
                    {totalMeetings}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    面談実施数
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 size={20} className="text-purple-500" />
                    <Badge className="bg-red-100 text-red-700 text-xs">
                      <ArrowDown size={12} className="mr-1" />
                      3%
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">
                    {overallCVR}%
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    面談転換率
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 size={20} className="text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">
                    {funnelData.find((f) => f.stage === "入社決定")?.count || 0}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    入社決定数
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="source" className="space-y-6">
              <TabsList>
                <TabsTrigger value="source">経路別分析</TabsTrigger>
                <TabsTrigger value="funnel">ファネル分析</TabsTrigger>
              </TabsList>

              {/* Source Analysis */}
              <TabsContent value="source">
                <Card className="border-none shadow-soft">
                  <CardContent className="p-6">
                    <h2 className="font-bold text-[var(--foreground)] mb-4">
                      経路別CV計測
                    </h2>

                    <div className="h-80 mb-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sourceData} layout="vertical">
                          <XAxis type="number" />
                          <YAxis
                            type="category"
                            dataKey="source"
                            width={120}
                            tick={{ fontSize: 12 }}
                          />
                          <Tooltip />
                          <Bar
                            dataKey="registrations"
                            fill="#FF6B9D"
                            name="登録数"
                            radius={[0, 4, 4, 0]}
                          />
                          <Bar
                            dataKey="meetings"
                            fill="#C77DFF"
                            name="面談数"
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Source Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[var(--border)]">
                            <th className="text-left py-3 px-4 font-medium text-[var(--muted-foreground)]">
                              経路
                            </th>
                            <th className="text-right py-3 px-4 font-medium text-[var(--muted-foreground)]">
                              インプレッション
                            </th>
                            <th className="text-right py-3 px-4 font-medium text-[var(--muted-foreground)]">
                              クリック
                            </th>
                            <th className="text-right py-3 px-4 font-medium text-[var(--muted-foreground)]">
                              登録
                            </th>
                            <th className="text-right py-3 px-4 font-medium text-[var(--muted-foreground)]">
                              面談
                            </th>
                            <th className="text-right py-3 px-4 font-medium text-[var(--muted-foreground)]">
                              CVR
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sourceData.map((source) => (
                            <tr
                              key={source.source}
                              className="border-b border-[var(--border)] hover:bg-[var(--muted)]"
                            >
                              <td className="py-3 px-4 font-medium text-[var(--foreground)]">
                                {source.source}
                              </td>
                              <td className="py-3 px-4 text-right text-[var(--muted-foreground)]">
                                {source.impressions.toLocaleString()}
                              </td>
                              <td className="py-3 px-4 text-right text-[var(--muted-foreground)]">
                                {source.clicks.toLocaleString()}
                              </td>
                              <td className="py-3 px-4 text-right text-[var(--foreground)] font-medium">
                                {source.registrations}
                              </td>
                              <td className="py-3 px-4 text-right text-[var(--foreground)] font-medium">
                                {source.meetings}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <Badge
                                  className={
                                    (source.meetings / source.registrations) *
                                      100 >
                                    50
                                      ? "bg-green-100 text-green-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }
                                >
                                  {(
                                    (source.meetings / source.registrations) *
                                    100
                                  ).toFixed(1)}
                                  %
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Funnel Analysis */}
              <TabsContent value="funnel">
                <Card className="border-none shadow-soft">
                  <CardContent className="p-6">
                    <h2 className="font-bold text-[var(--foreground)] mb-4">
                      選考ファネル分析
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Funnel Chart */}
                      <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                          <FunnelChart>
                            <Tooltip />
                            <Funnel
                              dataKey="count"
                              data={funnelData}
                              isAnimationActive
                            >
                              <LabelList
                                position="right"
                                fill="#333"
                                stroke="none"
                                dataKey="stage"
                              />
                              {funnelData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Funnel>
                          </FunnelChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Funnel Table */}
                      <div>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-[var(--border)]">
                              <th className="text-left py-3 px-4 font-medium text-[var(--muted-foreground)]">
                                ステージ
                              </th>
                              <th className="text-right py-3 px-4 font-medium text-[var(--muted-foreground)]">
                                件数
                              </th>
                              <th className="text-right py-3 px-4 font-medium text-[var(--muted-foreground)]">
                                通過率
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {funnelData.map((stage, index) => (
                              <tr
                                key={stage.stage}
                                className="border-b border-[var(--border)]"
                              >
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-3 h-3 rounded-full"
                                      style={{
                                        backgroundColor:
                                          COLORS[index % COLORS.length],
                                      }}
                                    />
                                    <span className="font-medium text-[var(--foreground)]">
                                      {stage.stage}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-right text-[var(--foreground)] font-medium">
                                  {stage.count}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <Badge className="bg-[var(--input)] text-[var(--foreground)]">
                                    {stage.conversionRate}%
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="mt-6 p-4 bg-[var(--muted)] rounded-lg">
                          <p className="text-sm text-[var(--muted-foreground)]">
                            スカウト→入社決定の全体転換率：
                            <span className="font-bold text-[var(--foreground)] ml-2">
                              {funnelData.find((f) => f.stage === "入社決定")
                                ?.conversionRate || 0}
                              %
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
