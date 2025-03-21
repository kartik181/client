import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function LoadingSkeleton() {
  return (
    <Card className="relative px-2 h-[700px] w-[600px] mx-auto overflow-hidden bg-linear-to-br bg-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      {/* Loading Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-xs pt-4 pb-2 border-b border-rose-500/10">
        <div className="px-4 flex gap-1.5">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="h-1.5 flex-1 rounded-full bg-rose-500/10 overflow-hidden"
            >
              <div
                className={cn(
                  "h-full bg-linear-to-r from-gray-500 to-rose-600 animate-pulse",
                  index === 0 ? "w-full" : "w-0"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Loading Navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xs border-t border-rose-500/10">
        <div className="flex justify-between items-center">
          <Skeleton className="rounded-full w-12 h-12 bg-linear-to-br from-rose-500/50 to-rose-600/50" />
          <div className="flex gap-2">
            {[1, 2, 3].map((_, index) => (
              <Skeleton
                key={index}
                className="h-2 w-2 rounded-full bg-rose-500/20"
              />
            ))}
          </div>
          <Skeleton className="rounded-full w-12 h-12 bg-linear-to-br from-rose-500/50 to-rose-600/50" />
        </div>
      </div>
    </Card>
  );
}
