"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
  ArrowLeft,
  ChevronRight,
  Mail,
  Phone,
  Search,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  tags,
} from "@/lib/mock-data";

const statusLabels: Record<Candidate["status"], string> = {
  new: "新規",
  in_progress: "対応中",
  matched: "マッチング済",
  hired: "入社決定",
  declined: "辞退",
};

const statusColors: Record<Candidate["status"], string> = {
  new: "bg-blue-500",
  in_progress: "bg-yellow-500",
  matched: "bg-purple-500",
  hired: "bg-green-500",
  declined: "bg-gray-500",
};

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [partnerFilter, setPartnerFilter] = useState<string>("all");

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.includes(searchQuery) ||
      candidate.email.includes(searchQuery) ||
      candidate.currentCompany.includes(searchQuery);
    const matchesStatus =
      statusFilter === "all" || candidate.status === statusFilter;
    const matchesPartner =
      partnerFilter === "all" || candidate.partnerId === partnerFilter;
    return matchesSearch && matchesStatus && matchesPartner;
  });

  const getPartnerName = (partnerId: string) => {
    return partners.find((p) => p.id === partnerId)?.name || "未割り当て";
  };

  const getCandidateTags = (tagIds: string[]) => {
    return tags.filter((t) => tagIds.includes(t.id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          運営ダッシュボードに戻る
        </Link>
        <h1 className="text-2xl font-bold text-foreground">候補者管理</h1>
        <p className="text-muted-foreground">
          候補者の一覧・詳細・タグ編集を行います
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
                      placeholder="名前・メール・会社名で検索..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="ステータス" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="new">新規</SelectItem>
                      <SelectItem value="in_progress">対応中</SelectItem>
                      <SelectItem value="matched">マッチング済</SelectItem>
                      <SelectItem value="hired">入社決定</SelectItem>
                      <SelectItem value="declined">辞退</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={partnerFilter} onValueChange={setPartnerFilter}>
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

            {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredCandidates.length}件の候補者
        </p>
      </div>

      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <Link
            key={candidate.id}
            href={`/admin/candidates/${candidate.id}`}
          >
            <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                            <User size={24} className="text-muted-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-foreground">
                                {candidate.name}
                              </h3>
                              <Badge
                                className={`${statusColors[candidate.status]} text-white text-xs`}
                              >
                                {statusLabels[candidate.status]}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {candidate.currentCompany} / {candidate.currentPosition}（{candidate.age}歳）
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Mail size={12} />
                                {candidate.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone size={12} />
                                {candidate.phone}
                              </span>
                            </div>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mt-3">
                              {getCandidateTags(candidate.tagIds)
                                .slice(0, 5)
                                .map((tag) => (
                                  <span
                                    key={tag.id}
                                    className="px-2 py-0.5 rounded-full text-xs text-white"
                                    style={{ backgroundColor: tag.color }}
                                  >
                                    {tag.name}
                                  </span>
                                ))}
                              {candidate.tagIds.length > 5 && (
                                <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                                  +{candidate.tagIds.length - 5}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-1">
                            担当: {getPartnerName(candidate.partnerId)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            最終連絡:{" "}
                            {format(new Date(candidate.lastContactAt), "M/d", {
                              locale: ja,
                            })}
                          </p>
                          <ChevronRight size={20} className="text-muted-foreground mt-2 ml-auto" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

      {filteredCandidates.length === 0 && (
        <Card className="border border-border bg-card shadow-sm">
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
