"use client";

import {
  ArrowLeft,
  Building,
  CheckCircle,
  MapPin,
  Plus,
  Tag,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { tags, type Job } from "@/lib/mock-data";

const tagCategories = [
  { key: "personality", label: "性格" },
  { key: "orientation", label: "志向性" },
  { key: "culture", label: "カルチャー" },
  { key: "skill", label: "スキル" },
] as const;

export default function NewJobPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [location, setLocation] = useState("");
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [requirementIds, setRequirementIds] = useState<string[]>(() => [
    crypto.randomUUID(),
  ]);
  const [benefits, setBenefits] = useState<string[]>([""]);
  const [benefitIds, setBenefitIds] = useState<string[]>(() => [
    crypto.randomUUID(),
  ]);
  const [status, setStatus] = useState<Job["status"]>("active");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTag = (tagId: string) => {
    setTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  const addRequirement = () => {
    setRequirementIds((prev) => [...prev, crypto.randomUUID()]);
    setRequirements((prev) => [...prev, ""]);
  };
  const removeRequirement = (index: number) => {
    setRequirementIds((prev) => prev.filter((_, i) => i !== index));
    setRequirements((prev) => prev.filter((_, i) => i !== index));
  };
  const setRequirement = (index: number, value: string) =>
    setRequirements((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

  const addBenefit = () => {
    setBenefitIds((prev) => [...prev, crypto.randomUUID()]);
    setBenefits((prev) => [...prev, ""]);
  };
  const removeBenefit = (index: number) => {
    setBenefitIds((prev) => prev.filter((_, i) => i !== index));
    setBenefits((prev) => prev.filter((_, i) => i !== index));
  };
  const setBenefit = (index: number, value: string) =>
    setBenefits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const min = parseInt(minSalary, 10);
    const max = parseInt(maxSalary, 10);
    if (Number.isNaN(min) || Number.isNaN(max) || min > max) {
      toast.error("年収の範囲を正しく入力してください");
      return;
    }
    if (!companyName.trim() || !title.trim()) {
      toast.error("企業名と職種名は必須です");
      return;
    }
    setIsSubmitting(true);
    // プロトタイプのため保存はせずトーストのみ。実際はAPIで保存（requirements/benefits は filter して利用）
    toast.success("求人を作成しました");
    router.push("/admin/jobs");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/jobs"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          求人一覧に戻る
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <Building size={24} className="text-slate-600" />
          <h1 className="text-2xl font-bold text-foreground">求人を作成</h1>
        </div>
        <p className="text-muted-foreground">
          企業情報・職種・条件・タグを入力して求人を登録します
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border border-border bg-card shadow-sm mb-6">
          <CardContent className="p-6 space-y-6">
            <div>
              <Label htmlFor="companyName">企業名 *</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="株式会社サンプル"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="title">職種名 *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="法人営業（SaaS）"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">募集概要</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="求人内容の説明を入力..."
                rows={4}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minSalary">最低年収（万円）</Label>
                <Input
                  id="minSalary"
                  type="number"
                  min={0}
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  placeholder="400"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="maxSalary">最高年収（万円）</Label>
                <Input
                  id="maxSalary"
                  type="number"
                  min={0}
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  placeholder="600"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">勤務地</Label>
              <div className="relative mt-1">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="東京都渋谷区"
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <Label>ステータス</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as Job["status"])}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">公開中</SelectItem>
                  <SelectItem value="paused">一時停止</SelectItem>
                  <SelectItem value="closed">募集終了</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={20} className="text-slate-600" />
              <h2 className="font-bold text-foreground">カルチャー・スキルタグ</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              求人に合うタグを選択してください（マッチングに利用されます）
            </p>
            {tagCategories.map((cat) => (
              <div key={cat.key} className="mb-4">
                <Label className="text-sm text-muted-foreground">
                  {cat.label}
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags
                    .filter((t) => t.category === cat.key)
                    .map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        className={`rounded-full px-3 py-1 text-sm transition-all ${
                          tagIds.includes(tag.id)
                            ? "text-white"
                            : "bg-muted text-muted-foreground hover:bg-slate-200"
                        }`}
                        style={
                          tagIds.includes(tag.id)
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
            {tagIds.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tagIds.map((id) => {
                  const tag = tags.find((t) => t.id === id);
                  return tag ? (
                    <Badge
                      key={tag.id}
                      className="text-xs"
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={20} className="text-slate-600" />
              <h2 className="font-bold text-foreground">必須要件</h2>
            </div>
            <div className="space-y-2">
              {requirements.map((req, index) => (
                <div key={requirementIds[index]} className="flex gap-2">
                  <Input
                    value={req}
                    onChange={(e) => setRequirement(index, e.target.value)}
                    placeholder="例: 法人営業経験2年以上"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeRequirement(index)}
                    disabled={requirements.length <= 1}
                    className="shrink-0"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addRequirement}
                className="mt-2"
              >
                <Plus size={14} className="mr-1" />
                要件を追加
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm mb-6">
          <CardContent className="p-6">
            <h2 className="font-bold text-foreground mb-4">福利厚生・待遇</h2>
            <div className="space-y-2">
              {benefits.map((ben, index) => (
                <div key={benefitIds[index]} className="flex gap-2">
                  <Input
                    value={ben}
                    onChange={(e) => setBenefit(index, e.target.value)}
                    placeholder="例: フレックス勤務"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeBenefit(index)}
                    disabled={benefits.length <= 1}
                    className="shrink-0"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addBenefit}
                className="mt-2"
              >
                <Plus size={14} className="mr-1" />
                待遇を追加
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/jobs")}
          >
            キャンセル
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "作成中..." : "求人を作成"}
          </Button>
        </div>
      </form>
    </div>
  );
}
