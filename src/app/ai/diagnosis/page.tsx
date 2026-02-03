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
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
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
import { candidates, tags } from "@/lib/mock-data";

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

export default function AIDiagnosisPage() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const selectedCandidate = candidates.find(
    (c) => c.id === selectedCandidateId
  );

  const handleStartDiagnosis = () => {
    if (!selectedCandidateId) {
      toast.error("候補者を選択してください");
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setResult(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);

          // モック結果生成
          const candidateTags = tags.filter((t) =>
            selectedCandidate?.tagIds.includes(t.id)
          );
          const hasLeadershipTag = candidateTags.some((t) =>
            ["マネジメント志向", "マネジメント経験"].includes(t.name)
          );
          const hasSalesTag = candidateTags.some((t) =>
            ["営業志向", "法人営業経験", "新規開拓経験"].includes(t.name)
          );

          setResult({
            overallScore: 78,
            rank: "A",
            dimensions: [
              { name: "コミュニケーション", score: 85, fullMark: 100 },
              { name: "論理的思考", score: 72, fullMark: 100 },
              { name: "リーダーシップ", score: hasLeadershipTag ? 80 : 65, fullMark: 100 },
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

  const handleDownload = () => {
    toast.success("診断結果をダウンロードしました");
  };

  const handleShare = () => {
    toast.success("LINEで診断結果を共有しました");
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
                href="/"
                className="inline-flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-4"
              >
                <ArrowLeft size={16} className="mr-1" />
                トップに戻る
              </Link>
              <div className="flex items-center gap-2 mb-2">
                <Award size={24} className="text-[var(--primary)]" />
                <h1 className="text-2xl font-bold text-[var(--foreground)]">
                  人間的市場価値診断
                </h1>
              </div>
              <p className="text-[var(--muted-foreground)]">
                候補者の強みを可視化し、市場価値を診断します
              </p>
            </div>

            {/* Candidate Selector */}
            <Card className="border-none shadow-soft mb-6">
              <CardContent className="p-6">
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <Label className="mb-2 block">候補者を選択</Label>
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
                    className="btn-gradient"
                    onClick={handleStartDiagnosis}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        診断中...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} className="mr-2" />
                        診断を開始
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Processing */}
            {isAnalyzing && (
              <Card className="border-none shadow-soft mb-6">
                <CardContent className="p-8 text-center">
                  <Loader2
                    size={48}
                    className="mx-auto mb-4 text-[var(--primary)] animate-spin"
                  />
                  <h3 className="font-bold text-[var(--foreground)] mb-2">
                    AIが診断中...
                  </h3>
                  <Progress value={progress} className="mb-4 max-w-md mx-auto" />
                  <p className="text-sm text-[var(--muted-foreground)]">
                    候補者の情報とタグを分析しています
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Results */}
            {result && !isAnalyzing && (
              <div className="space-y-6">
                {/* Overall Score */}
                <Card className="border-none shadow-soft overflow-hidden">
                  <div className="bg-bloom-gradient p-6 text-white text-center">
                    <p className="text-sm opacity-90 mb-2">総合スコア</p>
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-6xl font-bold">
                        {result.overallScore}
                      </span>
                      <div className="text-left">
                        <Badge className="bg-white text-[var(--primary)] text-lg px-3 py-1">
                          {result.rank}ランク
                        </Badge>
                        <p className="text-sm opacity-90 mt-1">上位15%</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <User size={20} className="text-[var(--primary)]" />
                      <span className="font-bold text-[var(--foreground)]">
                        {selectedCandidate?.name}さんの診断結果
                      </span>
                    </div>

                    {/* Radar Chart */}
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={result.dimensions}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <Radar
                            name="スコア"
                            dataKey="score"
                            stroke="#FF6B9D"
                            fill="#FF6B9D"
                            fillOpacity={0.5}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Strengths & Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-none shadow-soft">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                        <Star size={20} className="text-yellow-500" />
                        強み
                      </h3>
                      <ul className="space-y-3">
                        {result.strengths.map((strength, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle
                              size={16}
                              className="text-green-500 mt-0.5 shrink-0"
                            />
                            <span className="text-[var(--foreground)]">
                              {strength}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-soft">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-blue-500" />
                        伸びしろ
                      </h3>
                      <ul className="space-y-3">
                        {result.improvements.map((improvement, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm"
                          >
                            <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 shrink-0">
                              <span className="text-blue-500 text-xs font-bold">
                                {i + 1}
                              </span>
                            </div>
                            <span className="text-[var(--foreground)]">
                              {improvement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Market Value */}
                <Card className="border-none shadow-soft">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                      <BarChart3 size={20} className="text-purple-500" />
                      推定市場価値
                    </h3>
                    <div className="bg-[var(--muted)] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[var(--muted-foreground)]">
                          {(result.marketValue.min / 10000).toLocaleString()}万円
                        </span>
                        <span className="text-sm text-[var(--muted-foreground)]">
                          {(result.marketValue.max / 10000).toLocaleString()}万円
                        </span>
                      </div>
                      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                          style={{ width: "70%" }}
                        />
                        <div
                          className="absolute top-0 h-full w-1 bg-white"
                          style={{ left: "50%" }}
                        />
                      </div>
                      <p className="text-center mt-2">
                        <span className="text-2xl font-bold text-[var(--primary)]">
                          {(result.marketValue.average / 10000).toLocaleString()}
                        </span>
                        <span className="text-[var(--foreground)]">万円</span>
                        <span className="text-sm text-[var(--muted-foreground)] ml-2">
                          （適正年収）
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="border-none shadow-soft">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                      <Sparkles size={20} className="text-[var(--primary)]" />
                      おすすめのキャリア
                    </h3>
                    <div className="space-y-3">
                      {result.recommendations.map((rec, i) => (
                        <div
                          key={i}
                          className="p-3 bg-[var(--muted)] rounded-lg flex items-center gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold">
                            {i + 1}
                          </div>
                          <span className="text-[var(--foreground)]">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleDownload}
                  >
                    <Download size={16} className="mr-2" />
                    PDFでダウンロード
                  </Button>
                  <Button className="flex-1 btn-gradient" onClick={handleShare}>
                    <Share2 size={16} className="mr-2" />
                    LINEで共有
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
