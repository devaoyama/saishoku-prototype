"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building,
  Calendar,
  CheckCircle,
  Edit,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FloatingFlowers } from "@/components/flower-decoration";
import { Footer, Header } from "@/components/layout";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  type SelectionStatus,
  candidates,
  jobs,
  partners,
  rejectionReasons,
  selections,
  tags,
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

const statusOrder: SelectionStatus[] = [
  "recommended",
  "document_screening",
  "casual_interview",
  "first_interview",
  "final_interview",
  "offer",
  "hired",
];

export default function SelectionDetailPage() {
  const params = useParams();
  const selectionId = params.id as string;
  const selection = selections.find((s) => s.id === selectionId);

  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<SelectionStatus>(
    selection?.status || "recommended"
  );
  const [rejectionReasonId, setRejectionReasonId] = useState<string>("");
  const [rejectionDetail, setRejectionDetail] = useState("");
  const [memo, setMemo] = useState(selection?.memo || "");

  if (!selection) {
    return (
      <>
        <Header />
        <main className="relative z-10 min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
          <p>選考が見つかりません</p>
        </main>
        <Footer />
      </>
    );
  }

  const candidate = candidates.find((c) => c.id === selection.candidateId);
  const job = jobs.find((j) => j.id === selection.jobId);
  const partner = partners.find((p) => p.id === selection.partnerId);
  const candidateTags = tags.filter((t) =>
    candidate?.tagIds.includes(t.id)
  );
  const jobTags = tags.filter((t) => job?.tagIds.includes(t.id));

  // マッチするタグを計算
  const matchingTagIds =
    candidate?.tagIds.filter((tagId) => job?.tagIds.includes(tagId)) || [];
  const matchingTags = tags.filter((t) => matchingTagIds.includes(t.id));

  const currentStatusIndex = statusOrder.indexOf(selection.status);

  const handleUpdateStatus = () => {
    if (
      (newStatus === "rejected" || newStatus === "declined") &&
      !rejectionReasonId
    ) {
      toast.error("理由を選択してください");
      return;
    }
    toast.success(`ステータスを「${statusLabels[newStatus]}」に更新しました`);
    setIsStatusDialogOpen(false);
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
                href="/admin/selections"
                className="inline-flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-4"
              >
                <ArrowLeft size={16} className="mr-1" />
                選考一覧に戻る
              </Link>
            </div>

            {/* Status Card */}
            <Card className="border-none shadow-soft mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${statusColors[selection.status]} text-white`}
                    >
                      {statusLabels[selection.status]}
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-700">
                      マッチ率 {selection.matchRate}%
                    </Badge>
                  </div>
                  <Dialog
                    open={isStatusDialogOpen}
                    onOpenChange={setIsStatusDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="btn-gradient">
                        <Edit size={16} className="mr-1" />
                        ステータス更新
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>選考ステータスを更新</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label>新しいステータス</Label>
                          <Select
                            value={newStatus}
                            onValueChange={(v) =>
                              setNewStatus(v as SelectionStatus)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(statusLabels).map(
                                ([value, label]) => (
                                  <SelectItem key={value} value={value}>
                                    {label}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        {(newStatus === "rejected" ||
                          newStatus === "declined") && (
                          <>
                            <div>
                              <Label>
                                理由（必須）
                                <span className="text-red-500">*</span>
                              </Label>
                              <Select
                                value={rejectionReasonId}
                                onValueChange={setRejectionReasonId}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="理由を選択..." />
                                </SelectTrigger>
                                <SelectContent>
                                  {rejectionReasons.map((reason) => (
                                    <SelectItem
                                      key={reason.id}
                                      value={reason.id}
                                    >
                                      {reason.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>詳細（任意）</Label>
                              <Textarea
                                value={rejectionDetail}
                                onChange={(e) =>
                                  setRejectionDetail(e.target.value)
                                }
                                placeholder="具体的な理由やタグの組み合わせなど..."
                                rows={3}
                              />
                            </div>
                          </>
                        )}

                        <div>
                          <Label>メモ</Label>
                          <Textarea
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            placeholder="選考に関するメモ..."
                            rows={3}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsStatusDialogOpen(false)}
                        >
                          キャンセル
                        </Button>
                        <Button onClick={handleUpdateStatus}>更新</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    {statusOrder.map((status, index) => (
                      <div
                        key={status}
                        className={`flex-1 ${index < statusOrder.length - 1 ? "relative" : ""}`}
                      >
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              index <= currentStatusIndex
                                ? "bg-[var(--primary)] text-white"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {index <= currentStatusIndex ? (
                              <CheckCircle size={16} />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <span className="text-xs text-[var(--muted-foreground)] mt-1 text-center">
                            {statusLabels[status]}
                          </span>
                        </div>
                        {index < statusOrder.length - 1 && (
                          <div
                            className={`absolute top-4 left-1/2 w-full h-0.5 ${
                              index < currentStatusIndex
                                ? "bg-[var(--primary)]"
                                : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Candidate & Job */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href={`/admin/candidates/${candidate?.id}`}>
                    <div className="p-4 bg-[var(--muted)] rounded-lg hover:bg-[var(--input)] transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-[var(--input)] flex items-center justify-center">
                          <User
                            size={20}
                            className="text-[var(--muted-foreground)]"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            候補者
                          </p>
                          <p className="font-bold text-[var(--foreground)]">
                            {candidate?.name}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {candidate?.currentCompany} /{" "}
                        {candidate?.currentPosition}
                      </p>
                    </div>
                  </Link>

                  <Link href={`/admin/jobs/${job?.id}`}>
                    <div className="p-4 bg-[var(--muted)] rounded-lg hover:bg-[var(--input)] transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-[var(--input)] flex items-center justify-center">
                          <Building
                            size={20}
                            className="text-[var(--muted-foreground)]"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            求人
                          </p>
                          <p className="font-bold text-[var(--foreground)]">
                            {job?.companyName}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {job?.title}
                      </p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Tag Matching Card */}
            <Card className="border-none shadow-soft mb-6">
              <CardContent className="p-6">
                <h2 className="font-bold text-[var(--foreground)] mb-4">
                  タグマッチング分析
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)] mb-2">
                      候補者のタグ
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {candidateTags.map((tag) => (
                        <span
                          key={tag.id}
                          className={`px-2 py-0.5 rounded-full text-xs text-white ${
                            matchingTagIds.includes(tag.id)
                              ? "ring-2 ring-green-500 ring-offset-1"
                              : ""
                          }`}
                          style={{ backgroundColor: tag.color }}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowRight
                      size={24}
                      className="text-[var(--muted-foreground)]"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-[var(--muted-foreground)] mb-2">
                      求人のタグ
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {jobTags.map((tag) => (
                        <span
                          key={tag.id}
                          className={`px-2 py-0.5 rounded-full text-xs text-white ${
                            matchingTagIds.includes(tag.id)
                              ? "ring-2 ring-green-500 ring-offset-1"
                              : ""
                          }`}
                          style={{ backgroundColor: tag.color }}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    <CheckCircle
                      size={14}
                      className="inline mr-1"
                    />
                    {matchingTags.length}個のタグが一致しています：
                    {matchingTags.map((t) => t.name).join("、")}
                  </p>
                </div>

                {selection.status === "rejected" &&
                  selection.rejectionReasonId && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-700">
                        <AlertCircle
                          size={14}
                          className="inline mr-1"
                        />
                        不採用理由：
                        {
                          rejectionReasons.find(
                            (r) => r.id === selection.rejectionReasonId
                          )?.label
                        }
                        {selection.rejectionDetail &&
                          ` - ${selection.rejectionDetail}`}
                      </p>
                    </div>
                  )}
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-none shadow-soft">
              <CardContent className="p-6">
                <h2 className="font-bold text-[var(--foreground)] mb-4">
                  選考情報
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-sm text-[var(--muted-foreground)]">
                      担当パートナー
                    </span>
                    <div className="flex items-center gap-2">
                      <img
                        src={partner?.imageUrl}
                        alt={partner?.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm">{partner?.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-sm text-[var(--muted-foreground)]">
                      選考開始日
                    </span>
                    <span className="text-sm flex items-center gap-1">
                      <Calendar size={14} />
                      {format(new Date(selection.createdAt), "yyyy年M月d日", {
                        locale: ja,
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-sm text-[var(--muted-foreground)]">
                      最終更新日
                    </span>
                    <span className="text-sm flex items-center gap-1">
                      <Calendar size={14} />
                      {format(new Date(selection.updatedAt), "yyyy年M月d日", {
                        locale: ja,
                      })}
                    </span>
                  </div>

                  {selection.memo && (
                    <div className="pt-2">
                      <span className="text-sm text-[var(--muted-foreground)]">
                        メモ
                      </span>
                      <p className="mt-1 text-sm text-[var(--foreground)] bg-[var(--muted)] p-3 rounded-lg">
                        {selection.memo}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
