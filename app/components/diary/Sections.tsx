"use client";
import { ArrowLeft, ArrowRight, Award, Code2, Database, Feather, FileCheck2, PenTool, Globe, Palette, Star, Trophy, Play } from 'lucide-react';
import { useState } from 'react';
import { achievements, certificates, skills, type Language } from '@/app/data/portfolio';
import { RansomText } from './RansomText';
import { Stamp, TornPaperEdge } from './Decorations';

function DiaryButton({ children, onClick, variant = "ghost", size = "icon", asChild, href, className = "" }: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: string;
  size?: string;
  asChild?: boolean;
  href?: string;
  className?: string;
}) {
  if (asChild && href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }
  return <button onClick={onClick} className={className}>{children}</button>;
}

export function SectionTitle({ text, page, note }: { text: string; page: string; note?: string }) {
  return (
    <div className="section-heading">
      <h2><RansomText text={text} /></h2>
      {note && <span className="small-annotation">{note}</span>}
      <span className="page-number" aria-hidden="true">{page}</span>
    </div>
  );
}
export function AchievementsSection() {
  const icons = [Trophy, Award, Play];
  return (
    <section className="achievement-band">
      <TornPaperEdge />
      <div className="page-inner">
        <SectionTitle text="Achievements" page="02" />
        <div className="tickets-grid">
          {achievements.map((a, i) => {
            const Icon = icons[i] || Award;
            return (
              <article className="ticket scroll-reveal" key={a.id}>
                <div className="ticket-top">
                  <Icon size={35} strokeWidth={1.3} className="text-denim-ink" aria-hidden="true" />
                  <Stamp>{a.year}</Stamp>
                </div>
                <h3>{a.title}</h3>
                <div className="ticket-category">
                  <span>{a.category}</span>
                  <span aria-hidden="true">&loz; &loz; &loz;</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export function SkillsSection() {
  const icons = [Globe, Code2, Code2, Palette, Feather, PenTool, Database, Feather];
  return (
    <section className="skills-band">
      <TornPaperEdge />
      <div className="page-inner">
        <SectionTitle text="Skill" page="03" />
        <div className="skills-grid">
          {skills.map((s, i) => {
            const Icon = icons[i] || Code2;
            const count = s.level === 'Master' ? 5 : s.level === 'Advanced' ? 4 : s.level === 'Proficient' ? 3 : 2;
            return (
              <article className="skill-note scroll-reveal" key={s.name}>
                <Icon className="skill-icon" size={25} strokeWidth={1.5} aria-hidden="true" />
                <h3>{s.name}</h3>
                <p>{s.level}</p>
                <div className="skill-stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star key={j} fill={j < count ? 'currentColor' : 'none'} />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export function CertificatesSection({ language }: { language: Language }) {
  const [start, setStart] = useState(0);
  const items = certificates.slice(start, start + 3);
  return (
    <section className="certificate-band">
      <div className="page-inner">
        <SectionTitle text="Sertifikat" page="04" />
        <div className="certificate-carousel">
          <button
            className="ghost-icon-btn"
            onClick={() => setStart(s => s === 0 ? certificates.length - 3 : s - 1)}
            aria-label={language === 'id' ? 'Sertifikat sebelumnya' : 'Previous certificates'}
            title="Previous"
          >
            <ArrowLeft />
          </button>
          <div className="postcards-grid" aria-live="polite">
            {items.map(c => (
              <article className="postcard" key={c.id}>
                <div className="postcard-top">
                  <Stamp>{c.year}</Stamp>
                  <div className="postage">
                    <FileCheck2 size={23} aria-hidden="true" />
                    <span>{c.issuer}</span>
                  </div>
                </div>
                <h3>{c.title}</h3>
                <div className="postcard-lines" aria-hidden="true" />
              </article>
            ))}
          </div>
          <button
            className="ghost-icon-btn"
            onClick={() => setStart(s => s >= certificates.length - 3 ? 0 : s + 1)}
            aria-label={language === 'id' ? 'Sertifikat berikutnya' : 'Next certificates'}
            title="Next"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
