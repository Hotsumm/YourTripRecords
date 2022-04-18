// Pre-render the app into static HTML.
// run `yarn serve` and then `build/static` can be served as a static site.

(() => {
  const fs = require('fs');
  const path = require('path');
  const toAbsolute = (p: string) => path.resolve(__dirname, p);
  const template = fs.readFileSync(
    toAbsolute('build/static/index.html'),
    'utf-8',
  );
  const { render } = require('./build/server/entry-server.js');

  // determine routes to pre-render from src/pages
  const routesToPrerender = fs
    .readdirSync(toAbsolute('src/pages'))
    .map((file: any) => {
      const name = file.replace(/\.tsx$/, '').toLowerCase();
      return name === 'home' ? `/` : `/${name}`;
    });

  (async () => {
    // pre-render each route...
    for (const url of routesToPrerender) {
      const { appHtml, styleTags } = await render(url);

      const html = template
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('<!--style-->', styleTags);

      const filePath = `build/static${url === '/' ? '/index' : url}.html`;
      fs.writeFileSync(toAbsolute(filePath), html);
      console.log('pre-rendered:', filePath);
    }
  })();
})();
