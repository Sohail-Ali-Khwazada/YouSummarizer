import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: ReactNode;
  title: string;
}

export const ToolbarButton = ({
  onClick,
  isActive = false,
  children,
  title,
}: ToolbarButtonProps) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={onClick}
    title={title}
    type="button"
    aria-pressed={isActive}
    className={`h-9 w-9 p-0 ${
      isActive ? "bg-muted text-black dark:text-white" : "text-muted-foreground"
    }`}
  >
    {children}
  </Button>
);