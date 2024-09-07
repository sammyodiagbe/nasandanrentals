import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FC, MouseEventHandler } from "react";

type TButton = {
  title: string;
  callback?: MouseEventHandler;
  style?: string;
  asChild?: boolean;
};

const CustomButton: FC<TButton> = ({ title, callback, style, asChild }) => {
  return (
    <Button
      className={cn("py-4 px-5 transition-all ", style)}
      onClick={callback}
      asChild={asChild}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
