"use client";

import { addDays, addWeeks, format, isSameDay, startOfWeek } from "date-fns";
import { ja } from "date-fns/locale";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FloatingFlowers } from "@/components/flower-decoration";
import { Footer, Header } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Available time slots
const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

// Initial slot data (mock)
const initialSlots: Record<string, string[]> = {
  "2026-01-20": ["10:00", "11:00", "14:00", "15:00", "16:00"],
  "2026-01-21": ["09:00", "10:00", "11:00", "13:00", "14:00"],
  "2026-01-22": ["10:00", "13:00", "14:00", "17:00"],
  "2026-01-23": ["09:00", "11:00", "15:00", "16:00"],
  "2026-01-24": ["10:00", "11:00", "14:00"],
};

export default function PartnerSlotsPage() {
  const router = useRouter();
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<Record<string, string[]>>(initialSlots);
  const [hasChanges, setHasChanges] = useState(false);

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i),
  );

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
    setSelectedDate(null);
  };

  const handlePrevWeek = () => {
    const prevWeek = addWeeks(currentWeekStart, -1);
    if (prevWeek >= startOfWeek(new Date(), { weekStartsOn: 1 })) {
      setCurrentWeekStart(prevWeek);
      setSelectedDate(null);
    }
  };

  const getDateKey = (date: Date) => format(date, "yyyy-MM-dd");

  const getSlotsForDate = (date: Date) => {
    return slots[getDateKey(date)] || [];
  };

  const toggleSlot = (date: Date, time: string) => {
    const dateKey = getDateKey(date);
    const currentSlots = slots[dateKey] || [];

    let newSlots: string[];
    if (currentSlots.includes(time)) {
      newSlots = currentSlots.filter((t) => t !== time);
    } else {
      newSlots = [...currentSlots, time].sort();
    }

    setSlots({
      ...slots,
      [dateKey]: newSlots,
    });
    setHasChanges(true);
  };

  const addAllSlots = (date: Date) => {
    const dateKey = getDateKey(date);
    setSlots({
      ...slots,
      [dateKey]: [...timeSlots],
    });
    setHasChanges(true);
    toast.success("全ての時間枠を追加しました");
  };

  const clearAllSlots = (date: Date) => {
    const dateKey = getDateKey(date);
    setSlots({
      ...slots,
      [dateKey]: [],
    });
    setHasChanges(true);
    toast.success("全ての時間枠を削除しました");
  };

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      setHasChanges(false);
      toast.success("予約枠を保存しました");
    }, 500);
  };

  return (
    <>
      <Header />
      <FloatingFlowers />

      <main className="relative z-10 min-h-screen pt-20 bg-gray-50">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft size={20} />
            <span>ダッシュボードに戻る</span>
          </button>
        </div>

        <section className="px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
                  予約枠管理
                </h1>
                <p className="text-sm text-[var(--muted-foreground)]">
                  面談可能な時間帯を設定してください
                </p>
              </div>
              <Button
                onClick={handleSave}
                disabled={!hasChanges}
                className="btn-gradient rounded-full disabled:opacity-50"
              >
                <Save size={16} className="mr-2" />
                保存する
              </Button>
            </div>

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
                    const daySlots = getSlotsForDate(day);
                    const isSelected =
                      selectedDate && isSameDay(day, selectedDate);
                    const isPast = day < new Date();

                    return (
                      <button
                        key={day.toISOString()}
                        type="button"
                        onClick={() => !isPast && setSelectedDate(day)}
                        disabled={isPast}
                        className={`p-3 rounded-lg text-center transition-all ${
                          isSelected
                            ? "bg-[var(--primary)] text-white"
                            : isPast
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-[var(--muted)] hover:bg-[var(--accent)] text-[var(--foreground)]"
                        }`}
                      >
                        <p className="text-xs mb-1">
                          {format(day, "E", { locale: ja })}
                        </p>
                        <p className="font-bold">{format(day, "d")}</p>
                        {!isPast && (
                          <Badge
                            className={`mt-1 text-xs ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : daySlots.length > 0
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {daySlots.length}枠
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="animate-fade-in-up border-t border-[var(--border)] pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-[var(--foreground)] flex items-center gap-2">
                        <Clock size={16} className="text-[var(--primary)]" />
                        {format(selectedDate, "M月d日（E）", { locale: ja })}
                        の予約枠
                      </h4>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addAllSlots(selectedDate)}
                          className="text-xs"
                        >
                          <Plus size={14} className="mr-1" />
                          全て追加
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => clearAllSlots(selectedDate)}
                          className="text-xs text-red-500 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 size={14} className="mr-1" />
                          全て削除
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {timeSlots.map((time) => {
                        const isActive =
                          getSlotsForDate(selectedDate).includes(time);
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => toggleSlot(selectedDate, time)}
                            className={`py-3 px-4 rounded-lg text-center font-medium transition-all ${
                              isActive
                                ? "bg-[var(--primary)] text-white"
                                : "bg-[var(--muted)] hover:bg-[var(--accent)] text-[var(--foreground)]"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-xs text-[var(--muted-foreground)] mt-4 text-center">
                      クリックして時間枠のON/OFFを切り替えます
                    </p>
                  </div>
                )}

                {!selectedDate && (
                  <div className="text-center py-8 border-t border-[var(--border)]">
                    <Calendar
                      size={48}
                      className="mx-auto mb-4 text-[var(--muted-foreground)]"
                    />
                    <p className="text-[var(--muted-foreground)]">
                      日付を選択して予約枠を設定してください
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-none shadow-soft bg-[var(--muted)]">
              <CardContent className="p-6">
                <h3 className="font-bold text-[var(--foreground)] mb-3">
                  💡 ヒント
                </h3>
                <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                  <li>• 設定した予約枠は、求職者の予約画面に表示されます</li>
                  <li>• 即時対応がONの場合でも、予約枠は別途設定が必要です</li>
                  <li>• 予約が入っている時間帯は削除できません</li>
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
