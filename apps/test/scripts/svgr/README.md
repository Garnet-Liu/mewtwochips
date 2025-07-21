### What is SVGR

https://react-svgr.com/playground/

### Why SVGR

- Exposing SVGs in React components makes sure they're there on original page load and since they're core UI elements it makes for a better UX and gives off a native feel ( thinking potential webview implemenation for Android )
- When properly set, we got control over svg `width` , `height`, `color` and other properties.

### How to use

When a new svg needs to make it into the project

- Place it in originals
- run `runSVGR.sh`
- copy it in `src/components/svgs` as needed
- make sure to also keep the original in `public/for reference with the same name

### Future work / Concerns

- I can automate the copying to `src/components/svgs/iconComponents` and `public/assets/images/svgs`. Are we good with doing this?
- the index file can be generated appropriately through `svgrIndexTemplate.js` used by `runSVGR.sh` but currently it's not merging with any previous `index.js` file that might be there so that would require manual work. Your thought welcome
