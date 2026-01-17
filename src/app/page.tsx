"use client";

import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { FloatingFlowers } from "@/components/flower-decoration";
import { HashtagPillGroup } from "@/components/hashtag-pill";
import { Footer, Header } from "@/components/layout";
import { PartnerCard } from "@/components/partner-card";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  checkCards,
  partners,
  processSteps,
  testimonials,
} from "@/lib/mock-data";

export default function Home() {
  const availablePartners = partners.filter((p) => p.status === "available");
  const otherPartners = partners.filter((p) => p.status !== "available");

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <FloatingFlowers />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            {/* Main Copy */}
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6 leading-tight">
                今よりもっと
                <span className="text-[var(--primary)]">輝ける</span>。
              </h1>
              <p className="text-xl md:text-2xl text-[var(--foreground)] mb-4">
                才能を、最適な職へ。
              </p>
              <p className="text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
                キャリアも、マインドも、ビジュアルも。
                <br className="hidden sm:block" />
                人間的市場価値の最大化を支援する20代特化型キャリアパートナーサービス
              </p>
            </div>

            {/* Hashtags */}
            <div className="animate-fade-in-up stagger-1 mb-8 flex justify-center">
              <HashtagPillGroup
                tags={[
                  "100%年収アップ目標",
                  "ライフプランから設計",
                  "20代営業・ビジネス職特化",
                ]}
              />
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up stagger-2 flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="#partners"
                onClick={(e) => scrollToSection(e, "partners")}
              >
                <Button className="btn-gradient rounded-full px-8 py-6 text-lg shadow-soft hover:shadow-soft-hover animate-pulse-glow">
                  <Sparkles size={20} className="mr-2" />
                  今すぐ話せるパートナーを見る
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => scrollToSection(e, "how-it-works")}
              >
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--input)]"
                >
                  サービスの流れを見る
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="animate-fade-in-up stagger-3 flex flex-wrap justify-center gap-6 text-sm text-[var(--muted-foreground)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-500" />
                <span>顔出しなしOK</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-500" />
                <span>途中退出OK</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-500" />
                <span>予約不要で即面談</span>
              </div>
            </div>
          </div>
        </section>

        {/* Check Cards Section - Pain Points */}
        <section className="py-16 px-4 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <SectionTitle
              badge="こんなモヤモヤありませんか？"
              title="転職、迷いますよね。"
              subtitle="一人で抱え込まなくて大丈夫。まずは気軽に話してみませんか？"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {checkCards.map((card, index) => (
                <Card
                  key={card.number}
                  className="card-hover border-none shadow-soft animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <span className="text-xs font-medium text-[var(--primary)] mb-2 block">
                      CHECK{card.number}
                    </span>
                    <div className="text-4xl mb-4">{card.icon}</div>
                    <h3 className="font-bold text-lg text-[var(--foreground)] mb-2 whitespace-pre-line">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="py-16 px-4 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <SectionTitle
              badge="今すぐ話せる"
              title="あなたのパートナーを見つけよう"
              subtitle="直感で選んでOK。相性が合わなければ、いつでも変更できます。"
            />

            {/* Available Partners */}
            {availablePartners.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <h3 className="font-bold text-lg text-[var(--foreground)]">
                    今すぐ相談OK（{availablePartners.length}名）
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availablePartners.map((partner, index) => (
                    <div
                      key={partner.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <PartnerCard partner={partner} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Partners */}
            {otherPartners.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="font-medium text-[var(--muted-foreground)]">
                    その他のパートナー（予約可能）
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherPartners.map((partner, index) => (
                    <div
                      key={partner.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <PartnerCard partner={partner} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-16 px-4 bg-white/50 scroll-mt-20"
        >
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              badge="STEP"
              title="サポートの流れ"
              subtitle="たった5ステップで、あなたに最適なキャリア相談を。"
            />

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)]" />

              {processSteps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative flex items-start gap-6 mb-8 last:mb-0 animate-fade-in-up ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Number Badge */}
                  <div
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-number font-bold text-white shrink-0 ${
                      step.color === "pink"
                        ? "bg-[var(--primary)]"
                        : "bg-[var(--secondary)]"
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Content */}
                  <Card className="flex-1 border-none shadow-soft md:max-w-[calc(50%-3rem)]">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg text-[var(--foreground)] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <SectionTitle
              badge="VOICE"
              title="利用者の声"
              subtitle="実際にサービスを利用した方々の体験談です。"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className="card-hover border-none shadow-soft border-l-4 border-l-[var(--primary)] animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-[var(--foreground)]">
                          {testimonial.name}さん
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {testimonial.profile}
                        </p>
                      </div>
                    </div>
                    <h4 className="font-bold text-[var(--primary)] mb-2">
                      {testimonial.highlight}
                    </h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {testimonial.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-bloom-gradient border-none shadow-soft overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center text-white relative">
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-white/10 blur-3xl" />

                <h2 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">
                  思い立った瞬間が、
                  <br className="sm:hidden" />
                  チャンス。
                </h2>
                <p className="text-white/90 mb-8 relative z-10">
                  モヤモヤを抱えているなら、まずは話してみませんか？
                  <br className="hidden sm:block" />
                  顔出しなし、途中退出OKで、気軽にスタートできます。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <a
                    href="#partners"
                    onClick={(e) => scrollToSection(e, "partners")}
                  >
                    <Button className="bg-white text-[var(--primary)] hover:bg-white/90 rounded-full px-8 py-6 text-lg font-bold">
                      <MessageCircle size={20} className="mr-2" />
                      今すぐ相談する
                    </Button>
                  </a>
                  <Link href="/booking">
                    <Button
                      variant="outline"
                      className="border-white text-white bg-white/10 hover:bg-white/20 rounded-full px-8 py-6 text-lg"
                    >
                      <Calendar size={20} className="mr-2" />
                      予約して相談する
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
