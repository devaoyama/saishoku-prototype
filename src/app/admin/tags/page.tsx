"use client";

import {
  ArrowLeft,
  Edit,
  Plus,
  Tag,
  Trash2,
} from "lucide-react";
import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Tag as TagType, tags } from "@/lib/mock-data";

const categoryLabels: Record<TagType["category"], string> = {
  personality: "性格",
  orientation: "志向性",
  culture: "カルチャー",
  skill: "スキル",
};

const categoryColors: Record<TagType["category"], string> = {
  personality: "bg-pink-100 text-pink-700",
  orientation: "bg-blue-100 text-blue-700",
  culture: "bg-green-100 text-green-700",
  skill: "bg-orange-100 text-orange-700",
};

export default function TagsPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagCategory, setNewTagCategory] = useState<TagType["category"]>("personality");
  const [newTagColor, setNewTagColor] = useState("#FF6B6B");

  const filteredTags = tags.filter((tag) => {
    return categoryFilter === "all" || tag.category === categoryFilter;
  });

  const groupedTags = filteredTags.reduce(
    (acc, tag) => {
      if (!acc[tag.category]) {
        acc[tag.category] = [];
      }
      acc[tag.category].push(tag);
      return acc;
    },
    {} as Record<TagType["category"], TagType[]>
  );

  const handleAddTag = () => {
    if (!newTagName.trim()) {
      toast.error("タグ名を入力してください");
      return;
    }
    toast.success(`タグ「${newTagName}」を追加しました`);
    setIsAddDialogOpen(false);
    setNewTagName("");
  };

  const handleDeleteTag = (tagName: string) => {
    toast.success(`タグ「${tagName}」を削除しました`);
  };

  const presetColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#F7DC6F",
    "#BB8FCE",
    "#E74C3C",
    "#3498DB",
    "#2ECC71",
    "#9B59B6",
    "#F39C12",
    "#1ABC9C",
    "#E67E22",
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-4"
              >
                <ArrowLeft size={16} className="mr-1" />
                パートナーダッシュボードに戻る
              </Link>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-[var(--foreground)]">
                    タグマスタ管理
                  </h1>
                  <p className="text-[var(--muted-foreground)]">
                    候補者に使用するタグを管理します
                  </p>
                </div>
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="btn-gradient">
                      <Plus size={16} className="mr-1" />
                      タグを追加
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>新しいタグを追加</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label>タグ名</Label>
                        <Input
                          value={newTagName}
                          onChange={(e) => setNewTagName(e.target.value)}
                          placeholder="タグ名を入力..."
                        />
                      </div>
                      <div>
                        <Label>カテゴリ</Label>
                        <Select
                          value={newTagCategory}
                          onValueChange={(v) =>
                            setNewTagCategory(v as TagType["category"])
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personality">性格</SelectItem>
                            <SelectItem value="orientation">志向性</SelectItem>
                            <SelectItem value="culture">カルチャー</SelectItem>
                            <SelectItem value="skill">スキル</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>カラー</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {presetColors.map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => setNewTagColor(color)}
                              className={`w-8 h-8 rounded-full border-2 transition-all ${
                                newTagColor === color
                                  ? "border-gray-800 scale-110"
                                  : "border-transparent"
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="mt-3">
                          <span
                            className="px-3 py-1 rounded-full text-sm text-white"
                            style={{ backgroundColor: newTagColor }}
                          >
                            {newTagName || "プレビュー"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(false)}
                      >
                        キャンセル
                      </Button>
                      <Button onClick={handleAddTag}>追加</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Filter */}
            <Card className="border-none shadow-soft mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Label>カテゴリで絞り込み</Label>
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="personality">性格</SelectItem>
                      <SelectItem value="orientation">志向性</SelectItem>
                      <SelectItem value="culture">カルチャー</SelectItem>
                      <SelectItem value="skill">スキル</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge className="bg-[var(--input)] text-[var(--foreground)]">
                    {filteredTags.length}件
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Tags by Category */}
            <div className="space-y-6">
              {(Object.keys(categoryLabels) as TagType["category"][])
                .filter(
                  (category) =>
                    categoryFilter === "all" || category === categoryFilter
                )
                .map((category) => (
                  <Card key={category} className="border-none shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Tag size={20} className="text-[var(--primary)]" />
                        <h2 className="font-bold text-[var(--foreground)]">
                          {categoryLabels[category]}
                        </h2>
                        <Badge className={categoryColors[category]}>
                          {groupedTags[category]?.length || 0}件
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {groupedTags[category]?.map((tag) => (
                          <div
                            key={tag.id}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--muted)] group"
                          >
                            <span
                              className="px-3 py-1 rounded-full text-sm text-white"
                              style={{ backgroundColor: tag.color }}
                            >
                              {tag.name}
                            </span>
                            <div className="hidden group-hover:flex items-center gap-1">
                              <button
                                type="button"
                                className="p-1 rounded hover:bg-[var(--input)]"
                                onClick={() =>
                                  toast.info("編集機能は準備中です")
                                }
                              >
                                <Edit
                                  size={14}
                                  className="text-[var(--muted-foreground)]"
                                />
                              </button>
                              <button
                                type="button"
                                className="p-1 rounded hover:bg-red-100"
                                onClick={() => handleDeleteTag(tag.name)}
                              >
                                <Trash2
                                  size={14}
                                  className="text-red-500"
                                />
                              </button>
                            </div>
                          </div>
                        ))}
                        {(!groupedTags[category] ||
                          groupedTags[category].length === 0) && (
                          <p className="text-sm text-[var(--muted-foreground)]">
                            タグがありません
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
    </div>
  );
}
