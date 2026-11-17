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

- Keep launch-video state in the React game shell, separate from the engine's PLAY turn-around phase, so returning home never replays the opening.
- Render the home road video into the engine canvas with the shared cover-fit helper and named home coordinates, so the opening, alignment overlay, and PLAY camera use the same framing.
- Store supplied home and opening media through Lovable Assets pointers rather than repository binaries to keep the source lightweight.
