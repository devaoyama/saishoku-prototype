"use client";

import {
  ArrowLeft,
  Building,
  CheckCircle,
  DollarSign,
  Edit,
  MapPin,
  Tag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { candidates, type Job, jobs, selections, tags } from "@/lib/mock-data";

const statusLabels: Record<Job["status"], string> = {
  active: "公開中",
  paused: "一時停止",
  closed: "募集終了",
};

const statusColors: Record<Job["status"], string> = {
  active: "bg-green-500",
  paused: "bg-yellow-500",
  closed: "bg-gray-500",
};

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;
  const job = jobs.find((j) => j.id === jobId);
  const [selectedTags, setSelectedTags] = useState<string[]>(job?.tagIds || []);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);

  if (!job) {
    return (
      <>
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">求人が見つかりません</p>
        </div>
      </>
    );
  }

  const jobTags = tags.filter((t) => selectedTags.includes(t.id));
  const jobSelections = selections.filter((s) => s.jobId === jobId);

  // この求人にマッチする可能性のある候補者を計算
  const matchingCandidates = candidates
    .map((candidate) => {
      const matchingTags = candidate.tagIds.filter((tagId) =>
        selectedTags.includes(tagId),
      );
      const matchRate =
        selectedTags.length > 0
          ? Math.round((matchingTags.length / selectedTags.length) * 100)
          : 0;
      return {
        ...candidate,
        matchRate,
        matchingTags,
      };
    })
    .filter((c) => c.matchRate >= 50)
    .sort((a, b) => b.matchRate - a.matchRate);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  const saveTags = () => {
    toast.success("タグを保存しました");
    setIsTagDialogOpen(false);
  };

  const tagCategories = [
    { key: "personality", label: "性格" },
    { key: "orientation", label: "志向性" },
    { key: "culture", label: "カルチャー" },
    { key: "skill", label: "スキル" },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/jobs"
          className="inline-flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          求人一覧に戻る
        </Link>
      </div>

      {/* Job Card */}
      <Card className="border-none shadow-soft mb-6">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-[var(--input)] flex items-center justify-center">
                <Building
                  size={32}
                  className="text-[var(--muted-foreground)]"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-[var(--foreground)]">
                    {job.companyName}
                  </h1>
                  <Badge className={`${statusColors[job.status]} text-white`}>
                    {statusLabels[job.status]}
                  </Badge>
                </div>
                <p className="text-lg text-[var(--foreground)]">{job.title}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Edit size={16} className="mr-1" />
              編集
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-y border-[var(--border)]">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[var(--muted-foreground)]" />
              <span className="text-sm">{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign
                size={16}
                className="text-[var(--muted-foreground)]"
              />
              <span className="text-sm">
                {(job.minSalary / 10000).toLocaleString()}〜
                {(job.maxSalary / 10000).toLocaleString()}万円
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-[var(--foreground)] mb-2">
              募集概要
            </h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              {job.description}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-[var(--foreground)] mb-2">
              必須要件
            </h3>
            <ul className="space-y-1">
              {job.requirements.map((req, i) => (
                <li
                  key={i.toString()}
                  className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]"
                >
                  <CheckCircle size={14} className="text-green-500" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-[var(--foreground)] mb-2">
              福利厚生・特徴
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((benefit, i) => (
                <Badge key={i.toString()} variant="outline" className="text-xs">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags Card */}
      <Card className="border-none shadow-soft mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Tag size={20} className="text-[var(--primary)]" />
              <h2 className="font-bold text-[var(--foreground)]">
                企業カルチャータグ
              </h2>
            </div>
            <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit size={16} className="mr-1" />
                  編集
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>タグを編集</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {tagCategories.map((category) => (
                    <div key={category.key}>
                      <Label className="mb-2 block">{category.label}</Label>
                      <div className="flex flex-wrap gap-2">
                        {tags
                          .filter((t) => t.category === category.key)
                          .map((tag) => (
                            <button
                              key={tag.id}
                              type="button"
                              onClick={() => toggleTag(tag.id)}
                              className={`px-3 py-1 rounded-full text-sm transition-all ${
                                selectedTags.includes(tag.id)
                                  ? "text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                              style={
                                selectedTags.includes(tag.id)
                                  ? { backgroundColor: tag.color }
                                  : undefined
                              }
                            >
                              {tag.name}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsTagDialogOpen(false)}
                  >
                    キャンセル
                  </Button>
                  <Button onClick={saveTags}>保存</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-wrap gap-2">
            {jobTags.length > 0 ? (
              jobTags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 rounded-full text-sm text-white"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </span>
              ))
            ) : (
              <p className="text-sm text-[var(--muted-foreground)]">
                タグが設定されていません
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selections Card */}
      <Card className="border-none shadow-soft mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-[var(--secondary)]" />
            <h2 className="font-bold text-[var(--foreground)]">
              選考中の候補者
            </h2>
            <Badge className="bg-[var(--input)] text-[var(--foreground)]">
              {jobSelections.length}名
            </Badge>
          </div>

          {jobSelections.length > 0 ? (
            <div className="space-y-3">
              {jobSelections.map((selection) => {
                const candidate = candidates.find(
                  (c) => c.id === selection.candidateId,
                );
                return (
                  <Link
                    key={selection.id}
                    href={`/admin/candidates/${selection.candidateId}`}
                  >
                    <div className="p-3 bg-[var(--muted)] rounded-lg hover:bg-[var(--input)] transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-[var(--foreground)]">
                            {candidate?.name}
                          </p>
                          <p className="text-sm text-[var(--muted-foreground)]">
                            {candidate?.currentCompany} /{" "}
                            {candidate?.currentPosition}
                          </p>
                        </div>
                        <Badge className="bg-purple-100 text-purple-700">
                          マッチ率 {selection.matchRate}%
                        </Badge>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-[var(--muted-foreground)]">
              選考中の候補者はいません
            </p>
          )}
        </CardContent>
      </Card>

      {/* Matching Candidates Card */}
      <Card className="border-none shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-green-500" />
            <h2 className="font-bold text-[var(--foreground)]">
              マッチする可能性のある候補者
            </h2>
            <Badge className="bg-green-100 text-green-700">
              {matchingCandidates.length}名
            </Badge>
          </div>

          {matchingCandidates.length > 0 ? (
            <div className="space-y-3">
              {matchingCandidates.slice(0, 5).map((candidate) => (
                <Link
                  key={candidate.id}
                  href={`/admin/candidates/${candidate.id}`}
                >
                  <div className="p-3 bg-[var(--muted)] rounded-lg hover:bg-[var(--input)] transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[var(--foreground)]">
                          {candidate.name}
                        </p>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          {candidate.currentCompany} /{" "}
                          {candidate.currentPosition}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {candidate.matchingTags.slice(0, 3).map((tagId) => {
                            const tag = tags.find((t) => t.id === tagId);
                            return tag ? (
                              <span
                                key={tagId}
                                className="px-2 py-0.5 rounded-full text-xs text-white"
                                style={{ backgroundColor: tag.color }}
                              >
                                {tag.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                      <Badge className="bg-green-500 text-white">
                        {candidate.matchRate}%
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--muted-foreground)]">
              マッチする候補者が見つかりません
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
