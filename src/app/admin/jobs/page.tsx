"use client";

import {
  ArrowLeft,
  Briefcase,
  Building,
  ChevronRight,
  DollarSign,
  MapPin,
  Plus,
  Search,
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
import { type Job, jobs, tags } from "@/lib/mock-data";

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

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.companyName.includes(searchQuery) ||
      job.title.includes(searchQuery) ||
      job.location.includes(searchQuery);
    const matchesStatus =
      statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getJobTags = (tagIds: string[]) => {
    return tags.filter((t) => tagIds.includes(t.id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            運営ダッシュボードに戻る
          </Link>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            求人管理
          </h1>
          <p className="text-[var(--muted-foreground)]">
            求人の一覧・詳細・タグ編集を行います
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/admin/jobs/new">
            <Plus size={16} className="mr-2" />
            求人を作成
          </Link>
        </Button>
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
                      placeholder="会社名・職種・勤務地で検索..."
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
                      <SelectItem value="active">公開中</SelectItem>
                      <SelectItem value="paused">一時停止</SelectItem>
                      <SelectItem value="closed">募集終了</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Results Count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-[var(--muted-foreground)]">
                {filteredJobs.length}件の求人
              </p>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Link key={job.id} href={`/admin/jobs/${job.id}`}>
                  <Card className="border-none shadow-soft card-hover">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-[var(--input)] flex items-center justify-center">
                            <Building
                              size={24}
                              className="text-[var(--muted-foreground)]"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-[var(--foreground)]">
                                {job.companyName}
                              </h3>
                              <Badge
                                className={`${statusColors[job.status]} text-white text-xs`}
                              >
                                {statusLabels[job.status]}
                              </Badge>
                            </div>
                            <p className="text-sm text-[var(--foreground)] mb-1">
                              {job.title}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
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
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mt-3">
                              {getJobTags(job.tagIds).map((tag) => (
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
                        <ChevronRight
                          size={20}
                          className="text-[var(--muted-foreground)]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <Card className="border-none shadow-soft">
                <CardContent className="p-8 text-center">
                  <Briefcase
                    size={48}
                    className="mx-auto mb-4 text-[var(--muted-foreground)]"
                  />
                  <p className="text-[var(--muted-foreground)]">
                    該当する求人が見つかりません
                  </p>
                </CardContent>
              </Card>
            )}
    </div>
  );
}
