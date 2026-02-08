"use client";

import {
  ArrowLeft,
  CheckCircle,
  Download,
  FileText,
  Loader2,
  Mic,
  RefreshCw,
  Sparkles,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { FloatingFlowers } from "@/components/flower-decoration";
import { Footer, Header } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { candidates } from "@/lib/mock-data";

type Step = "upload" | "processing" | "review" | "complete";

export default function AIResumePage() {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [manualInput, setManualInput] = useState("");

  const [generatedResume, setGeneratedResume] = useState({
    summary: "",
    strengths: [] as string[],
    experience: "",
    skills: [] as string[],
  });

  const selectedCandidate = candidates.find(
    (c) => c.id === selectedCandidateId
  );

  const handleFileUpload = () => {
    toast.info("音声ファイルがアップロードされました");
  };

  const handleStartProcessing = () => {
    if (!selectedCandidateId && !manualInput) {
      toast.error("候補者を選択するか、面談内容を入力してください");
      return;
    }

    setIsProcessing(true);
    setCurrentStep("processing");
    setProgress(0);

    // シミュレーション: 処理中のプログレス
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setCurrentStep("review");

          // モック生成結果
          setGeneratedResume({
            summary: `${selectedCandidate?.name || "候補者"}は、${selectedCandidate?.currentCompany || "現職"}で${selectedCandidate?.currentPosition || "営業職"}として活躍。高いコミュニケーション能力と粘り強さを持ち、目標達成に向けて主体的に行動できる人材です。`,
            strengths: [
              "目標達成への強いコミットメント",
              "顧客との信頼関係構築力",
              "チームを巻き込む推進力",
              "論理的な提案力",
            ],
            experience: `【現職での主な実績】
・新規顧客開拓で部門内トップの成績を達成
・既存顧客のアップセルにより売上120%成長に貢献
・後輩3名の育成・指導を担当

【強みとなるスキル】
・法人営業経験（3年）
・提案書作成・プレゼンテーション
・CRMツールの活用`,
            skills: [
              "法人営業",
              "新規開拓",
              "提案営業",
              "顧客折衝",
              "チームマネジメント",
            ],
          });

          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleRegenerate = () => {
    toast.info("履歴書を再生成しています...");
    setCurrentStep("processing");
    setProgress(0);
    handleStartProcessing();
  };

  const handleDownload = () => {
    toast.success("履歴書をダウンロードしました");
    setCurrentStep("complete");
  };

  const steps = [
    { key: "upload", label: "1. 入力" },
    { key: "processing", label: "2. AI処理" },
    { key: "review", label: "3. 確認・編集" },
    { key: "complete", label: "4. 完了" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

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
                href="/"
                className="inline-flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-4"
              >
                <ArrowLeft size={16} className="mr-1" />
                トップに戻る
              </Link>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={24} className="text-[var(--primary)]" />
                <h1 className="text-2xl font-bold text-[var(--foreground)]">
                  AI履歴書作成支援
                </h1>
              </div>
              <p className="text-[var(--muted-foreground)]">
                面談内容からAIが履歴書のドラフトを自動生成します
              </p>
            </div>

            {/* Progress Steps */}
            <Card className="border-none shadow-soft mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div
                      key={step.key}
                      className="flex items-center"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index <= currentStepIndex
                            ? "bg-[var(--primary)] text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {index < currentStepIndex ? (
                          <CheckCircle size={16} />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span
                        className={`ml-2 text-sm ${
                          index <= currentStepIndex
                            ? "text-[var(--foreground)] font-medium"
                            : "text-[var(--muted-foreground)]"
                        }`}
                      >
                        {step.label}
                      </span>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-12 h-0.5 mx-4 ${
                            index < currentStepIndex
                              ? "bg-[var(--primary)]"
                              : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step Content */}
            {currentStep === "upload" && (
              <Card className="border-none shadow-soft">
                <CardContent className="p-6">
                  <h2 className="font-bold text-[var(--foreground)] mb-4">
                    入力方法を選択
                  </h2>

                  {/* Candidate Selector */}
                  <div className="mb-6">
                    <Label className="mb-2 block">候補者を選択（任意）</Label>
                    <Select
                      value={selectedCandidateId}
                      onValueChange={setSelectedCandidateId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="候補者を選択..." />
                      </SelectTrigger>
                      <SelectContent>
                        {candidates.map((candidate) => (
                          <SelectItem key={candidate.id} value={candidate.id}>
                            {candidate.name}
                        {candidate.currentCompany ? `（${candidate.currentCompany}）` : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* File Upload */}
                  <div className="mb-6">
                    <Label className="mb-2 block">音声/動画ファイルをアップロード</Label>
                    <div
                      className="border-2 border-dashed border-[var(--border)] rounded-lg p-8 text-center hover:border-[var(--primary)] transition-colors cursor-pointer"
                      onClick={handleFileUpload}
                    >
                      <Upload
                        size={48}
                        className="mx-auto mb-4 text-[var(--muted-foreground)]"
                      />
                      <p className="text-[var(--foreground)] font-medium mb-1">
                        クリックしてファイルを選択
                      </p>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        MP3, WAV, MP4, MOV 対応（最大500MB）
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-[var(--border)]" />
                    <span className="text-sm text-[var(--muted-foreground)]">
                      または
                    </span>
                    <div className="flex-1 h-px bg-[var(--border)]" />
                  </div>

                  {/* Manual Input */}
                  <div className="mb-6">
                    <Label className="mb-2 block">面談内容を手動入力</Label>
                    <Textarea
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                      placeholder="面談で話した内容、候補者の強み、経歴などを入力してください..."
                      rows={6}
                    />
                  </div>

                  <Button
                    className="w-full btn-gradient"
                    onClick={handleStartProcessing}
                  >
                    <Sparkles size={16} className="mr-2" />
                    AIで履歴書を生成
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === "processing" && (
              <Card className="border-none shadow-soft">
                <CardContent className="p-8 text-center">
                  <Loader2
                    size={64}
                    className="mx-auto mb-6 text-[var(--primary)] animate-spin"
                  />
                  <h2 className="font-bold text-xl text-[var(--foreground)] mb-2">
                    AIが履歴書を生成中...
                  </h2>
                  <p className="text-[var(--muted-foreground)] mb-6">
                    面談内容を分析し、強みを抽出しています
                  </p>
                  <Progress value={progress} className="mb-4" />
                  <div className="space-y-2 text-sm text-[var(--muted-foreground)]">
                    {progress >= 20 && (
                      <p className="flex items-center justify-center gap-2">
                        <CheckCircle
                          size={14}
                          className="text-green-500"
                        />
                        音声認識完了
                      </p>
                    )}
                    {progress >= 50 && (
                      <p className="flex items-center justify-center gap-2">
                        <CheckCircle
                          size={14}
                          className="text-green-500"
                        />
                        内容分析完了
                      </p>
                    )}
                    {progress >= 80 && (
                      <p className="flex items-center justify-center gap-2">
                        <CheckCircle
                          size={14}
                          className="text-green-500"
                        />
                        強み抽出完了
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === "review" && (
              <div className="space-y-6">
                <Card className="border-none shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-bold text-[var(--foreground)]">
                        生成された履歴書
                      </h2>
                      <Button variant="outline" size="sm" onClick={handleRegenerate}>
                        <RefreshCw size={14} className="mr-1" />
                        再生成
                      </Button>
                    </div>

                    {/* Summary */}
                    <div className="mb-6">
                      <Label className="mb-2 block">自己PR</Label>
                      <Textarea
                        value={generatedResume.summary}
                        onChange={(e) =>
                          setGeneratedResume((prev) => ({
                            ...prev,
                            summary: e.target.value,
                          }))
                        }
                        rows={4}
                      />
                    </div>

                    {/* Strengths */}
                    <div className="mb-6">
                      <Label className="mb-2 block">強み</Label>
                      <div className="flex flex-wrap gap-2">
                        {generatedResume.strengths.map((strength, i) => (
                          <Badge
                            key={i}
                            className="bg-[var(--primary)] text-white px-3 py-1"
                          >
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="mb-6">
                      <Label className="mb-2 block">職務経歴</Label>
                      <Textarea
                        value={generatedResume.experience}
                        onChange={(e) =>
                          setGeneratedResume((prev) => ({
                            ...prev,
                            experience: e.target.value,
                          }))
                        }
                        rows={10}
                      />
                    </div>

                    {/* Skills */}
                    <div className="mb-6">
                      <Label className="mb-2 block">スキル</Label>
                      <div className="flex flex-wrap gap-2">
                        {generatedResume.skills.map((skill, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="px-3 py-1"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setCurrentStep("upload")}
                  >
                    やり直す
                  </Button>
                  <Button className="flex-1 btn-gradient" onClick={handleDownload}>
                    <Download size={16} className="mr-2" />
                    PDFでダウンロード
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "complete" && (
              <Card className="border-none shadow-soft">
                <CardContent className="p-8 text-center">
                  <CheckCircle
                    size={64}
                    className="mx-auto mb-6 text-green-500"
                  />
                  <h2 className="font-bold text-xl text-[var(--foreground)] mb-2">
                    履歴書の作成が完了しました！
                  </h2>
                  <p className="text-[var(--muted-foreground)] mb-6">
                    ダウンロードした履歴書をLINEで候補者に送付してください
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep("upload")}
                    >
                      新しい履歴書を作成
                    </Button>
                    <Link href="/admin/candidates">
                      <Button className="btn-gradient">候補者一覧へ</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
