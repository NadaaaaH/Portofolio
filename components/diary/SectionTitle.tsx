import { RansomText } from './RansomText';

export interface SectionTitleProps {
  text: string;
  page: string;
  note?: string;
  className?: string;
}

export function SectionTitle({ text, page, note, className = '' }: SectionTitleProps) {
  return (
    <div className={`section-heading ${className}`.trim()}>
      <h2><RansomText text={text} /></h2>
      {note && <span className="small-annotation">{note}</span>}
      <span className="page-number" aria-hidden="true">{page}</span>
    </div>
  );
}
