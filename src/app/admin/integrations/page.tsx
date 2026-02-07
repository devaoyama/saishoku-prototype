"use client";

import {
  ArrowLeft,
  Bell,
  CheckCircle,
  ExternalLink,
  Link2,
  MessageCircle,
  Settings,
  Slack,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function IntegrationsPage() {
  const [lineConnected, setLineConnected] = useState(true);
  const [slackConnected, setSlackConnected] = useState(true);

  const [lineNotifications, setLineNotifications] = useState({
    newRegistration: true,
    meetingComplete: true,
    selectionUpdate: false,
  });

  const [slackNotifications, setSlackNotifications] = useState({
    newRegistration: true,
    meetingScheduled: true,
    selectionUpdate: true,
    dailyReport: true,
  });

  const handleSaveLineSettings = () => {
    toast.success("LINE連携設定を保存しました");
  };

  const handleSaveSlackSettings = () => {
    toast.success("Slack連携設定を保存しました");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
              <Link
                href="/admin"
                className="inline-flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-4"
              >
                <ArrowLeft size={16} className="mr-1" />
                運営ダッシュボードに戻る
              </Link>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">
                外部連携設定
              </h1>
              <p className="text-[var(--muted-foreground)]">
                LINE・Slack連携の設定を行います
              </p>
            </div>

            {/* LINE Integration */}
            <Card className="border-none shadow-soft mb-6">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <MessageCircle size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h2 className="font-bold text-[var(--foreground)]">
                        LINE公式アカウント連携
                      </h2>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        候補者への通知・診断結果送付
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      lineConnected
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {lineConnected ? (
                      <>
                        <CheckCircle size={12} className="mr-1" />
                        連携済み
                      </>
                    ) : (
                      "未連携"
                    )}
                  </Badge>
                </div>

                {lineConnected ? (
                  <>
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label>LINE公式アカウントID</Label>
                        <Input
                          value="@saishoku-agent"
                          readOnly
                          className="bg-[var(--muted)]"
                        />
                      </div>
                      <div>
                        <Label>Webhook URL</Label>
                        <Input
                          value="https://api.saishoku.jp/webhooks/line"
                          readOnly
                          className="bg-[var(--muted)]"
                        />
                      </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-4">
                      <h3 className="font-medium text-[var(--foreground)] mb-4 flex items-center gap-2">
                        <Bell size={16} />
                        自動通知設定
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="cursor-pointer">
                            新規登録時に自動メッセージ送信
                          </Label>
                          <Switch
                            checked={lineNotifications.newRegistration}
                            onCheckedChange={(checked) =>
                              setLineNotifications((prev) => ({
                                ...prev,
                                newRegistration: checked,
                              }))
                            }
                            className="data-[state=checked]:bg-green-500"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="cursor-pointer">
                            面談完了時に診断結果を送信
                          </Label>
                          <Switch
                            checked={lineNotifications.meetingComplete}
                            onCheckedChange={(checked) =>
                              setLineNotifications((prev) => ({
                                ...prev,
                                meetingComplete: checked,
                              }))
                            }
                            className="data-[state=checked]:bg-green-500"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="cursor-pointer">
                            選考ステータス更新時に通知
                          </Label>
                          <Switch
                            checked={lineNotifications.selectionUpdate}
                            onCheckedChange={(checked) =>
                              setLineNotifications((prev) => ({
                                ...prev,
                                selectionUpdate: checked,
                              }))
                            }
                            className="data-[state=checked]:bg-green-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline">
                        <ExternalLink size={16} className="mr-1" />
                        LINE管理画面を開く
                      </Button>
                      <Button onClick={handleSaveLineSettings}>
                        設定を保存
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[var(--muted-foreground)] mb-4">
                      LINE公式アカウントと連携してください
                    </p>
                    <Button className="btn-gradient">
                      <Link2 size={16} className="mr-1" />
                      LINE連携を開始
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Slack Integration */}
            <Card className="border-none shadow-soft mb-6">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Slack size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <h2 className="font-bold text-[var(--foreground)]">
                        Slack連携
                      </h2>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        運営メンバーへの通知
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      slackConnected
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {slackConnected ? (
                      <>
                        <CheckCircle size={12} className="mr-1" />
                        連携済み
                      </>
                    ) : (
                      "未連携"
                    )}
                  </Badge>
                </div>

                {slackConnected ? (
                  <>
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label>ワークスペース</Label>
                        <Input
                          value="saishoku-team.slack.com"
                          readOnly
                          className="bg-[var(--muted)]"
                        />
                      </div>
                      <div>
                        <Label>通知チャンネル</Label>
                        <Input
                          value="#notifications"
                          readOnly
                          className="bg-[var(--muted)]"
                        />
                      </div>
                    </div>

                    <div className="border-t border-[var(--border)] pt-4">
                      <h3 className="font-medium text-[var(--foreground)] mb-4 flex items-center gap-2">
                        <Bell size={16} />
                        通知設定
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="cursor-pointer">
                            新規候補者登録時
                          </Label>
                          <Switch
                            checked={slackNotifications.newRegistration}
                            onCheckedChange={(checked) =>
                              setSlackNotifications((prev) => ({
                                ...prev,
                                newRegistration: checked,
                              }))
                            }
                            className="data-[state=checked]:bg-purple-500"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="cursor-pointer">
                            面談予約時
                          </Label>
                          <Switch
                            checked={slackNotifications.meetingScheduled}
                            onCheckedChange={(checked) =>
                              setSlackNotifications((prev) => ({
                                ...prev,
                                meetingScheduled: checked,
                              }))
                            }
                            className="data-[state=checked]:bg-purple-500"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="cursor-pointer">
                            選考ステータス更新時
                          </Label>
                          <Switch
                            checked={slackNotifications.selectionUpdate}
                            onCheckedChange={(checked) =>
                              setSlackNotifications((prev) => ({
                                ...prev,
                                selectionUpdate: checked,
                              }))
                            }
                            className="data-[state=checked]:bg-purple-500"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="cursor-pointer">
                            日次レポート（毎朝9時）
                          </Label>
                          <Switch
                            checked={slackNotifications.dailyReport}
                            onCheckedChange={(checked) =>
                              setSlackNotifications((prev) => ({
                                ...prev,
                                dailyReport: checked,
                              }))
                            }
                            className="data-[state=checked]:bg-purple-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline">
                        <ExternalLink size={16} className="mr-1" />
                        Slack設定を開く
                      </Button>
                      <Button onClick={handleSaveSlackSettings}>
                        設定を保存
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[var(--muted-foreground)] mb-4">
                      Slackワークスペースと連携してください
                    </p>
                    <Button className="btn-gradient">
                      <Link2 size={16} className="mr-1" />
                      Slack連携を開始
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* MicroCMS Info */}
            <Card className="border-none shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Settings size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h2 className="font-bold text-[var(--foreground)]">
                        MicroCMS
                      </h2>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        記事・パートナー情報の管理
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle size={12} className="mr-1" />
                    連携済み
                  </Badge>
                </div>

                <div className="mt-4 p-4 bg-[var(--muted)] rounded-lg">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    コンテンツ管理はMicroCMS管理画面から行ってください。
                  </p>
                </div>

                <div className="flex justify-end mt-4">
                  <Button variant="outline">
                    <ExternalLink size={16} className="mr-1" />
                    MicroCMS管理画面を開く
                  </Button>
                </div>
              </CardContent>
            </Card>
    </div>
  );
}
