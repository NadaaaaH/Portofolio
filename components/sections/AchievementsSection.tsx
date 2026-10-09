"use client";

import { Award, Trophy, Play } from 'lucide-react';
import { achievements } from '@/data/portfolio';
import { SectionTitle } from '@/components/diary/SectionTitle';
import { Stamp, TornPaperEdge } from '@/components/decorations';

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
