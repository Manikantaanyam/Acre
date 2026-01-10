import { LucideIcon } from "lucide-react";

type ButtonProps = {
  name: string;
  Icon: LucideIcon;
  className?: string;
};

export default function Button({ name, Icon, className }: ButtonProps) {
  return (
    <button
      className={`cursor-pointer flex items-center justify-center gap-2 p-1.5 md:px-4 md:py-2 rounded-md transition-all group ${className}`}
    >
      <Icon className="w-3 h-3 md:w-4 md:h-4 group-hover:scale-110" />
      <span className="hidden sm:flex text-xs">{name}</span>
    </button>
  );
}
