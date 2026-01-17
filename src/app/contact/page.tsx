"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { FloatingFlowers } from "@/components/flower-decoration";
import { Footer, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { partners } from "@/lib/mock-data";

function ContactForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const partnerId = searchParams.get("partner");
  const consultationType = searchParams.get("type") || "instant";
  const selectedDate = searchParams.get("date");
  const selectedTime = searchParams.get("time");

  const partner = partners.find((p) => p.id === partnerId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    createAccount: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect based on consultation type
    if (consultationType === "instant") {
      router.push(`/meeting?partner=${partnerId}`);
    } else {
      router.push(
        `/booking/complete?partner=${partnerId}&date=${selectedDate}&time=${selectedTime}`,
      );
    }
  };

  const isInstant = consultationType === "instant";

  return (
    <main className="relative z-10 min-h-screen pt-20">
      {/* Back Button */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft size={20} />
          <span>戻る</span>
        </button>
      </div>

      {/* Form Section */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 bg-[var(--input)] text-[var(--primary)] rounded-full text-sm font-medium mb-4">
              {isInstant ? "今すぐ面談" : "予約面談"}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
              {isInstant ? "面談を始める前に" : "予約情報の入力"}
            </h1>
            <p className="text-[var(--muted-foreground)]">
              簡単な情報を入力して{isInstant ? "面談を開始" : "予約を完了"}
              しましょう
            </p>
          </div>

          {/* Partner Info */}
          {partner && (
            <Card className="border-none shadow-soft mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={partner.imageUrl}
                    alt={partner.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[var(--accent)]"
                  />
                  <div>
                    <p className="font-bold text-[var(--foreground)]">
                      {partner.name}
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {partner.tagline}
                    </p>
                  </div>
                </div>
                {selectedDate && selectedTime && (
                  <div className="mt-4 pt-4 border-t border-[var(--border)]">
                    <p className="text-sm text-[var(--muted-foreground)]">
                      予約日時:{" "}
                      <span className="font-medium text-[var(--foreground)]">
                        {selectedDate} {selectedTime}
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Form */}
          <Card className="border-none shadow-soft">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User size={16} className="text-[var(--primary)]" />
                    お名前
                    <span className="text-xs text-[var(--muted-foreground)]">
                      （任意）
                    </span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="山田 太郎"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail size={16} className="text-[var(--primary)]" />
                    メールアドレス
                    <span className="text-xs text-[var(--destructive)]">
                      （必須）
                    </span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                  />
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Zoom URLの送信に使用します
                  </p>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone size={16} className="text-[var(--primary)]" />
                    電話番号
                    <span className="text-xs text-[var(--muted-foreground)]">
                      （任意）
                    </span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="090-1234-5678"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                  />
                </div>

                {/* Topic */}
                <div className="space-y-2">
                  <Label htmlFor="topic" className="flex items-center gap-2">
                    <MessageSquare
                      size={16}
                      className="text-[var(--primary)]"
                    />
                    相談テーマ
                    <span className="text-xs text-[var(--muted-foreground)]">
                      （任意）
                    </span>
                  </Label>
                  <Textarea
                    id="topic"
                    placeholder="例：転職するか迷っている、年収を上げたい、今の仕事が合っているか不安..."
                    rows={4}
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                    className="border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)] resize-none"
                  />
                  <p className="text-xs text-[var(--muted-foreground)]">
                    事前に共有いただくとスムーズにお話しできます
                  </p>
                </div>

                {/* Create Account Checkbox */}
                <div className="flex items-start space-x-3 p-4 bg-[var(--muted)] rounded-lg">
                  <Checkbox
                    id="createAccount"
                    checked={formData.createAccount}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        createAccount: checked as boolean,
                      })
                    }
                    className="mt-0.5 border-[var(--primary)] data-[state=checked]:bg-[var(--primary)]"
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="createAccount"
                      className="text-sm font-medium cursor-pointer"
                    >
                      入力したメールアドレスでアカウントを作成する
                    </Label>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      次回以降、情報の入力を省略できます。アカウント作成は無料です。
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!formData.email || isSubmitting}
                  className="w-full btn-gradient rounded-full py-6 text-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      処理中...
                    </span>
                  ) : (
                    <>
                      {isInstant ? "面談を開始する" : "予約を確定する"}
                      <ArrowRight size={20} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Notice */}
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
              <CheckCircle2
                size={16}
                className="text-green-500 mt-0.5 shrink-0"
              />
              <span>
                顔出しなしでもOK。音声のみでリラックスしてお話しいただけます。
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
              <CheckCircle2
                size={16}
                className="text-green-500 mt-0.5 shrink-0"
              />
              <span>途中退出も自由です。無理のない範囲でご参加ください。</span>
            </div>
            <p className="text-xs text-center text-[var(--muted-foreground)] mt-4">
              送信することで
              <Link
                href="/terms"
                className="text-[var(--primary)] hover:underline"
              >
                利用規約
              </Link>
              と
              <Link
                href="/privacy"
                className="text-[var(--primary)] hover:underline"
              >
                プライバシーポリシー
              </Link>
              に同意したものとみなされます。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <FloatingFlowers />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <ContactForm />
      </Suspense>
      <Footer />
    </>
  );
}
