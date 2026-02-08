"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Video, Mic, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type PartnerStatus = "available" | "busy" | "offline";
export type ConsultationType = "video" | "audio" | "both";

export interface Partner {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  imageUrl: string;
  tags: string[];
  status: PartnerStatus;
  consultationType: ConsultationType;
  twitterUrl?: string;
  instagramUrl?: string;
}

interface PartnerCardProps {
  partner: Partner;
  variant?: "default" | "compact";
}

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
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      {status === "available" && (
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
      )}
      {config.label}
    </span>
  );
}

function ConsultationBadge({ type }: { type: ConsultationType }) {
  return (
    <div className="flex items-center gap-2">
      {(type === "video" || type === "both") && (
        <span className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
          <Video size={14} className="text-[var(--primary)]" />
          ビデオOK
        </span>
      )}
      {(type === "audio" || type === "both") && (
        <span className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
          <Mic size={14} className="text-[var(--secondary)]" />
          音声のみOK
        </span>
      )}
    </div>
  );
}

export function PartnerCard({ partner, variant = "default" }: PartnerCardProps) {
  const router = useRouter();
  const isAvailable = partner.status === "available";

  if (variant === "compact") {
    return (
      <Card className="card-hover border-none shadow-soft overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--accent)]">
                <img
                  src={partner.imageUrl}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1">
                <StatusBadge status={partner.status} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[var(--foreground)] truncate">
                {partner.name}
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] truncate">
                {partner.tagline}
              </p>
            </div>
            {isAvailable && (
              <Link href={`/contact?partner=${partner.id}&type=instant`}>
                <Button size="sm" className="btn-gradient rounded-full">
                  今すぐ
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-hover border-none shadow-soft overflow-hidden group">
      <CardContent className="p-0">
        {/* カード部分クリックで詳細へ（ボタン以外） */}
        <button
          type="button"
          className="w-full text-left block"
          onClick={() => router.push(`/partners/${partner.id}`)}
        >
          {/* Image Section */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={partner.imageUrl}
              alt={partner.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute top-3 left-3">
              <StatusBadge status={partner.status} />
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="font-bold text-white text-xl mb-1">{partner.name}</h3>
              <p className="text-white/90 text-sm">{partner.tagline}</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {partner.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-[var(--input)] text-[var(--primary)] border-none text-xs"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            <ConsultationBadge type={partner.consultationType} />
            <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">
              {partner.bio}
            </p>
          </div>
        </button>

        {/* 今すぐ話す・予約ボタン（クリックで各フローへ） */}
        <div className="px-4 pb-4 flex gap-2">
          <Link href={`/contact?partner=${partner.id}&type=instant`} className="flex-1">
            <Button
              className="w-full rounded-full text-sm"
              variant={isAvailable ? "default" : "outline"}
              size="sm"
            >
              {isAvailable ? (
                <>
                  今すぐ話す
                  <ArrowRight size={16} className="ml-1" />
                </>
              ) : (
                "今すぐ話す"
              )}
            </Button>
          </Link>
          <Link href={`/booking?partner=${partner.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-[var(--primary)] text-[var(--primary)] rounded-full text-sm"
            >
              予約
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
