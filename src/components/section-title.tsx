interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionTitle({
  badge,
  title,
  subtitle,
  align = "center",
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`mb-12 ${alignClass}`}>
      {badge && (
        <span className="inline-block px-4 py-1.5 bg-[var(--input)] text-[var(--primary)] rounded-full text-sm font-medium mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--foreground)] mb-4">
        {title.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            {i < title.split("\n").length - 1 && <br />}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
