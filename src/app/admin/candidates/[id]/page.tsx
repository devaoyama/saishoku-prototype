"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
  ArrowLeft,
  Award,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  Edit,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Tag,
  User,
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
import { Textarea } from "@/components/ui/textarea";
import {
  type Candidate,
  candidates,
  meetingLogs,
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

export default function CandidateDetailPage() {
  const params = useParams();
  const candidateId = params.id as string;
  const candidate = candidates.find((c) => c.id === candidateId);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    candidate?.tagIds || []
  );
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [isMeetingLogDialogOpen, setIsMeetingLogDialogOpen] = useState(false);
  const [meetingLogSummary, setMeetingLogSummary] = useState("");

  if (!candidate) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">候補者が見つかりません</p>
      </div>
    );
  }

  const partner = partners.find((p) => p.id === candidate.partnerId);
  const candidateTags = tags.filter((t) => selectedTags.includes(t.id));
  const candidateMeetingLogs = meetingLogs.filter(
    (m) => m.candidateId === candidateId
  );

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const saveTags = () => {
    toast.success("タグを保存しました");
    setIsTagDialogOpen(false);
  };

  const saveMeetingLog = () => {
    if (!meetingLogSummary.trim()) {
      toast.error("面談内容を入力してください");
      return;
    }
    toast.success("面談ログを保存しました");
    setIsMeetingLogDialogOpen(false);
    setMeetingLogSummary("");
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
                href="/admin/candidates"
                className="inline-flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-4"
              >
                <ArrowLeft size={16} className="mr-1" />
                候補者一覧に戻る
              </Link>
            </div>

            {/* Profile Card */}
            <Card className="border-none shadow-soft mb-6">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-[var(--input)] flex items-center justify-center">
                      <User
                        size={32}
                        className="text-[var(--muted-foreground)]"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl font-bold text-[var(--foreground)]">
                          {candidate.name}
                        </h1>
                        <Badge
                          className={`${statusColors[candidate.status]} text-white`}
                        >
                          {statusLabels[candidate.status]}
                        </Badge>
                      </div>
                      <p className="text-[var(--muted-foreground)]">
                        {candidate.currentCompany} / {candidate.currentPosition}
                      </p>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {candidate.age}歳
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit size={16} className="mr-1" />
                    編集
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[var(--muted-foreground)]" />
                    <span className="text-sm">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone
                      size={16}
                      className="text-[var(--muted-foreground)]"
                    />
                    <span className="text-sm">{candidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-[var(--muted-foreground)]" />
                    <span className="text-sm">
                      現年収: {(candidate.currentSalary / 10000).toLocaleString()}
                      万円
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-green-500" />
                    <span className="text-sm">
                      希望: {(candidate.desiredSalary / 10000).toLocaleString()}
                      万円
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      担当パートナー
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={partner?.imageUrl}
                      alt={partner?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm">{partner?.name}</span>
                  </div>
                </div>

                {candidate.memo && (
                  <div className="mt-4 p-3 bg-[var(--muted)] rounded-lg">
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {candidate.memo}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* この候補者で：AI履歴書・診断 */}
            <Card className="border-none shadow-soft mb-6 border-l-4 border-l-[var(--primary)]">
              <CardContent className="p-6">
                <h2 className="font-bold text-[var(--foreground)] mb-3">
                  この候補者で
                </h2>
                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                  AI履歴書作成・市場価値診断を候補者を選択した状態で開きます
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link href={`/admin/ai/resume?candidateId=${candidateId}`}>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText size={16} className="mr-2 text-[var(--primary)]" />
                      AI履歴書を作成
                    </Button>
                  </Link>
                  <Link href={`/admin/ai/diagnosis?candidateId=${candidateId}`}>
                    <Button variant="outline" className="w-full justify-start">
                      <Award size={16} className="mr-2 text-[var(--primary)]" />
                      市場価値診断
                    </Button>
                  </Link>
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
                      タグ（性格・志向性）
                    </h2>
                  </div>
                  <Dialog
                    open={isTagDialogOpen}
                    onOpenChange={setIsTagDialogOpen}
                  >
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
                            <Label className="mb-2 block">
                              {category.label}
                            </Label>
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
                  {candidateTags.length > 0 ? (
                    candidateTags.map((tag) => (
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

            {/* Meeting Logs Card */}
            <Card className="border-none shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={20} className="text-green-500" />
                    <h2 className="font-bold text-[var(--foreground)]">
                      面談ログ
                    </h2>
                    <Badge className="bg-[var(--input)] text-[var(--foreground)]">
                      {candidateMeetingLogs.length}件
                    </Badge>
                  </div>
                  <Dialog
                    open={isMeetingLogDialogOpen}
                    onOpenChange={setIsMeetingLogDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm" className="btn-gradient">
                        <Plus size={16} className="mr-1" />
                        面談ログを追加
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>面談ログを追加</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label>面談内容・メモ</Label>
                          <Textarea
                            value={meetingLogSummary}
                            onChange={(e) =>
                              setMeetingLogSummary(e.target.value)
                            }
                            placeholder="面談の内容、候補者の印象、次のアクションなどを記入..."
                            rows={5}
                          />
                        </div>
                        <div>
                          <Label className="mb-2 block">タグを選択</Label>
                          <div className="flex flex-wrap gap-2">
                            {tags.slice(0, 10).map((tag) => (
                              <button
                                key={tag.id}
                                type="button"
                                onClick={() => toggleTag(tag.id)}
                                className={`px-2 py-1 rounded-full text-xs transition-all ${
                                  selectedTags.includes(tag.id)
                                    ? "text-white"
                                    : "bg-gray-100 text-gray-600"
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
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsMeetingLogDialogOpen(false)}
                        >
                          キャンセル
                        </Button>
                        <Button onClick={saveMeetingLog}>保存</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {candidateMeetingLogs.length > 0 ? (
                  <div className="space-y-4">
                    {candidateMeetingLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-4 bg-[var(--muted)] rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Calendar
                              size={14}
                              className="text-[var(--muted-foreground)]"
                            />
                            <span className="text-sm text-[var(--muted-foreground)]">
                              {format(new Date(log.date), "yyyy年M月d日", {
                                locale: ja,
                              })}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-xs"
                            >
                              {log.type === "initial" && "初回面談"}
                              {log.type === "follow_up" && "フォローアップ"}
                              {log.type === "closing" && "クロージング"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                            <Clock size={12} />
                            {log.duration}分
                          </div>
                        </div>
                        <p className="text-sm text-[var(--foreground)] mb-2">
                          {log.summary}
                        </p>
                        {log.nextAction && (
                          <p className="text-sm text-[var(--primary)]">
                            次のアクション: {log.nextAction}
                          </p>
                        )}
                        {log.selectedTagIds.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {log.selectedTagIds.map((tagId) => {
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
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--muted-foreground)]">
                    面談ログがありません
                  </p>
                )}
              </CardContent>
            </Card>
    </div>
  );
}
