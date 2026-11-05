
import { cn } from "cn";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}

const EmptyState = ({
  icon: Icon,
  title,
  description,
  children,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-[#E8E3D9] bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-[#1B2922]",
        className,
      )}
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F1E8] dark:bg-[#24352D]">
        <Icon size={30} className="text-[#C58B55]" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-[#24352D] dark:text-white">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-gray-400">
        {description}
      </p>

      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};

export default EmptyState;
