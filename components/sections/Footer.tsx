import { ArrowUpRight, FileText } from 'lucide-react';
import { RansomText, FOOTER_NAME_PATTERNS } from '@/components/diary/RansomText';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { HoverButton } from '@/components/ui/HoverButton/HoverButton';
import { copy, cvUrl, type Language } from '@/data/portfolio';
import styles from './Footer.module.css';

export interface FooterProps {
  language?: Language;
}

export function Footer({ language = 'id' }: FooterProps) {
  const t = copy[language];

  return (
    <div className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className="page-inner">
          <div className={styles.footerRow}>
            <RansomText
              lines={['Nada Haifa', 'Nurfadhilah']}
              patterns={[FOOTER_NAME_PATTERNS.line1, FOOTER_NAME_PATTERNS.line2]}
              className={styles.footerName}
              ariaLabel="Nada Haifa Nurfadhilah"
            />
            <div className={styles.footerLinks}>
              <HoverButton
                icon={<FileText size={16} />}
                trailingIcon={<ArrowUpRight size={16} />}
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.cv}
              </HoverButton>
              <SocialLinks variant="onGreen" />
            </div>
          </div>
          <div className="copyright">&copy; 2025 Nada Haifa Nurfadhilah. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
