"use client";

import { ArrowLeft, ArrowRight, FileCheck2 } from 'lucide-react';
import { useState } from 'react';
import { certificates, type Language } from '@/data/portfolio';
import { SectionTitle } from '@/components/diary/SectionTitle';
import { Stamp } from '@/components/decorations';

export interface CertificatesSectionProps {
  language: Language;
}

export function CertificatesSection({ language }: CertificatesSectionProps) {
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
