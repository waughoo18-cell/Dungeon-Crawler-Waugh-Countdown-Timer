# Dungeon Crawler Waugh Timer — Owlbear Rodeo extension

A synchronized countdown with days, hours, minutes and seconds. The Owlbear Rodeo room's GM can edit the time, start, pause, resume, or reset it. Players see the same timer in their own extension popovers. The clock uses a shared end timestamp so it ticks locally without sending a network request every second.

## Run and install

1. Install Node.js 18 or newer.
2. Run `npm install` then `npm run dev`.
3. To test, use a public HTTPS tunnel to port 5173, or deploy the built site. For production, run `npm run build` and host the `dist/` folder on an HTTPS static host. Copy `manifest.json` and `icon.svg` into `dist/` after the build (or configure Vite to copy them).
4. In Owlbear Rodeo, open Extensions, choose to add an extension, and enter `https://YOUR-HOST/manifest.json`.
5. The GM opens the Dungeon Timer extension, sets a time and clicks **Apply Time Live**. Players open the same extension to view the synchronized timer.

## Important

This version shows the countdown in an Owlbear Rodeo extension popover (not directly on the battle map). Players need to open the extension to see it. Room metadata is shared with everyone in the room. Only the GM's interface has editing controls, and the code checks the GM role before publishing changes. For a hardened public deployment, consult Owlbear Rodeo's SDK security and permissions guidance.
