# Dungeon Crawler Waugh Timer — Owlbear Rodeo

## GitHub + Render deployment
1. Create a public GitHub repository, and upload the contents of this folder (including `public/`, `src.js`, `style.css`, `index.html`, and `package.json`). Do not upload the ZIP itself.
2. On https://dashboard.render.com choose New > Static Site and connect the GitHub repository.
3. Set Build Command to `npm install && npm run build` and Publish Directory to `dist`.
4. Deploy. Wait for the service to show Live, then open `https://YOUR-SITE.onrender.com/manifest.json` and check that JSON loads.
5. In Owlbear Rodeo, open Extensions and add the extension using the complete manifest URL. Enable it for your room.
6. DM and players open the extension popover. The GM edits Days, Hours, Minutes, Seconds and clicks Apply Time Live; Start/Pause/Reset also synchronize.

`public/manifest.json` and `public/icon.svg` are automatically copied into `dist/` by Vite during the build. The timer is a popover, not a persistent map overlay. The app uses Owlbear Rodeo room metadata for shared state, so no database is needed. Players must have the extension open to view the live countdown.
