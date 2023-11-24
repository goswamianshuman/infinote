import { Loader } from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/utils";

const loadingVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "h-4 w-4",
      small: "h-2 w-2",
      large: "h-6 w-6",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface LoadingProps extends VariantProps<typeof loadingVariants> {}

export const Loading = ({ size }: LoadingProps) => {
  return <Loader className={cn(loadingVariants({ size }))} />;
};
