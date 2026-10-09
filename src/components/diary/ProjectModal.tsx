import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProjectFrame } from './ProjectFrame';
import { copy, type Language, type Project } from '@/data/portfolio';
export function ProjectModal({ project, language, onClose }: { project: Project | null; language: Language; onClose:()=>void }) {
 return <Dialog open={Boolean(project)} onOpenChange={open=>{if(!open)onClose();}}>
   {project && <DialogContent className="diary-modal" onCloseAutoFocus={event=>{
     const trigger=document.querySelector<HTMLElement>(`[data-last-project="${project.id}"]`);
     if(trigger){event.preventDefault();trigger.focus();}
   }}><DialogTitle>{project.title}</DialogTitle><DialogDescription className="sr-only">{copy[language].open}: {project.title}</DialogDescription><ProjectFrame {...project} language={language}/></DialogContent>}
 </Dialog>;
}
