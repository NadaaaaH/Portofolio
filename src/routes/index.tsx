import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, BookOpen, FileText, Github, Instagram, Linkedin, Mail, Paperclip, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RansomText } from '@/components/diary/RansomText';
import { Flower, Spark, Tape, TornPaperEdge } from '@/components/diary/Decorations';
import { ProjectCard } from '@/components/diary/ProjectCard';
import { ProjectModal } from '@/components/diary/ProjectModal';
import { AchievementsSection, CertificatesSection, SectionTitle, SkillsSection } from '@/components/diary/Sections';
import { categories, copy, cvUrl, filterProjects, projects, socialLinks, summaries, type Category, type Language, type Project } from '@/data/portfolio';
import profile from '@/assets/nada-profile.png.asset.json';

export const Route = createFileRoute('/')({
 head:()=>({meta:[
  {title:'Nada Haifa Nurfadhilah — Scrapbook Portfolio'},
  {name:'description',content:'Portofolio Nada Haifa Nurfadhilah: software engineering, UI/UX, creative works, dan writing. Merging Logic with Creativity.'},
  {property:'og:title',content:'Nada Haifa Nurfadhilah — Scrapbook Portfolio'},
  {property:'og:description',content:'Kumpulan karya, pencapaian, dan cerita kreatif Nada Haifa Nurfadhilah. Software Engineering Enthusiast.'},
  {property:'og:type',content:'website'},
  {name:'twitter:card',content:'summary_large_image'},
 ]}),
 component:Index,
});
function SocialLinks({ footer = false }: { footer?:boolean }) {
 return <div className="social-links">
  <Button variant="ghost" size="icon" title="LinkedIn" aria-label="LinkedIn" asChild><a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin/></a></Button>
  <Button variant="ghost" size="icon" title="Instagram" aria-label="Instagram" asChild><a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"><Instagram/></a></Button>
  <Button variant="ghost" size="icon" title="Email (Gmail)" aria-label="Email (Gmail)" asChild><a href={socialLinks.email} target="_blank" rel="noopener noreferrer"><Mail/></a></Button>
  {!footer && <Button variant="ghost" size="icon" title="GitHub" aria-label="GitHub" asChild><a href="https://github.com/nadahaifa1" target="_blank" rel="noopener noreferrer"><Github/></a></Button>}
 </div>;
}
function Index() {
 const [language,setLanguage] = useState<Language>('id');
 const [category,setCategory] = useState<Category>('All');
 const [selected,setSelected] = useState<Project|null>(null);
 const opener = useRef<HTMLElement|null>(null);
 const t=copy[language];
 useEffect(()=>{
  try { const saved=localStorage.getItem('bahasa'); if(saved==='id'||saved==='en')setLanguage(saved); } catch { /* Storage may be unavailable. */ }
 },[]);
 useEffect(()=>{document.documentElement.lang=language;},[language]);
 function changeLanguage(next:Language){setLanguage(next);try{localStorage.setItem('bahasa',next);}catch{/* Keep toggle working when storage is unavailable. */}}
 function openProject(p:Project){opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;opener.current?.setAttribute('data-last-project',p.id);setSelected(p);}
 const full=projects.filter(p=>p.category==='Fullstack Developer');
 const ux=projects.filter(p=>p.category==='UI/UX Design');
 const creative=projects.filter(p=>p.category==='Creative Works');
 const writing=projects.filter(p=>p.category==='Writing');
 const renderCard=(p:Project,summary?:{title:string;description:string})=><ProjectCard key={p.id} project={p} language={language} onOpen={openProject} summary={summary}/>;
 const filtered=filterProjects(category);
 const groups=category==='Writing'||category==='Creative Works' ? [...new Set(filtered.map(p=>p.group || category))] : [category];
 return <div className="book">
  <nav className="navbar page-inner" aria-label={language==='id'?'Navigasi utama':'Main navigation'}>
   <a href="#" className="brand-label"><BookOpen size={24} strokeWidth={1.5}/>Nada's diary<span className="text-denim" aria-hidden="true">✧</span></a>
   <div className="nav-actions">
    <Button variant="bookmark" asChild className="nav-cv"><a href={cvUrl} target="_blank" rel="noopener noreferrer"><FileText/>{t.cv}<ArrowUpRight/></a></Button>
    <div className="language-switch" role="group" aria-label="Language"><Button variant="language" size="sm" aria-pressed={language==='id'} onClick={()=>changeLanguage('id')}>ID</Button><Button variant="language" size="sm" aria-pressed={language==='en'} onClick={()=>changeLanguage('en')}>EN</Button></div>
   </div>
  </nav>
  <main>
   <div className="washi-marquee" aria-hidden="true"><div className="marquee-track">{Array.from({length:16},(_,i)=><span key={i}>{t.portfolio} <span className="ml-7">✦</span></span>)}</div></div>
   <header className="hero page-inner">
    <div className="hero-copy reveal">
     <span className="hello-label">{t.hello}<Star size={17} strokeWidth={1.3} aria-hidden="true"/></span>
     <h1><RansomText text={t.name} className="hero-name"/></h1>
     <div className="bio-note"><Tape tone="denim"/><h2>{t.tagline}</h2><p>{t.bio}</p></div>
     <div className="hero-links"><Button variant="bookmark" asChild><a href={cvUrl} target="_blank" rel="noopener noreferrer"><FileText/>{t.cv}<ArrowUpRight/></a></Button><SocialLinks/></div>
    </div>
    <div className="hero-photo-area reveal">
     <div className="photo-back" aria-hidden="true"/>
     <div className="hero-polaroid polaroid"><Tape/><span className="paper-clip" aria-hidden="true"/><img src={profile.url} alt="Nada Haifa Nurfadhilah" width="310" height="340" fetchPriority="high"/><p className="photo-caption">Nada Haifa Nurfadhilah ♡</p></div>
     <Spark className="hero-spark"/><Flower className="hero-flower"/>
     <span className="photo-annotation small-annotation">{t.annotation} <ArrowDownRight size={24} className="inline-block" aria-hidden="true"/></span>
    </div>
   </header>
   <TornPaperEdge/>
   <section id="work" className="work-band">
    <div className="page-inner">
     <SectionTitle text={t.work} page="01" note={t.collection}/>
     <div className="filters" role="group" aria-label={language==='id'?'Filter kategori project':'Project category filter'}>{categories.map(c=><Button key={c} variant="index" aria-pressed={category===c} onClick={()=>setCategory(c)}>{c==='Fullstack Developer'?'Fullstack':c==='UI/UX Design'?'UI/UX':c}</Button>)}</div>
     <div aria-live="polite" aria-atomic="true" className="sr-only">{category}: {filtered.length} projects</div>
     {category==='All' ? <>
      <div className="category-group"><h3 className="category-subtitle">FullStack Developer <Paperclip size={22} className="inline-block ml-2" aria-hidden="true"/></h3><div className="project-grid">{full.map((p,i)=>renderCard(p,i===0?summaries.portfolio:undefined))}</div><div className="more-row"><Button variant="link" onClick={()=>setCategory('Fullstack Developer')}>{t.more}<ArrowUpRight/></Button></div></div>
      <div className="category-group"><h3 className="category-subtitle">UI/UX Design</h3><div className="project-grid">{ux.map((p,i)=>renderCard(p,i===0?summaries.mentari:undefined))}</div><div className="more-row"><Button variant="link" onClick={()=>setCategory('UI/UX Design')}>{t.more}<ArrowUpRight/></Button></div></div>
      <div className="category-group"><h3 className="category-subtitle">Other Projects</h3><div className="other-project-columns"><div><h4 className="category-subtitle">Creative Works</h4><div className="project-grid other-project-grid">{creative.filter(p=>p.id==='creative-0'||p.id==='creative-3').map(p=>renderCard(p))}</div><div className="more-row"><Button variant="link" onClick={()=>setCategory('Creative Works')}>{t.more}<ArrowUpRight/></Button></div></div><div><h4 className="category-subtitle">Writing</h4><div className="project-grid other-project-grid">{writing.slice(0,2).map((p,i)=>renderCard(p,i===0?summaries.novel:summaries.script))}</div><div className="more-row"><Button variant="link" onClick={()=>setCategory('Writing')}>{t.more}<ArrowUpRight/></Button></div></div></div></div>
     </> : groups.map(group=><div className="category-group" key={group}><h3 className="category-subtitle">{group}</h3><div className="project-grid">{filtered.filter(p=>!p.group||p.group===group).map(p=>renderCard(p))}</div></div>)}
    </div>
   </section>
   <AchievementsSection/><SkillsSection/><CertificatesSection language={language}/>
  </main>
  <footer className="footer"><TornPaperEdge/><div className="page-inner"><div className="footer-row"><div><h2>Nada Haifa Nurfadhilah ✨</h2><p>Creative Portfolio &amp; Project Showcase • Designed with Love &amp; Notebook Aesthetic</p></div><SocialLinks footer/></div><div className="copyright">© 2025 Nada Haifa Nurfadhilah. All rights reserved.</div></div></footer>
  <ProjectModal project={selected} language={language} onClose={()=>setSelected(null)}/>
 </div>;
}
