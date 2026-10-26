import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import styles from "./HoverButton.module.css";
import { cn } from "@/lib/utils";

export interface HoverButtonProps {
  icon?: ReactNode;
  children: ReactNode;
  trailingIcon?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}

/**
 * Tombol CV dengan efek "lift" saat hover.
 * Tampilan asal sama persis dengan <Button variant="bookmark"> — menggunakan
 * Button asChild agar semua base styles (padding, tinggi, font, border-radius)
 * tetap identik. Hanya CSS Module yang menambahkan animasi hover.
 *
 * Cara pakai:
 *   <HoverButton icon={<FileText />} trailingIcon={<ArrowUpRight />}
 *     href={cvUrl} target="_blank" rel="noopener noreferrer">
 *     Lihat CV
 *   </HoverButton>
 */
export function HoverButton({
  icon,
  children,
  trailingIcon,
  href,
  target,
  rel,
  className,
}: HoverButtonProps) {
  const content = (
    <>
      {icon}
      {children}
      {trailingIcon}
    </>
  );

  if (href) {
    return (
      <Button
        variant="bookmark"
        asChild
        className={cn(styles.btn, className)}
      >
        <a href={href} target={target} rel={rel}>
          {content}
        </a>
      </Button>
    );
  }

  return (
    <Button variant="bookmark" className={cn(styles.btn, className)}>
      {content}
    </Button>
  );
}
