To use, run these commands in the folder:
npm i -g vercel@latest
npm install
vercel dev

If on Windows, you might need to toggle const LOCAL_DEBUG = true at the top of the file as it saves to /tmp/ for Linux.

API format request:
http://localhost:3000/api/generate?

Followed by:
uid={UID}
characterselection={0-3} (OPTIONAL)
showuid={true, false} (OPTIONAL)
showwatermark={true, false} (OPTIONAL)
primarycolor={HEX format no '#'} (OPTIONAL)
secondarycolor={HEX format no '#'} (OPTIONAL)

Example API request:
http://localhost:3000/api/generate?uid=601449909&characterselection=1&showuid=false