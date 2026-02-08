"use client";

import type { ConsultationType, PartnerStatus } from "@/components/partner-card";
import { ArrowLeft, Save, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import { partners } from "@/lib/mock-data";

const CURRENT_PARTNER_ID = "1";

const STATUS_OPTIONS: { value: PartnerStatus; label: string }[] = [
  { value: "available", label: "今すぐ相談OK" },
  { value: "busy", label: "面談中" },
  { value: "offline", label: "離席中" },
];

const CONSULTATION_OPTIONS: { value: ConsultationType; label: string }[] = [
  { value: "video", label: "ビデオのみ" },
  { value: "audio", label: "音声のみ" },
  { value: "both", label: "ビデオ・音声どちらも" },
];

export default function AdminProfilePage() {
  const partner = partners.find((p) => p.id === CURRENT_PARTNER_ID);
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    bio: "",
    imageUrl: "",
    tagsStr: "",
    status: "available" as PartnerStatus,
    consultationType: "both" as ConsultationType,
    twitterUrl: "",
    instagramUrl: "",
  });

  useEffect(() => {
    if (partner) {
      setForm({
        name: partner.name,
        tagline: partner.tagline,
        bio: partner.bio,
        imageUrl: partner.imageUrl,
        tagsStr: partner.tags.join(", "),
        status: partner.status,
        consultationType: partner.consultationType,
        twitterUrl: partner.twitterUrl ?? "",
        instagramUrl: partner.instagramUrl ?? "",
      });
    }
  }, [partner]);

  const handleSave = () => {
    if (!partner) return;
    const tags = form.tagsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    Object.assign(partner, {
      name: form.name,
      tagline: form.tagline,
      bio: form.bio,
      imageUrl: form.imageUrl,
      tags,
      status: form.status,
      consultationType: form.consultationType,
      twitterUrl: form.twitterUrl || undefined,
      instagramUrl: form.instagramUrl || undefined,
    });
    toast.success("プロフィールを保存しました");
  };

  if (!partner) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <p className="text-muted-foreground">パートナーが見つかりません</p>
        <Link href="/admin/dashboard">
          <Button variant="outline" className="mt-4">
            ダッシュボードに戻る
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} className="mr-1" />
          パートナーダッシュボードに戻る
        </Link>
        <Button onClick={handleSave}>
          <Save size={16} className="mr-2" />
          保存
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <User size={24} className="text-primary" />
        <h1 className="text-2xl font-bold text-foreground">
          自分のパートナープロフィールを編集
        </h1>
      </div>

      <Card className="border border-border bg-card shadow-sm mb-6">
        <CardContent className="p-6 space-y-6">
          <div>
            <Label>名前</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="山田 花子"
              className="mt-1"
            />
          </div>
          <div>
            <Label>キャッチコピー（tagline）</Label>
            <Input
              value={form.tagline}
              onChange={(e) =>
                setForm((f) => ({ ...f, tagline: e.target.value }))
              }
              placeholder="戦略思考人材 × 寄り添いタイプ"
              className="mt-1"
            />
          </div>
          <div>
            <Label>自己紹介（bio）</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              placeholder="プロフィールに表示する自己紹介文"
              rows={5}
              className="mt-1 resize-none"
            />
          </div>
          <div>
            <Label>プロフィール画像URL</Label>
            <Input
              value={form.imageUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, imageUrl: e.target.value }))
              }
              placeholder="https://..."
              className="mt-1"
            />
            {form.imageUrl && (
              <div className="mt-2 w-24 h-24 rounded-full overflow-hidden border border-border">
                <img
                  src={form.imageUrl}
                  alt="プレビュー"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <Label>タグ（カンマ区切り）</Label>
            <Input
              value={form.tagsStr}
              onChange={(e) =>
                setForm((f) => ({ ...f, tagsStr: e.target.value }))
              }
              placeholder="戦略思考, 寄り添いタイプ, IT業界に強い"
              className="mt-1"
            />
          </div>
          <div>
            <Label>即時対応ステータス</Label>
            <Select
              value={form.status}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, status: v as PartnerStatus }))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>対応可能形式</Label>
            <Select
              value={form.consultationType}
              onValueChange={(v) =>
                setForm((f) => ({
                  ...f,
                  consultationType: v as ConsultationType,
                }))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONSULTATION_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Twitter URL（任意）</Label>
            <Input
              value={form.twitterUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, twitterUrl: e.target.value }))
              }
              placeholder="https://twitter.com/..."
              className="mt-1"
            />
          </div>
          <div>
            <Label>Instagram URL（任意）</Label>
            <Input
              value={form.instagramUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, instagramUrl: e.target.value }))
              }
              placeholder="https://instagram.com/..."
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save size={16} className="mr-2" />
          保存
        </Button>
      </div>
    </div>
  );
}
