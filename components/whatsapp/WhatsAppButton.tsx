import { MessageCircle } from "lucide-react";
import { clsx } from "clsx";
import { buildWhatsAppLink } from "@/content/site-config";

export function WhatsAppButton({
  label,
  message,
  className,
  variant = "solid",
}: {
  label: string;
  message?: string;
  className?: string;
  variant?: "solid" | "outline";
}) {
  const variants = {
    solid: "bg-[var(--color-moonlight)] text-[var(--color-void)] hover:bg-[var(--color-moonlight-soft)]",
    outline: "border border-[var(--color-moonlight)]/50 text-[var(--color-moonlight)] hover:bg-[var(--color-moonlight)]/10",
  };

  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-moonlight)]",
        variants[variant],
        className
      )}
    >
      <MessageCircle className="size-4" aria-hidden="true" />
      {label}
    </a>
  );
}
