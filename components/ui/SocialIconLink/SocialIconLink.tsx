import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./SocialIconLink.module.css";

export type SocialVariant = "a" | "b";
export type SocialHoverStyle = "blue" | "white-green";

export interface SocialIconLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
  /** "a" = biru tua (default), "b" = lime/olive */
  variant?: SocialVariant;
  hoverStyle?: SocialHoverStyle;
  target?: string;
  rel?: string;
  className?: string;
}

/**
 * Ikon sosial dengan efek layer warna naik dari bawah & rotasi saat hover.
 *
 * Cara pakai:
 *   <SocialIconLink href="https://linkedin.com/..." label="LinkedIn" icon={<LinkedInIcon />} variant="a" target="_blank" rel="noopener noreferrer" />
 *   <SocialIconLink href="https://instagram.com/..." label="Instagram" icon={<InstagramIcon />} variant="b" target="_blank" rel="noopener noreferrer" />
 */
export function SocialIconLink({
  href,
  label,
  icon,
  variant = "a",
  hoverStyle,
  target = "_blank",
  rel = "noopener noreferrer",
  className,
}: SocialIconLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={label}
      title={label}
      className={cn(
        styles.link,
        variant === "b" ? styles.varB : styles.varA,
        hoverStyle === "blue" && styles.hoverBlue,
        hoverStyle === "white-green" && styles.hoverWhiteGreen,
        className
      )}
    >
      <span className={styles.icon}>{icon}</span>
    </a>
  );
}
