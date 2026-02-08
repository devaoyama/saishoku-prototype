"use client";

import { ArrowLeft, Award, FileText, Save, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Candidate } from "@/lib/mock-data";
import {
  candidates,
  getCandidateAge,
  partners,
} from "@/lib/mock-data";

const USER_STATUS_OPTIONS = [
  "新規",
  "対応中",
  "マッチング済",
  "入社決定",
  "辞退",
];

const GENDER_OPTIONS = ["男", "女", "その他"];

function EditableRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-border/50 last:border-0">
      <Label className="text-muted-foreground text-sm sm:py-2">{label}</Label>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}

export default function CandidateDetailPage() {
  const params = useParams();
  const candidateId = params.id as string;
  const candidate = candidates.find((c) => c.id === candidateId);

  const [form, setForm] = useState<Partial<Candidate>>({});

  useEffect(() => {
    if (candidate) {
      setForm({
        ...candidate,
        desiredJobTypes: candidate.desiredJobTypes ?? [],
        experienceJobTypes: candidate.experienceJobTypes ?? [],
      });
    }
  }, [candidate]);

  const update = (key: keyof Candidate, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!candidate) return;
    const desiredJobTypes = Array.isArray(form.desiredJobTypes)
      ? form.desiredJobTypes
      : String(form.desiredJobTypes ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
    const experienceJobTypes = Array.isArray(form.experienceJobTypes)
      ? form.experienceJobTypes
      : String(form.experienceJobTypes ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
    Object.assign(candidate, {
      ...form,
      desiredJobTypes,
      experienceJobTypes,
      birthYear:
        form.birthYear !== undefined && form.birthYear !== null
          ? Number(form.birthYear)
          : undefined,
      desiredSalary:
        form.desiredSalary !== undefined && form.desiredSalary !== null
          ? Number(form.desiredSalary)
          : undefined,
      experienceCompanyCount:
        form.experienceCompanyCount !== undefined &&
        form.experienceCompanyCount !== null
          ? Number(form.experienceCompanyCount)
          : undefined,
      interviewSettingCount:
        form.interviewSettingCount !== undefined &&
        form.interviewSettingCount !== null
          ? Number(form.interviewSettingCount)
          : undefined,
    });
    toast.success("候補者情報を保存しました");
  };

  if (!candidate) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">候補者が見つかりません</p>
      </div>
    );
  }

  const age = getCandidateAge(form.birthYear != null ? { ...candidate, birthYear: Number(form.birthYear) } : candidate);
  const desiredJobTypesStr = Array.isArray(form.desiredJobTypes)
    ? form.desiredJobTypes.join(", ")
    : String(form.desiredJobTypes ?? "");
  const experienceJobTypesStr = Array.isArray(form.experienceJobTypes)
    ? form.experienceJobTypes.join(", ")
    : String(form.experienceJobTypes ?? "");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/candidates"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          候補者一覧に戻る
        </Link>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="text-2xl font-bold text-foreground">
            {form.name ?? candidate.name}
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{candidate.id}</Badge>
            <Button onClick={handleSave}>
              <Save size={16} className="mr-2" />
              保存
            </Button>
          </div>
        </div>
      </div>

      {/* アプリデータ */}
      <Card className="border border-border bg-card shadow-sm mb-6">
        <CardContent className="p-6">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <User size={20} className="text-primary" />
            アプリデータ
          </h2>
          <EditableRow label="選択エージェント">
            <Select
              value={form.selectedAgentId ?? ""}
              onValueChange={(v) => update("selectedAgentId", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="選択" />
              </SelectTrigger>
              <SelectContent>
                {partners.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </EditableRow>
          <EditableRow label="対応エージェント">
            <Select
              value={form.handlingAgentId ?? ""}
              onValueChange={(v) => update("handlingAgentId", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="選択" />
              </SelectTrigger>
              <SelectContent>
                {partners.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </EditableRow>
        </CardContent>
      </Card>

      {/* 基本情報 */}
      <Card className="border border-border bg-card shadow-sm mb-6">
        <CardContent className="p-6">
          <h2 className="font-bold text-foreground mb-4">基本情報</h2>
          <EditableRow label="名前">
            <Input
              value={form.name ?? ""}
              onChange={(e) => update("name", e.target.value)}
              placeholder="記入"
            />
          </EditableRow>
          <EditableRow label="住所（住んでる地域）">
            <Input
              value={form.address ?? ""}
              onChange={(e) => update("address", e.target.value)}
              placeholder="記入"
            />
          </EditableRow>
          <EditableRow label="生まれ年">
            <Input
              type="number"
              value={form.birthYear ?? ""}
              onChange={(e) => update("birthYear", e.target.value ? Number(e.target.value) : undefined)}
              placeholder="記入（例: 1990）"
            />
          </EditableRow>
          <EditableRow label="年齢（自動挿入）">
            <span className="text-muted-foreground">
              {age != null ? `${age}歳` : "—"}
            </span>
          </EditableRow>
          <EditableRow label="郵便番号">
            <Input
              value={form.postalCode ?? ""}
              onChange={(e) => update("postalCode", e.target.value)}
              placeholder="記入"
            />
          </EditableRow>
          <EditableRow label="都道府県">
            <Input
              value={form.prefecture ?? ""}
              onChange={(e) => update("prefecture", e.target.value)}
              placeholder="記入"
            />
          </EditableRow>
          <EditableRow label="性別">
            <Select
              value={form.gender ?? ""}
              onValueChange={(v) => update("gender", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="選択" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </EditableRow>
          <EditableRow label="希望の転職時期">
            <Input
              value={form.desiredTiming ?? ""}
              onChange={(e) => update("desiredTiming", e.target.value)}
              placeholder="記入"
            />
          </EditableRow>
          <EditableRow label="希望年収">
            <Input
              type="number"
              value={form.desiredSalary ?? ""}
              onChange={(e) => update("desiredSalary", e.target.value ? Number(e.target.value) : undefined)}
              placeholder="記入（円）"
            />
          </EditableRow>
          <EditableRow label="保有資格（あれば）">
            <Input
              value={form.qualifications ?? ""}
              onChange={(e) => update("qualifications", e.target.value)}
              placeholder="記入"
            />
          </EditableRow>
          <EditableRow label="希望職種">
            <Input
              value={desiredJobTypesStr}
              onChange={(e) => update("desiredJobTypes", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
              placeholder="記入（カンマ区切り可）"
            />
          </EditableRow>
          <EditableRow label="経験職種">
            <Input
              value={experienceJobTypesStr}
              onChange={(e) => update("experienceJobTypes", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
              placeholder="記入（カンマ区切り可）"
            />
          </EditableRow>
          <EditableRow label="メモ">
            <Textarea
              value={form.memo ?? ""}
              onChange={(e) => update("memo", e.target.value)}
              placeholder="記入"
              rows={3}
            />
          </EditableRow>
        </CardContent>
      </Card>

      {/* ユーザーステータス */}
      <Card className="border border-border bg-card shadow-sm mb-6">
        <CardContent className="p-6">
          <h2 className="font-bold text-foreground mb-4">ユーザーステータス</h2>
          <EditableRow label="ユーザーステータス">
            <Select
              value={form.userStatus ?? ""}
              onValueChange={(v) => update("userStatus", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="選択" />
              </SelectTrigger>
              <SelectContent>
                {USER_STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </EditableRow>
        </CardContent>
      </Card>

      {/* 進捗・アクション日付 */}
      <Card className="border border-border bg-card shadow-sm mb-6">
        <CardContent className="p-6">
          <h2 className="font-bold text-foreground mb-4">進捗・アクション日付</h2>
          <EditableRow label="通電日">
            <Input
              type="date"
              value={form.callDate ?? ""}
              onChange={(e) => update("callDate", e.target.value || undefined)}
            />
          </EditableRow>
          <EditableRow label="初回面談実施日">
            <Input
              type="date"
              value={form.firstMeetingDate ?? ""}
              onChange={(e) => update("firstMeetingDate", e.target.value || undefined)}
            />
          </EditableRow>
          <EditableRow label="求人提案日">
            <Input
              type="date"
              value={form.jobProposalDate ?? ""}
              onChange={(e) => update("jobProposalDate", e.target.value || undefined)}
            />
          </EditableRow>
          <EditableRow label="推薦日">
            <Input
              type="date"
              value={form.recommendationDate ?? ""}
              onChange={(e) => update("recommendationDate", e.target.value || undefined)}
            />
          </EditableRow>
          <EditableRow label="面接設定日">
            <Input
              type="date"
              value={form.interviewSettingDate ?? ""}
              onChange={(e) => update("interviewSettingDate", e.target.value || undefined)}
            />
          </EditableRow>
          <EditableRow label="面接設定数">
            <Input
              type="number"
              min={0}
              value={form.interviewSettingCount ?? ""}
              onChange={(e) => update("interviewSettingCount", e.target.value === "" ? undefined : Number(e.target.value))}
              placeholder="記入"
            />
          </EditableRow>
        </CardContent>
      </Card>

      {/* NG */}
      <Card className="border border-border bg-card shadow-sm mb-6">
        <CardContent className="p-6">
          <h2 className="font-bold text-foreground mb-4">NG</h2>
          <EditableRow label="NG日">
            <Input
              type="date"
              value={form.ngDate ?? ""}
              onChange={(e) => update("ngDate", e.target.value || undefined)}
            />
          </EditableRow>
          <EditableRow label="NG理由">
            <Textarea
              value={form.ngReason ?? ""}
              onChange={(e) => update("ngReason", e.target.value)}
              placeholder="記入"
              rows={3}
            />
          </EditableRow>
        </CardContent>
      </Card>

      {/* この候補者で：AI履歴書・診断 */}
      <Card className="border border-border bg-card shadow-sm mb-6 border-l-4 border-l-primary">
        <CardContent className="p-6">
          <h2 className="font-bold text-foreground mb-3">この候補者で</h2>
          <p className="text-sm text-muted-foreground mb-4">
            AI履歴書作成・市場価値診断を候補者を選択した状態で開きます
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href={`/admin/ai/resume?candidateId=${candidateId}`}>
              <Button variant="outline" className="w-full justify-start">
                <FileText size={16} className="mr-2 text-primary" />
                AI履歴書を作成
              </Button>
            </Link>
            <Link href={`/admin/ai/diagnosis?candidateId=${candidateId}`}>
              <Button variant="outline" className="w-full justify-start">
                <Award size={16} className="mr-2 text-primary" />
                市場価値診断
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
