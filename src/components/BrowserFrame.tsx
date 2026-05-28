import { ReactNode } from "react";

interface BrowserFrameProps {
  url?: string;
  children: ReactNode;
  className?: string;
}

export const BrowserFrame = ({
  url,
  children,
  className = "",
}: BrowserFrameProps) => (
  <div
    className={`rounded-md border border-border bg-card overflow-hidden ${className}`}
  >
    <div className="flex items-center gap-3 bg-muted/40 dark:bg-muted/30 px-3.5 py-2 border-b border-border">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full border border-border" />
        <span className="w-2.5 h-2.5 rounded-full border border-border" />
        <span className="w-2.5 h-2.5 rounded-full border border-border" />
      </div>
      {url && (
        <div className="flex-1 mx-1 text-[11px] text-muted-foreground font-mono truncate">
          {url}
        </div>
      )}
    </div>
    {children}
  </div>
);
