"use client";

import {
  ArrowLeft,
  Award,
  BarChart3,
  CheckCircle,
  Download,
  Loader2,
  Share2,
  Sparkles,
  Star,
  TrendingUp,
  Upload,
  User,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
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
import { candidates, savedDiagnoses, tags } from "@/lib/mock-data";

type DiagnosisResult = {
  overallScore: number;
  rank: string;
  dimensions: {
    name: string;
    score: number;
    fullMark: number;
  }[];
  strengths: string[];
  improvements: string[];
  marketValue: {
    min: number;
    max: number;
    average: number;
  };
  recommendations: string[];
};

type Step = "upload" | "processing" | "review" | "complete";

function DiagnosisContent() {
  const searchParams = useSearchParams();
  const candidateIdFromUrl = searchParams.get("candidateId") ?? "";
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [selectedCandidateId, setSelectedCandidateId] =
    useState<string>(candidateIdFromUrl);
  const [hasUploadedFile, setHasUploadedFile] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const selectedCandidate = candidates.find(
    (c) => c.id === selectedCandidateId,
  );

  const steps = [
    { key: "upload" as const, label: "1. アップロード" },
    { key: "processing" as const, label: "2. 自動診断" },
    { key: "review" as const, label: "3. 確認" },
    { key: "complete" as const, label: "4. 出力" },
  ];

  const handleFileUpload = () => {
    setHasUploadedFile(true);
    toast.success("動画・音声をアップロードしました。診断を開始できます");
  };

  const handleStartDiagnosis = () => {
    if (!hasUploadedFile) {
      toast.error("動画・音声をアップロードしてください");
      return;
    }
    setCurrentStep("processing");
    setIsAnalyzing(true);
    setProgress(0);
    setResult(null);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setCurrentStep("review");
          const candidateTags = tags.filter((t) =>
            selectedCandidate?.tagIds.includes(t.id),
          );
          const hasLeadershipTag = candidateTags.some((t) =>
            ["マネジメント志向", "マネジメント経験"].includes(t.name),
          );
          const hasSalesTag = candidateTags.some((t) =>
            ["営業志向", "法人営業経験", "新規開拓経験"].includes(t.name),
          );
          setResult({
            overallScore: 78,
            rank: "A",
            dimensions: [
              { name: "コミュニケーション", score: 85, fullMark: 100 },
              { name: "論理的思考", score: 72, fullMark: 100 },
              {
                name: "リーダーシップ",
                score: hasLeadershipTag ? 80 : 65,
                fullMark: 100,
              },
              { name: "行動力", score: 88, fullMark: 100 },
              { name: "専門性", score: hasSalesTag ? 75 : 68, fullMark: 100 },
              { name: "成長意欲", score: 90, fullMark: 100 },
            ],
            strengths: [
              "目標に対する強いコミットメント",
              "初対面でも臆せず話せるコミュニケーション力",
              "困難な状況でも諦めない粘り強さ",
              "チームを巻き込む推進力",
            ],
            improvements: [
              "戦略的な思考力の強化",
              "データに基づいた意思決定",
              "長期的なキャリアビジョンの明確化",
            ],
            marketValue: {
              min: selectedCandidate?.currentSalary || 4000000,
              max: (selectedCandidate?.currentSalary || 4000000) * 1.3,
              average: (selectedCandidate?.currentSalary || 4000000) * 1.15,
            },
            recommendations: [
              "成長中のSaaS企業での法人営業",
              "ベンチャー企業でのセールスマネージャー候補",
              "大手企業での新規事業開発営業",
            ],
          });
          return 100;
        }
        return prev + 8;
      });
    }, 400);
  };

  const saveResultAndComplete = () => {
    if (result) {
      savedDiagnoses.push({
        id: `diagnosis-${Date.now()}`,
        createdAt: new Date().toISOString().slice(0, 10),
        candidateId: selectedCandidateId || undefined,
        candidateName: selectedCandidate?.name,
        overallScore: result.overallScore,
        rank: result.rank,
        dimensions: [...result.dimensions],
        strengths: [...result.strengths],
        improvements: [...result.improvements],
        marketValue: { ...result.marketValue },
        recommendations: [...result.recommendations],
      });
    }
    setCurrentStep("complete");
  };

  const handleDownload = () => {
    toast.success("診断結果をダウンロードしました");
    saveResultAndComplete();
  };

  const handleShare = () => {
    toast.success("LINEで診断結果を共有しました");
    saveResultAndComplete();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          パートナーダッシュボードに戻る
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <Award size={24} className="text-slate-600" />
          <h1 className="text-2xl font-bold text-foreground">
            人間的市場価値診断
          </h1>
        </div>
        <p className="text-muted-foreground">
          分析をAIで行い、決まった項目を自動フォーム入力。運営が手直しして最終成果物をアウトプットします。一度作成したものは保存されます
        </p>
      </div>

      <Card className="border border-border bg-card shadow-sm mb-6">
        <CardContent className="p-4">
          <div className="flex gap-2 flex-wrap">
            {steps.map(({ key, label }) => (
              <div
                key={key}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  currentStep === key
                    ? "bg-slate-700 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {currentStep === "upload" && (
        <Card className="border border-border bg-card shadow-sm mb-6">
          <CardContent className="p-6">
            <h2 className="font-bold text-foreground mb-2">
              1. 動画または音声をアップロード
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              面談の録画・録音をアップロードすると、AIが内容を解析して人間的市場価値診断結果を自動表示します
            </p>
            <button
              type="button"
              className={`w-full border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer mb-6 ${
                hasUploadedFile
                  ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                  : "border-border hover:border-slate-400"
              }`}
              onClick={handleFileUpload}
            >
              {hasUploadedFile ? (
                <>
                  <CheckCircle size={48} className="mx-auto mb-4 text-green-600" />
                  <p className="text-foreground font-medium mb-1">
                    ファイルをアップロードしました
                  </p>
                  <p className="text-sm text-muted-foreground">
                    下のボタンで診断を開始
                  </p>
                </>
              ) : (
                <>
                  <Upload size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-foreground font-medium mb-1">
                    クリックして動画・音声を選択
                  </p>
                  <p className="text-sm text-muted-foreground">
                    MP3, WAV, MP4, MOV 対応（最大500MB）
                  </p>
                </>
              )}
            </button>
            <div className="mb-6">
              <Label className="mb-2 block">候補者を選択（任意・コンテキスト用）</Label>
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
                      {candidate.name}（{candidate.currentCompany}）
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full"
              onClick={handleStartDiagnosis}
              disabled={!hasUploadedFile}
            >
              <Sparkles size={16} className="mr-2" />
              {hasUploadedFile
                ? "解析して診断結果を表示"
                : "アップロード後に診断を開始"}
            </Button>
          </CardContent>
        </Card>
      )}

      {currentStep === "processing" && isAnalyzing && (
        <Card className="border border-border bg-card shadow-sm mb-6">
          <CardContent className="p-8 text-center">
            <Loader2
              size={48}
              className="mx-auto mb-4 text-slate-600 animate-spin"
            />
            <h3 className="font-bold text-foreground mb-2">
              解析中… 診断結果を自動で作成しています
            </h3>
            <Progress value={progress} className="mb-4 max-w-md mx-auto" />
            <p className="text-sm text-muted-foreground">
              動画・音声の内容を分析し、人間的市場価値を診断しています
            </p>
          </CardContent>
        </Card>
      )}

      {currentStep === "review" && result && (
        <div className="space-y-6">
          <Card className="border border-border bg-card shadow-sm overflow-hidden">
            <div className="bg-slate-700 p-6 text-white text-center">
              <p className="text-sm opacity-90 mb-2">総合スコア</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-6xl font-bold">
                  {result.overallScore}
                </span>
                <div className="text-left">
                  <Badge className="bg-white text-slate-700 text-lg px-3 py-1">
                    {result.rank}ランク
                  </Badge>
                  <p className="text-sm opacity-90 mt-1">上位15%</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <User size={20} className="text-slate-600" />
                <span className="font-bold text-foreground">
                  {selectedCandidate
                    ? `${selectedCandidate.name}さんの診断結果`
                    : "診断結果"}
                </span>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={result.dimensions}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <Radar
                      name="スコア"
                      dataKey="score"
                      stroke="#475569"
                      fill="#475569"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-border bg-card shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Star size={20} className="text-amber-500" />
                  強み
                </h3>
                <ul className="space-y-3">
                  {result.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        size={16}
                        className="text-green-500 mt-0.5 shrink-0"
                      />
                      <span className="text-foreground">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border border-border bg-card shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-500" />
                  伸びしろ
                </h3>
                <ul className="space-y-3">
                  {result.improvements.map((improvement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 shrink-0">
                        <span className="text-blue-600 text-xs font-bold">
                          {i + 1}
                        </span>
                      </div>
                      <span className="text-foreground">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border border-border bg-card shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-slate-600" />
                推定市場価値
              </h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {(result.marketValue.min / 10000).toLocaleString()}万円
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {(result.marketValue.max / 10000).toLocaleString()}万円
                  </span>
                </div>
                <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-slate-600"
                    style={{ width: "70%" }}
                  />
                  <div
                    className="absolute top-0 h-full w-1 bg-white"
                    style={{ left: "50%" }}
                  />
                </div>
                <p className="text-center mt-2">
                  <span className="text-2xl font-bold text-foreground">
                    {(result.marketValue.average / 10000).toLocaleString()}
                  </span>
                  <span className="text-foreground">万円</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    （適正年収）
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles size={20} className="text-slate-600" />
                おすすめのキャリア
              </h3>
              <div className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="p-3 bg-muted rounded-lg flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <span className="text-foreground">{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 flex-wrap">
            <Button
              variant="outline"
              onClick={() => {
                setCurrentStep("upload");
                setResult(null);
                setHasUploadedFile(false);
                setProgress(0);
              }}
            >
              やり直す
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleDownload}>
              <Download size={16} className="mr-2" />
              PDFでダウンロード
            </Button>
            <Button className="flex-1" onClick={handleShare}>
              <Share2 size={16} className="mr-2" />
              LINEで共有
            </Button>
          </div>
        </div>
      )}

      {currentStep === "complete" && (
        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-8 text-center">
            <CheckCircle size={64} className="mx-auto mb-6 text-green-500" />
            <h2 className="font-bold text-xl text-foreground mb-2">
              診断結果の出力が完了しました
            </h2>
            <p className="text-muted-foreground mb-6">
              ダウンロードや共有で候補者に結果を伝えられます
            </p>
            <Button onClick={() => setCurrentStep("upload")}>
              新しい診断を行う
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function AdminAIDiagnosisPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="w-8 h-8 border-4 border-slate-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DiagnosisContent />
    </Suspense>
  );
}
