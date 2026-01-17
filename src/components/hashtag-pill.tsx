interface HashtagPillProps {
  children: React.ReactNode;
  className?: string;
}

export function HashtagPill({ children, className = "" }: HashtagPillProps) {
  return (
    <span className={`hashtag-pill ${className}`}>
      #{children}
    </span>
  );
}

export function HashtagPillGroup({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <HashtagPill key={tag}>{tag}</HashtagPill>
      ))}
    </div>
  );
}
