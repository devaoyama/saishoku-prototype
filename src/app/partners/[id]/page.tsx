"use client";

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Instagram,
  MessageCircle,
  Mic,
  Twitter,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";
import { FloatingFlowers } from "@/components/flower-decoration";
import { Footer, Header } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { partners } from "@/lib/mock-data";

type PartnerStatus = "available" | "busy" | "offline";

function StatusBadge({ status }: { status: PartnerStatus }) {
  const statusConfig = {
    available: {
      label: "今すぐ相談OK",
      className: "status-online text-white",
    },
    busy: {
      label: "面談中",
      className: "status-busy text-white",
    },
    offline: {
      label: "離席中",
      className: "status-offline text-white",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium ${config.className}`}
    >
      {status === "available" && (
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
      )}
      {config.label}
    </span>
  );
}

export default function PartnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const partner = partners.find((p) => p.id === id);

  if (!partner) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 px-4">
          <div className="max-w-4xl mx-auto text-center py-20">
            <h1 className="text-2xl font-bold mb-4">
              パートナーが見つかりませんでした
            </h1>
            <Link href="/">
              <Button variant="outline">トップに戻る</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const isAvailable = partner.status === "available";

  return (
    <>
      <Header />
      <FloatingFlowers />

      <main className="relative z-10 min-h-screen pt-20">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft size={20} />
            <span>戻る</span>
          </button>
        </div>

        {/* Partner Profile */}
        <section className="px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-none shadow-soft overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-2/5 relative shrink-0">
                  <div className="aspect-square">
                    <img
                      src={partner.imageUrl}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <StatusBadge status={partner.status} />
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="md:w-3/5 p-6 md:p-8 flex flex-col">
                  <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
                    {partner.name}
                  </h1>
                  <p className="text-lg text-[var(--primary)] mb-4">
                    {partner.tagline}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {partner.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-[var(--input)] text-[var(--primary)] border-none"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Consultation Type */}
                  <div className="flex items-center gap-4 mb-6 p-4 bg-[var(--muted)] rounded-lg">
                    <span className="text-sm text-[var(--muted-foreground)]">
                      対応可能形式:
                    </span>
                    <div className="flex items-center gap-3">
                      {(partner.consultationType === "video" ||
                        partner.consultationType === "both") && (
                        <span className="inline-flex items-center gap-1.5 text-sm">
                          <Video size={16} className="text-[var(--primary)]" />
                          ビデオOK
                        </span>
                      )}
                      {(partner.consultationType === "audio" ||
                        partner.consultationType === "both") && (
                        <span className="inline-flex items-center gap-1.5 text-sm">
                          <Mic size={16} className="text-[var(--secondary)]" />
                          音声のみOK
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <h2 className="font-bold text-[var(--foreground)] mb-2">
                      自己紹介
                    </h2>
                    <p className="text-[var(--muted-foreground)] leading-relaxed">
                      {partner.bio}
                    </p>
                  </div>

                  {/* Social Links */}
                  {(partner.twitterUrl || partner.instagramUrl) && (
                    <div className="flex items-center gap-3 mb-8">
                      {partner.twitterUrl && (
                        <a
                          href={partner.twitterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[var(--input)] flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--primary)] hover:text-white transition-all"
                        >
                          <Twitter size={18} />
                        </a>
                      )}
                      {partner.instagramUrl && (
                        <a
                          href={partner.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[var(--input)] flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--primary)] hover:text-white transition-all"
                        >
                          <Instagram size={18} />
                        </a>
                      )}
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4">
                    {isAvailable ? (
                      <>
                        <Link
                          href={`/contact?partner=${partner.id}&type=instant`}
                          className="flex-1"
                        >
                          <Button className="w-full btn-gradient rounded-full py-6 text-lg">
                            <MessageCircle size={20} className="mr-2" />
                            今すぐ話す
                            <ArrowRight size={20} className="ml-2" />
                          </Button>
                        </Link>
                        <Link
                          href={`/booking?partner=${partner.id}`}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            className="w-full border-[var(--primary)] text-[var(--primary)] rounded-full py-6 text-lg"
                          >
                            <Calendar size={20} className="mr-2" />
                            予約する
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={`/booking?partner=${partner.id}`}
                        className="w-full"
                      >
                        <Button className="w-full btn-gradient rounded-full py-6 text-lg">
                          <Calendar size={20} className="mr-2" />
                          予約する
                          <ArrowRight size={20} className="ml-2" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>

        {/* Notice Section */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <Card className="border-none bg-[var(--muted)]">
              <CardContent className="p-6">
                <h3 className="font-bold text-[var(--foreground)] mb-4">
                  ご利用にあたって
                </h3>
                <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    顔出しなしでもOKです。音声のみでリラックスしてお話しいただけます。
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    途中退出も自由です。無理のない範囲でご参加ください。
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    面談内容は録音・録画されません。安心してご相談ください。
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    転職の意思が固まっていなくても大丈夫です。雑談感覚でどうぞ。
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
