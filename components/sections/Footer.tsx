import { TornPaperEdge } from '@/components/decorations';
import { SocialLinks } from '@/components/ui/SocialLinks';

export function Footer() {
  return (
    <footer className="footer">
      <TornPaperEdge />
      <div className="page-inner">
        <div className="footer-row">
          <div>
            <h2>Nada Haifa Nurfadhilah {'\u2728'}</h2>
            <p>Creative Portfolio &amp; Project Showcase &bull; Designed with Love &amp; Notebook Aesthetic</p>
          </div>
          <SocialLinks footer />
        </div>
        <div className="copyright">&copy; 2025 Nada Haifa Nurfadhilah. All rights reserved.</div>
      </div>
    </footer>
  );
}
