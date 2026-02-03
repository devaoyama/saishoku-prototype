"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Search,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FloatingFlowers } from "@/components/flower-decoration";
import { Footer, Header } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
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
  type SelectionStatus,
  candidates,
  jobs,
  partners,
  selections,
} from "@/lib/mock-data";

const statusLabels: Record<SelectionStatus, string> = {
  recommended: "推薦",
  document_screening: "書類選考",
  casual_interview: "カジュアル面談",
  first_interview: "一次面接",
  final_interview: "最終面接",
  offer: "内定",
  hired: "入社決定",
  rejected: "不採用",
  declined: "辞退",
};

const statusColors: Record<SelectionStatus, string> = {
  recommended: "bg-blue-500",
  document_screening: "bg-yellow-500",
  casual_interview: "bg-cyan-500",
  first_interview: "bg-purple-500",
  final_interview: "bg-pink-500",
  offer: "bg-orange-500",
  hired: "bg-green-500",
  rejected: "bg-gray-500",
  declined: "bg-gray-400",
};

export default function SelectionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [partnerFilter, setPartnerFilter] = useState<string>("all");

  const filteredSelections = selections.filter((selection) => {
    const candidate = candidates.find((c) => c.id === selection.candidateId);
    const job = jobs.find((j) => j.id === selection.jobId);
    const matchesSearch =
      candidate?.name.includes(searchQuery) ||
      job?.companyName.includes(searchQuery) ||
      job?.title.includes(searchQuery);
    const matchesStatus =
      statusFilter === "all" || selection.status === statusFilter;
    const matchesPartner =
      partnerFilter === "all" || selection.partnerId === partnerFilter;
    return matchesSearch && matchesStatus && matchesPartner;
  });

  const getCandidateById = (id: string) =>
    candidates.find((c) => c.id === id);
  const getJobById = (id: string) => jobs.find((j) => j.id === id);
  const getPartnerById = (id: string) => partners.find((p) => p.id === id);

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
              <h1 className="text-2xl font-bold text-[var(--foreground)]">
                マッチング・選考管理
              </h1>
              <p className="text-[var(--muted-foreground)]">
                選考状況の管理・結果入力を行います
              </p>
            </div>

            {/* Filters */}
            <Card className="border-none shadow-soft mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                    />
                    <Input
                      placeholder="候補者名・企業名・職種で検索..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="ステータス" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="recommended">推薦</SelectItem>
                      <SelectItem value="document_screening">
                        書類選考
                      </SelectItem>
                      <SelectItem value="casual_interview">
                        カジュアル面談
                      </SelectItem>
                      <SelectItem value="first_interview">一次面接</SelectItem>
                      <SelectItem value="final_interview">最終面接</SelectItem>
                      <SelectItem value="offer">内定</SelectItem>
                      <SelectItem value="hired">入社決定</SelectItem>
                      <SelectItem value="rejected">不採用</SelectItem>
                      <SelectItem value="declined">辞退</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={partnerFilter}
                    onValueChange={setPartnerFilter}
                  >
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
              <p className="text-sm text-[var(--muted-foreground)]">
                {filteredSelections.length}件の選考
              </p>
            </div>

            {/* Selections List */}
            <div className="space-y-4">
              {filteredSelections.map((selection) => {
                const candidate = getCandidateById(selection.candidateId);
                const job = getJobById(selection.jobId);
                const partner = getPartnerById(selection.partnerId);

                return (
                  <Link
                    key={selection.id}
                    href={`/admin/selections/${selection.id}`}
                  >
                    <Card className="border-none shadow-soft card-hover">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                className={`${statusColors[selection.status]} text-white text-xs`}
                              >
                                {statusLabels[selection.status]}
                              </Badge>
                              <Badge className="bg-purple-100 text-purple-700 text-xs">
                                マッチ率 {selection.matchRate}%
                              </Badge>
                            </div>

                            <div className="flex items-center gap-4 mb-2">
                              <div className="flex-1">
                                <p className="font-bold text-[var(--foreground)]">
                                  {candidate?.name}
                                </p>
                                <p className="text-sm text-[var(--muted-foreground)]">
                                  {candidate?.currentCompany} /{" "}
                                  {candidate?.currentPosition}
                                </p>
                              </div>

                              <ArrowRight
                                size={20}
                                className="text-[var(--muted-foreground)]"
                              />

                              <div className="flex-1">
                                <p className="font-bold text-[var(--foreground)]">
                                  {job?.companyName}
                                </p>
                                <p className="text-sm text-[var(--muted-foreground)]">
                                  {job?.title}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
                              <span>担当: {partner?.name}</span>
                              <span>
                                更新:{" "}
                                {format(
                                  new Date(selection.updatedAt),
                                  "M/d",
                                  { locale: ja }
                                )}
                              </span>
                            </div>

                            {selection.memo && (
                              <p className="mt-2 text-sm text-[var(--muted-foreground)] bg-[var(--muted)] p-2 rounded">
                                {selection.memo}
                              </p>
                            )}
                          </div>

                          <ChevronRight
                            size={20}
                            className="text-[var(--muted-foreground)]"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {filteredSelections.length === 0 && (
              <Card className="border-none shadow-soft">
                <CardContent className="p-8 text-center">
                  <UserCheck
                    size={48}
                    className="mx-auto mb-4 text-[var(--muted-foreground)]"
                  />
                  <p className="text-[var(--muted-foreground)]">
                    該当する選考が見つかりません
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
