"use client";

import {
  ArrowLeft,
  Building,
  CheckCircle,
  ChevronRight,
  DollarSign,
  MapPin,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { FloatingFlowers } from "@/components/flower-decoration";
import { Footer, Header } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { candidates, jobs, tags } from "@/lib/mock-data";

// Mock partner ID (logged in partner)
const currentPartnerId = "1";

export default function RecommendationsPage() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    candidates.find((c) => c.partnerId === currentPartnerId)?.id || ""
  );

  // 担当候補者のみ
  const myCandidates = candidates.filter(
    (c) => c.partnerId === currentPartnerId
  );

  const selectedCandidate = candidates.find(
    (c) => c.id === selectedCandidateId
  );

  // マッチング計算
  const calculateMatchingJobs = () => {
    if (!selectedCandidate) return [];

    return jobs
      .filter((job) => job.status === "active")
      .map((job) => {
        const matchingTagIds = selectedCandidate.tagIds.filter((tagId) =>
          job.tagIds.includes(tagId)
        );
        const matchRate =
          job.tagIds.length > 0
            ? Math.round((matchingTagIds.length / job.tagIds.length) * 100)
            : 0;

        // 年収マッチも考慮
        const salaryMatch =
          selectedCandidate.desiredSalary >= job.minSalary &&
          selectedCandidate.desiredSalary <= job.maxSalary;

        return {
          ...job,
          matchRate,
          matchingTagIds,
          salaryMatch,
          adjustedMatchRate: salaryMatch ? matchRate + 10 : matchRate,
        };
      })
      .filter((job) => job.adjustedMatchRate >= 30)
      .sort((a, b) => b.adjustedMatchRate - a.adjustedMatchRate);
  };

  const matchingJobs = calculateMatchingJobs();

  const getCandidateTags = (tagIds: string[]) => {
    return tags.filter((t) => tagIds.includes(t.id));
  };

  const handleRecommend = (jobId: string, jobName: string) => {
    toast.success(`${selectedCandidate?.name}さんに「${jobName}」を推薦しました`);
  };

  return (
    <>
      <Header />
      <FloatingFlowers />

      <main className="relative z-10 min-h-screen pt-20 bg-gray-50">
        <section className="px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <Link
                href="/partner/dashboard"
                className="inline-flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-4"
              >
                <ArrowLeft size={16} className="mr-1" />
                ダッシュボードに戻る
              </Link>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={24} className="text-[var(--primary)]" />
                <h1 className="text-2xl font-bold text-[var(--foreground)]">
                  おすすめ求人
                </h1>
              </div>
              <p className="text-[var(--muted-foreground)]">
                候補者のタグに基づいてマッチする求人を表示します
              </p>
            </div>

            {/* Candidate Selector */}
            <Card className="border-none shadow-soft mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Label className="whitespace-nowrap">候補者を選択</Label>
                  <Select
                    value={selectedCandidateId}
                    onValueChange={setSelectedCandidateId}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="候補者を選択..." />
                    </SelectTrigger>
                    <SelectContent>
                      {myCandidates.map((candidate) => (
                        <SelectItem key={candidate.id} value={candidate.id}>
                          {candidate.name}（{candidate.currentCompany}）
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {selectedCandidate && (
              <>
                {/* Selected Candidate Info */}
                <Card className="border-none shadow-soft mb-6 border-l-4 border-l-[var(--primary)]">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--input)] flex items-center justify-center">
                        <User
                          size={24}
                          className="text-[var(--muted-foreground)]"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[var(--foreground)]">
                          {selectedCandidate.name}
                        </h3>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          {selectedCandidate.currentCompany} /{" "}
                          {selectedCandidate.currentPosition}（
                          {selectedCandidate.age}歳）
                        </p>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          希望年収:{" "}
                          {(
                            selectedCandidate.desiredSalary / 10000
                          ).toLocaleString()}
                          万円
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {getCandidateTags(selectedCandidate.tagIds).map(
                            (tag) => (
                              <span
                                key={tag.id}
                                className="px-2 py-0.5 rounded-full text-xs text-white"
                                style={{ backgroundColor: tag.color }}
                              >
                                {tag.name}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Matching Jobs */}
                <div className="mb-4">
                  <h2 className="font-bold text-[var(--foreground)] flex items-center gap-2">
                    <Sparkles size={18} className="text-[var(--primary)]" />
                    マッチする求人（{matchingJobs.length}件）
                  </h2>
                </div>

                {matchingJobs.length > 0 ? (
                  <div className="space-y-4">
                    {matchingJobs.map((job) => (
                      <Card
                        key={job.id}
                        className="border-none shadow-soft card-hover"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="w-12 h-12 rounded-lg bg-[var(--input)] flex items-center justify-center">
                                <Building
                                  size={24}
                                  className="text-[var(--muted-foreground)]"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-bold text-[var(--foreground)]">
                                    {job.companyName}
                                  </h3>
                                  <Badge
                                    className={`${
                                      job.adjustedMatchRate >= 70
                                        ? "bg-green-500"
                                        : job.adjustedMatchRate >= 50
                                          ? "bg-yellow-500"
                                          : "bg-gray-500"
                                    } text-white`}
                                  >
                                    {job.adjustedMatchRate}% マッチ
                                  </Badge>
                                  {job.salaryMatch && (
                                    <Badge className="bg-blue-100 text-blue-700 text-xs">
                                      <CheckCircle
                                        size={10}
                                        className="mr-1"
                                      />
                                      年収条件○
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-[var(--foreground)] mb-1">
                                  {job.title}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)] mb-2">
                                  <span className="flex items-center gap-1">
                                    <MapPin size={12} />
                                    {job.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign size={12} />
                                    {(job.minSalary / 10000).toLocaleString()}〜
                                    {(job.maxSalary / 10000).toLocaleString()}
                                    万円
                                  </span>
                                </div>

                                {/* Matching Tags */}
                                <div className="flex flex-wrap gap-1">
                                  {job.matchingTagIds.map((tagId) => {
                                    const tag = tags.find(
                                      (t) => t.id === tagId
                                    );
                                    return tag ? (
                                      <span
                                        key={tagId}
                                        className="px-2 py-0.5 rounded-full text-xs text-white ring-2 ring-green-400 ring-offset-1"
                                        style={{ backgroundColor: tag.color }}
                                      >
                                        {tag.name}
                                      </span>
                                    ) : null;
                                  })}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2 ml-4">
                              <Button
                                size="sm"
                                className="btn-gradient"
                                onClick={() =>
                                  handleRecommend(job.id, job.companyName)
                                }
                              >
                                推薦する
                              </Button>
                              <Link href={`/admin/jobs/${job.id}`}>
                                <Button variant="outline" size="sm">
                                  詳細
                                  <ChevronRight size={14} className="ml-1" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-none shadow-soft">
                    <CardContent className="p-8 text-center">
                      <Sparkles
                        size={48}
                        className="mx-auto mb-4 text-[var(--muted-foreground)]"
                      />
                      <p className="text-[var(--muted-foreground)]">
                        マッチする求人が見つかりません
                      </p>
                      <p className="text-sm text-[var(--muted-foreground)] mt-2">
                        候補者のタグを追加するか、新しい求人を登録してください
                      </p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {!selectedCandidate && (
              <Card className="border-none shadow-soft">
                <CardContent className="p-8 text-center">
                  <User
                    size={48}
                    className="mx-auto mb-4 text-[var(--muted-foreground)]"
                  />
                  <p className="text-[var(--muted-foreground)]">
                    候補者を選択してください
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

function Label({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`text-sm font-medium text-[var(--foreground)] ${className}`}>
      {children}
    </span>
  );
}
