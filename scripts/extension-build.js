const fs = require('fs-extra');
(async function build() {

  await fs.copy('./extension/manifest.json', './dist/test-flow/manifest.json');

  await fs.copy('./extension/background/app.js', './dist/test-flow/app.js');
})();
