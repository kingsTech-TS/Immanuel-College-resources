import type * as React from "react"
import { cn } from "../../../lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use on navy backgrounds (header, hero) */
  dark?: boolean
  /** Start the animation later (seconds) so neighbouring blocks ripple instead of flashing together */
  delay?: number
}

/**
 * An animated placeholder block (pulse + sweeping shimmer).
 * Size and shape it with className (h-*, w-*, rounded-*).
 * Passing "absolute" in className overrides the default "relative".
 */
function Skeleton({ className, dark = false, delay, style, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(dark ? "skeleton-dark" : "skeleton", "relative overflow-hidden rounded-md", className)}
      style={delay ? ({ "--skeleton-delay": `${delay}s`, ...style } as React.CSSProperties) : style}
      {...props}
    />
  )
}

export { Skeleton }
