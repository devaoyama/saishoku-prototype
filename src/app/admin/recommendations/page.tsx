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
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { candidates, jobs, tags } from "@/lib/mock-data";

const currentPartnerId = "1";

function RecommendationsContent() {
  const searchParams = useSearchParams();
  const candidateIdFromUrl = searchParams.get("candidateId");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    candidateIdFromUrl ||
      candidates.find((c) => c.partnerId === currentPartnerId)?.id ||
      "",
  );

  const myCandidates = candidates.filter(
    (c) => c.partnerId === currentPartnerId,
  );
  const selectedCandidate = candidates.find(
    (c) => c.id === selectedCandidateId,
  );

  const calculateMatchingJobs = () => {
    if (!selectedCandidate) return [];
    return jobs
      .filter((job) => job.status === "active")
      .map((job) => {
        const matchingTagIds = selectedCandidate.tagIds.filter((tagId) =>
          job.tagIds.includes(tagId),
        );
        const matchRate =
          job.tagIds.length > 0
            ? Math.round((matchingTagIds.length / job.tagIds.length) * 100)
            : 0;
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
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          ダッシュボードに戻る
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={24} className="text-slate-600" />
          <h1 className="text-2xl font-bold text-foreground">おすすめ求人</h1>
        </div>
        <p className="text-muted-foreground">
          候補者のタグに基づいてマッチする求人を表示します
        </p>
      </div>

      <Card className="border border-border bg-card shadow-sm mb-6">
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
          <Card className="border border-border bg-card shadow-sm mb-6 border-l-4 border-l-slate-600">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <User size={24} className="text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">
                    {selectedCandidate.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedCandidate.currentCompany} /{" "}
                    {selectedCandidate.currentPosition}（
                    {selectedCandidate.age}歳）
                  </p>
                  <p className="text-sm text-muted-foreground">
                    希望年収:{" "}
                    {(
                      selectedCandidate.desiredSalary / 10000
                    ).toLocaleString()}
                    万円
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {getCandidateTags(selectedCandidate.tagIds).map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-0.5 rounded-full text-xs text-white"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-4">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <Sparkles size={18} className="text-slate-600" />
              マッチする求人（{matchingJobs.length}件）
            </h2>
          </div>

          {matchingJobs.length > 0 ? (
            <div className="space-y-4">
              {matchingJobs.map((job) => (
                <Card
                  key={job.id}
                  className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <Building size={24} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-foreground">
                              {job.companyName}
                            </h3>
                            <Badge
                              className={`${
                                job.adjustedMatchRate >= 70
                                  ? "bg-green-600"
                                  : job.adjustedMatchRate >= 50
                                    ? "bg-amber-600"
                                    : "bg-slate-500"
                              } text-white`}
                            >
                              {job.adjustedMatchRate}% マッチ
                            </Badge>
                            {job.salaryMatch && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle size={10} className="mr-1" />
                                年収条件○
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-foreground mb-1">
                            {job.title}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign size={12} />
                              {(job.minSalary / 10000).toLocaleString()}〜
                              {(job.maxSalary / 10000).toLocaleString()}万円
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {job.matchingTagIds.map((tagId) => {
                              const tag = tags.find((t) => t.id === tagId);
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
                          onClick={() =>
                            handleRecommend(job.id, job.companyName)
                          }
                        >
                          推薦する
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/jobs/${job.id}`}>
                            詳細
                            <ChevronRight size={14} className="ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-border bg-card shadow-sm">
              <CardContent className="p-8 text-center">
                <Sparkles size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  マッチする求人が見つかりません
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  候補者のタグを追加するか、新しい求人を登録してください
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {!selectedCandidate && (
        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-8 text-center">
            <User size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">候補者を選択してください</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function AdminRecommendationsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="w-8 h-8 border-4 border-slate-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <RecommendationsContent />
    </Suspense>
  );
}
