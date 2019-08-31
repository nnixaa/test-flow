const fs = require('fs-extra');
(async function build() {

  await fs.copy(
    './extension/',
    './dist/test-flow/'
  );
})();
