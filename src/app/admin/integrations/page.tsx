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

// モック: アカウント一覧（運営・パートナーなど）
const mockAccounts = [
  { id: "admin", name: "運営アカウント", email: "admin@example.com", connected: true },
  { id: "partner1", name: "パートナーA", email: "partner-a@example.com", connected: false },
  { id: "partner2", name: "パートナーB", email: "partner-b@example.com", connected: false },
];

export default function IntegrationsPage() {
  const [accounts, setAccounts] = useState(mockAccounts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const handleStartRegister = (accountId: string) => {
    setEditingId(accountId);
    setClientId("");
    setClientSecret("");
  };

  const handleSaveApiCredentials = () => {
    if (!editingId) return;
    if (!clientId.trim() || !clientSecret.trim()) {
      toast.error("Client ID と Client Secret を入力してください");
      return;
    }
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === editingId ? { ...a, connected: true } : a
      )
    );
    setEditingId(null);
    setClientId("");
    setClientSecret("");
    toast.success("GoogleカレンダーAPIを登録しました");
  };

  const handleDisconnect = (accountId: string) => {
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === accountId ? { ...a, connected: false } : a
      )
    );
    setEditingId(null);
    toast.success("連携を解除しました");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          運営ダッシュボードに戻る
        </Link>
        <h1 className="text-2xl font-bold text-foreground">
          外部連携
        </h1>
        <p className="text-muted-foreground">
          各アカウントでGoogleカレンダーAPIを登録し、予約枠と連携できます
        </p>
      </div>

      <Card className="border border-border bg-card shadow-sm mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
              <Calendar size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">
                Googleカレンダー API
              </h2>
              <p className="text-sm text-muted-foreground">
                予約枠をGoogleカレンダーと同期するには、各アカウントでGoogle Cloud ConsoleからカレンダーAPIの認証情報（OAuth 2.0 クライアントID・シークレット）を登録してください
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">
                アカウント別の登録状況
              </span>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  <ExternalLink size={14} className="mr-1" />
                  Google Cloud Console で認証情報を作成
                </a>
              </Button>
            </div>

            <ul className="space-y-4">
              {accounts.map((account) => (
                <li key={account.id}>
                  <Card className="border border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <p className="font-medium text-foreground">
                            {account.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {account.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {account.connected ? (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                              <CheckCircle size={12} className="mr-1" />
                              登録済み
                            </Badge>
                          ) : (
                            <Badge variant="secondary">未登録</Badge>
                          )}
                          {editingId !== account.id && (
                            <Button
                              variant={account.connected ? "outline" : "default"}
                              size="sm"
                              onClick={() => handleStartRegister(account.id)}
                            >
                              {account.connected ? "設定を変更" : "APIを登録"}
                            </Button>
                          )}
                          {account.connected && editingId !== account.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground"
                              onClick={() => handleDisconnect(account.id)}
                            >
                              解除
                            </Button>
                          )}
                        </div>
                      </div>

                      {editingId === account.id && (
                        <div className="mt-4 pt-4 border-t border-border space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Google Cloud Console で「OAuth 2.0 クライアント ID」を作成し、クライアントIDとシークレットを入力してください。カレンダーAPIを有効にしたプロジェクトで作成してください。
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
                            <Button onClick={handleSaveApiCredentials}>
                              <Link2 size={14} className="mr-1" />
                              登録する
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setEditingId(null);
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
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
