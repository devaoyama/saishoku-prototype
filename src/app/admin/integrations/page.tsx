"use client";

import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  ExternalLink,
  Link2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function IntegrationsPage() {
  const [connected, setConnected] = useState(false);
  const [editing, setEditing] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const handleSave = () => {
    if (!clientId.trim() || !clientSecret.trim()) {
      toast.error("Client ID と Client Secret を入力してください");
      return;
    }
    setConnected(true);
    setEditing(false);
    setClientId("");
    setClientSecret("");
    toast.success("GoogleカレンダーAPIを登録しました");
  };

  const handleDisconnect = () => {
    setConnected(false);
    setEditing(false);
    setClientId("");
    setClientSecret("");
    toast.success("連携を解除しました");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          パートナーダッシュボードに戻る
        </Link>
        <h1 className="text-2xl font-bold text-foreground">
          外部連携
        </h1>
        <p className="text-muted-foreground">
          このアカウントのGoogleカレンダーAPIを登録し、予約枠と連携できます
        </p>
      </div>

      <Card className="border border-border bg-card shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
              <Calendar size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">
                このアカウントのGoogleカレンダー API
              </h2>
              <p className="text-sm text-muted-foreground">
                予約枠をGoogleカレンダーと同期するには、Google Cloud ConsoleでカレンダーAPIの認証情報（OAuth 2.0 クライアントID・シークレット）を作成し、以下で登録してください
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2">
              {connected ? (
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                  <CheckCircle size={12} className="mr-1" />
                  登録済み
                </Badge>
              ) : (
                <Badge variant="secondary">未登録</Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  <ExternalLink size={14} className="mr-1" />
                  Google Cloud Console
                </a>
              </Button>
              {!editing && (
                <>
                  <Button
                    variant={connected ? "outline" : "default"}
                    size="sm"
                    onClick={() => setEditing(true)}
                  >
                    {connected ? "設定を変更" : "APIを登録"}
                  </Button>
                  {connected && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                      onClick={handleDisconnect}
                    >
                      解除
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          {editing && (
            <div className="mt-6 pt-6 border-t border-border space-y-4">
              <p className="text-sm text-muted-foreground">
                「OAuth 2.0 クライアント ID」のクライアントIDとシークレットを入力してください。カレンダーAPIを有効にしたプロジェクトで作成してください。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Client ID</Label>
                  <Input
                    type="text"
                    placeholder="xxxxx.apps.googleusercontent.com"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Client Secret</Label>
                  <Input
                    type="password"
                    placeholder="GOCSPX-xxxxx"
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave}>
                  <Link2 size={14} className="mr-1" />
                  登録する
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditing(false);
                    setClientId("");
                    setClientSecret("");
                  }}
                >
                  キャンセル
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
