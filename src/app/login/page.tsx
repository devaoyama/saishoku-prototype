"use client";

import { ArrowRight, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { FloatingFlowers } from "@/components/flower-decoration";
import { Footer, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSent(true);
    setIsSubmitting(false);
    toast.success("ログインリンクを送信しました");
  };

  return (
    <>
      <Header />
      <FloatingFlowers />

      <main className="relative z-10 min-h-screen pt-20 flex items-center">
        <section className="w-full px-4 py-8">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-full bg-bloom-gradient flex items-center justify-center">
                  <span className="text-white font-bold text-xl">才</span>
                </div>
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
                ログイン
              </h1>
              <p className="text-[var(--muted-foreground)]">
                メールアドレスでログイン
              </p>
            </div>

            {!isSent ? (
              <Card className="border-none shadow-soft animate-fade-in-up">
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2"
                      >
                        <Mail size={16} className="text-[var(--primary)]" />
                        メールアドレス
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                      />
                      <p className="text-xs text-[var(--muted-foreground)]">
                        登録済みのメールアドレスを入力してください
                      </p>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={!email || isSubmitting}
                      className="w-full btn-gradient rounded-full py-6 text-lg disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          送信中...
                        </span>
                      ) : (
                        <>
                          ログインリンクを送信
                          <ArrowRight size={20} className="ml-2" />
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Divider */}
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[var(--border)]" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 text-sm text-[var(--muted-foreground)]">
                        または
                      </span>
                    </div>
                  </div>

                  {/* Register Link */}
                  <div className="text-center">
                    <p className="text-sm text-[var(--muted-foreground)] mb-4">
                      まだアカウントをお持ちでない方
                    </p>
                    <Link href="/#partners">
                      <Button
                        variant="outline"
                        className="w-full border-[var(--primary)] text-[var(--primary)] rounded-full py-6"
                      >
                        <Sparkles size={18} className="mr-2" />
                        今すぐ相談して登録
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-none shadow-soft animate-fade-in-up">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Mail size={32} className="text-green-500" />
                  </div>
                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
                    メールを送信しました
                  </h2>
                  <p className="text-[var(--muted-foreground)] mb-6">
                    <span className="font-medium text-[var(--foreground)]">
                      {email}
                    </span>
                    <br />
                    にログインリンクを送信しました。
                    <br />
                    メール内のリンクをクリックしてログインしてください。
                  </p>
                  <div className="p-4 bg-[var(--muted)] rounded-lg text-sm text-[var(--muted-foreground)]">
                    <p>
                      メールが届かない場合は、迷惑メールフォルダをご確認ください。
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsSent(false);
                      setEmail("");
                    }}
                    className="mt-6 text-[var(--primary)]"
                  >
                    別のメールアドレスで試す
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="text-[var(--muted-foreground)]"
                >
                  トップページに戻る
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
