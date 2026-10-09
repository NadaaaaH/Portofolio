import { describe, expect, it } from 'vitest';
import { categories, copy, cvUrl, filterProjects, projects } from '@/data/portfolio';
import { ransomVariant } from '@/components/diary/RansomText';
import { youtubeEmbed } from '@/components/diary/ProjectFrame';
describe('Portfolio preservation and interactions',()=>{
 it('offers the five requested category filters',()=>{expect(categories).toEqual(['All','Fullstack Developer','UI/UX Design','Creative Works','Writing']);});
 it('All retains projects from every category',()=>{expect(filterProjects('All')).toEqual(projects);expect(new Set(filterProjects('All').map(p=>p.category)).size).toBe(4);});
 it('filters Fullstack projects without unrelated categories',()=>{expect(filterProjects('Fullstack Developer').map(p=>p.id)).toEqual(['fullstack-1','fullstack-2']);});
 it('filters UI/UX projects without unrelated categories',()=>{expect(filterProjects('UI/UX Design').map(p=>p.id)).toEqual(['uiux-1','uiux-2']);});
 it('preserves four writing items and six creative collections',()=>{expect(filterProjects('Writing')).toHaveLength(4);expect(filterProjects('Creative Works')).toHaveLength(6);});
 it('preserves ID/EN labels and original CV destination',()=>{expect(copy.id.cv).toBe('Lihat CV');expect(copy.en.cv).toBe('View CV');expect(copy.id.work).toBe('Karyaku ...');expect(copy.en.work).toBe('My Work ...');expect(cvUrl).toBe('https://google.com');});
 it('uses deterministic ransom variants instead of render randomness',()=>{expect(ransomVariant('N',0,'Nada Haifa Nurfadhilah')).toBe(2);expect(ransomVariant('a',1,'Nada Haifa Nurfadhilah')).toBe(3);});
 it('only embeds valid YouTube URLs for video previews',()=>{expect(youtubeEmbed('https://youtu.be/dQw4w9WgXcQ')).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');expect(youtubeEmbed('https://youtube.com/watch?v=dQw4w9WgXcQ')).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');expect(youtubeEmbed('https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ')).toBeNull();expect(youtubeEmbed('invalid')).toBeNull();});
});
