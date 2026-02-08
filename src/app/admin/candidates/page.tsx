"use client";

import { ArrowLeft, ChevronRight, Search, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type Candidate,
  candidates,
  partners,
} from "@/lib/mock-data";

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.includes(searchQuery) ||
      candidate.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (candidate.email?.includes(searchQuery) ?? false);
    const matchesStatus =
      statusFilter === "all" || candidate.userStatus === statusFilter;
    const matchesAssignee =
      assigneeFilter === "all" || candidate.assigneeId === assigneeFilter;
    return matchesSearch && matchesStatus && matchesAssignee;
  });

  const getAgentName = (agentId: string) => {
    return partners.find((p) => p.id === agentId)?.name ?? agentId;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          パートナーダッシュボードに戻る
        </Link>
        <h1 className="text-2xl font-bold text-foreground">候補者管理</h1>
        <p className="text-muted-foreground">
          CRM：候補者一覧（リスト表示）
        </p>
      </div>

      <Card className="border border-border bg-card shadow-sm mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="候補者ID・名前・メールで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="ユーザーステータス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="新規">新規</SelectItem>
                <SelectItem value="対応中">対応中</SelectItem>
                <SelectItem value="マッチング済">マッチング済</SelectItem>
                <SelectItem value="入社決定">入社決定</SelectItem>
                <SelectItem value="辞退">辞退</SelectItem>
              </SelectContent>
            </Select>
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="担当者" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                {partners.map((partner) => (
                  <SelectItem key={partner.id} value={partner.id}>
                    {partner.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredCandidates.length}件の候補者
        </p>
      </div>

      <Card className="border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-foreground">候補者ID</th>
                <th className="text-left p-3 font-medium text-foreground">作成者</th>
                <th className="text-left p-3 font-medium text-foreground">担当者</th>
                <th className="text-left p-3 font-medium text-foreground">名前</th>
                <th className="text-left p-3 font-medium text-foreground">生まれ年</th>
                <th className="text-left p-3 font-medium text-foreground">学歴</th>
                <th className="text-left p-3 font-medium text-foreground">転職意欲</th>
                <th className="text-left p-3 font-medium text-foreground">希望の転職時期</th>
                <th className="text-left p-3 font-medium text-foreground">経験社数</th>
                <th className="text-left p-3 font-medium text-foreground">経験職種</th>
                <th className="text-left p-3 font-medium text-foreground">希望職種</th>
                <th className="w-10 p-3" />
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((c: Candidate) => (
                <tr
                  key={c.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="p-3 font-mono text-muted-foreground">{c.id}</td>
                  <td className="p-3">{getAgentName(c.createdBy)}</td>
                  <td className="p-3">{getAgentName(c.assigneeId)}</td>
                  <td className="p-3 font-medium text-foreground">{c.name}</td>
                  <td className="p-3">{c.birthYear ?? "—"}</td>
                  <td className="p-3">{c.education ?? "—"}</td>
                  <td className="p-3">{c.motivation ?? "—"}</td>
                  <td className="p-3">{c.desiredTiming ?? "—"}</td>
                  <td className="p-3">{c.experienceCompanyCount ?? "—"}</td>
                  <td className="p-3 max-w-[120px] truncate" title={c.experienceJobTypes.join(", ")}>
                    {c.experienceJobTypes.length ? c.experienceJobTypes.join(", ") : "—"}
                  </td>
                  <td className="p-3 max-w-[120px] truncate" title={c.desiredJobTypes.join(", ")}>
                    {c.desiredJobTypes.length ? c.desiredJobTypes.join(", ") : "—"}
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/admin/candidates/${c.id}`}
                      className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      <ChevronRight size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredCandidates.length === 0 && (
        <Card className="border border-border bg-card shadow-sm mt-4">
          <CardContent className="p-8 text-center">
            <User size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              該当する候補者が見つかりません
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
