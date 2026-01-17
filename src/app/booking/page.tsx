"use client";

import { addDays, format, isSameDay, startOfWeek } from "date-fns";
import { ja } from "date-fns/locale";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { FloatingFlowers } from "@/components/flower-decoration";
import { Footer, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { bookingSlots, partners } from "@/lib/mock-data";

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const partnerId = searchParams.get("partner");
  const partner = partners.find((p) => p.id === partnerId);

  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i),
  );

  const getTimesForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const slot = bookingSlots.find((s) => s.date === dateStr);
    return slot?.times || [];
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handlePrevWeek = () => {
    const prevWeek = addDays(currentWeekStart, -7);
    if (prevWeek >= startOfWeek(new Date(), { weekStartsOn: 1 })) {
      setCurrentWeekStart(prevWeek);
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  const handleProceed = () => {
    if (selectedDate && selectedTime) {
      router.push(
        `/contact?partner=${partnerId}&type=booking&date=${format(
          selectedDate,
          "yyyy-MM-dd",
        )}&time=${selectedTime}`,
      );
    }
  };

  if (!partner) {
    return (
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
    );
  }

  return (
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

      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 bg-[var(--input)] text-[var(--primary)] rounded-full text-sm font-medium mb-4">
              予約面談
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
              日時を選択してください
            </h1>
            <p className="text-[var(--muted-foreground)]">
              {partner.name}さんの空き枠から選択
            </p>
          </div>

          {/* Partner Info */}
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
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card className="border-none shadow-soft mb-6">
            <CardContent className="p-6">
              {/* Week Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  type="button"
                  onClick={handlePrevWeek}
                  className="p-2 rounded-full hover:bg-[var(--muted)] transition-colors disabled:opacity-50"
                  disabled={
                    currentWeekStart <=
                    startOfWeek(new Date(), { weekStartsOn: 1 })
                  }
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="font-bold text-[var(--foreground)]">
                  {format(currentWeekStart, "yyyy年M月", { locale: ja })}
                </h3>
                <button
                  type="button"
                  onClick={handleNextWeek}
                  className="p-2 rounded-full hover:bg-[var(--muted)] transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {weekDays.map((day) => {
                  const times = getTimesForDate(day);
                  const hasSlots = times.length > 0;
                  const isSelected =
                    selectedDate && isSameDay(day, selectedDate);
                  const isPast = day < new Date();

                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      onClick={() => {
                        if (hasSlots && !isPast) {
                          setSelectedDate(day);
                          setSelectedTime(null);
                        }
                      }}
                      disabled={!hasSlots || isPast}
                      className={`p-3 rounded-lg text-center transition-all ${
                        isSelected
                          ? "bg-[var(--primary)] text-white"
                          : hasSlots && !isPast
                            ? "bg-[var(--muted)] hover:bg-[var(--accent)] text-[var(--foreground)]"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <p className="text-xs mb-1">
                        {format(day, "E", { locale: ja })}
                      </p>
                      <p className="font-bold">{format(day, "d")}</p>
                      {hasSlots && !isPast && (
                        <p className="text-xs mt-1">
                          {isSelected ? "選択中" : `${times.length}枠`}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="animate-fade-in-up">
                  <h4 className="font-medium text-[var(--foreground)] mb-3 flex items-center gap-2">
                    <Clock size={16} className="text-[var(--primary)]" />
                    {format(selectedDate, "M月d日（E）", { locale: ja })}
                    の空き枠
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {getTimesForDate(selectedDate).map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 px-4 rounded-lg text-center font-medium transition-all ${
                          selectedTime === time
                            ? "bg-[var(--primary)] text-white"
                            : "bg-[var(--muted)] hover:bg-[var(--accent)] text-[var(--foreground)]"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Selected Summary */}
          {selectedDate && selectedTime && (
            <Card className="border-none shadow-soft mb-6 bg-[var(--input)] animate-fade-in-up">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-[var(--primary)]" />
                    <div>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        選択した日時
                      </p>
                      <p className="font-bold text-[var(--foreground)]">
                        {format(selectedDate, "yyyy年M月d日（E）", {
                          locale: ja,
                        })}{" "}
                        {selectedTime}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Proceed Button */}
          <Button
            onClick={handleProceed}
            disabled={!selectedDate || !selectedTime}
            className="w-full btn-gradient rounded-full py-6 text-lg disabled:opacity-50"
          >
            この日時で予約を進める
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>
      </section>
    </main>
  );
}

export default function BookingPage() {
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
        <BookingForm />
      </Suspense>
      <Footer />
    </>
  );
}
