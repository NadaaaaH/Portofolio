<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep the Lovable TanStack Start bootstrap and render the portfolio at `/`; this workspace cannot run the external repository's Next.js runtime.
- Centralize original bilingual copy, project metadata, links, skills, achievements and certificates in `src/data/portfolio.ts`; preservation and filtering must share one source of truth.
- Keep scrapbook styles in semantic CSS tokens and reusable diary components; visual variants must not scatter palette values through page code.
- Use deterministic RansomText tile selection and hydrate language storage in effects; SSR and client output must agree.
- Use the existing Radix Dialog for project details; it provides keyboard focus trapping, Escape handling and body scroll lock.
- Keep copied portfolio media behind imported Lovable asset pointers; this avoids external hotlinks and preserves authentic imagery.
- Keep website previews client-observed and lazy; cross-origin iframe blocking is not reliably detectable, so always provide explicit screenshot and new-tab controls.
