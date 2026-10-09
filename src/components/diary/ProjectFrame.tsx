import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ImageIcon, LoaderCircle, Monitor, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copy, type Language, type Project } from '@/data/portfolio';

export function youtubeEmbed(src: string) {
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, '');
    if (host !== 'youtube.com' && host !== 'youtu.be' && host !== 'm.youtube.com') return null;
    const id = host === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v') || url.pathname.match(/\/(?:embed|shorts)\/([^/]+)/)?.[1];
    return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch { return null; }
}
export function MissingMedia({ type, label }: { type: Project['type']; label: string }) {
  const Icon = type === 'website' ? Monitor : type === 'video' ? Video : ImageIcon;
  return <div className="media-missing"><Icon aria-hidden="true"/><span>{label}</span></div>;
}
export function ProjectFrame({ type, src, title, role, description, stack, links, image, language = 'id' }: Omit<Project, 'id' | 'category' | 'previewLabels'> & { language?: Language }) {
  const t = copy[language];
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const yt = type === 'video' ? youtubeEmbed(src) : null;
  useEffect(() => {
    const node = element.current;
    if (!node) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: '100px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible || loaded || showImage || !src || (type !== 'website' && !yt)) return;
    const timeout = window.setTimeout(() => { setFailed(true); setShowImage(true); }, 12000);
    return () => window.clearTimeout(timeout);
  }, [visible, loaded, showImage, src, type, yt]);
  return <div className="modal-details">
    <div ref={element} className="frame-media">
      {(!src && !image) || (showImage && !image) ? <MissingMedia type={type} label={t.missing}/> : showImage || (type === 'image' && image) ?
        <img src={image || src} alt={title} loading="lazy" onError={()=>setFailed(true)}/> : type === 'image' ?
        <img src={src} alt={title} loading="lazy" onError={()=>setFailed(true)}/> : visible && (type === 'website' || yt) ?
        <><iframe src={yt || src} title={title} tabIndex={-1} loading="lazy" allow={yt ? 'fullscreen; picture-in-picture' : undefined} allowFullScreen={Boolean(yt)} referrerPolicy="strict-origin-when-cross-origin" onLoad={()=>setLoaded(true)} onError={()=>{setFailed(true);setShowImage(true);}}/>{!loaded && <div className="frame-skeleton" role="status" aria-label={t.loading}><LoaderCircle aria-hidden="true"/></div>}</> : visible && type === 'video' ?
        <video src={src} poster={image} controls muted playsInline preload="metadata" onError={()=>setFailed(true)}/> : <div className="frame-skeleton"><LoaderCircle aria-hidden="true"/></div>}
      {failed && type === 'image' && <div className="frame-skeleton"><MissingMedia type="image" label={t.missing}/></div>}
    </div>
    <div className="frame-toolbar">
      {type === 'website' && src && <><Button variant="outline" size="sm" aria-pressed={!showImage} onClick={()=>{setShowImage(false);setFailed(false);setLoaded(false);}}><Monitor/>{t.live}</Button><Button variant="outline" size="sm" aria-pressed={showImage} onClick={()=>setShowImage(true)}><ImageIcon/>{t.screenshot}</Button></>}
      {(src || links.demo) && <Button variant="bookmark" size="sm" asChild><a href={src || links.demo} target="_blank" rel="noopener noreferrer"><ExternalLink/>{t.newTab}</a></Button>}
      {links.repo && <Button variant="outline" size="sm" asChild><a href={links.repo} target="_blank" rel="noopener noreferrer">GitHub Repo <ExternalLink/></a></Button>}
    </div>
    <span className="sticker">{t.role}: {role}</span>
    {description.split('\n\n').filter(Boolean).map((p,i)=><p key={i}>{p}</p>)}
    {stack.length > 0 && <div className="flex flex-wrap gap-2 mt-4">{stack.map(s=><span className="sticker" key={s}>{s}</span>)}</div>}
  </div>;
}
