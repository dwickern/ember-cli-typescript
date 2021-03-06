/* eslint-env node */

const path = require('path');

module.exports = {
  description: 'Initialize files needed for typescript compilation',

  files() {
    return [
      path.join(this.path, 'files', 'tsconfig.json'),
      path.join(this.path, 'files', 'app', 'config', 'environment.d.ts'),
    ];
  },

  mapFile() {
    const result = this._super.mapFile.apply(this, arguments);

    const tsconfigPattern = `${path.sep}tsconfig.json`;
    const appPattern = `${path.sep}app${path.sep}`;

    if (result.indexOf(tsconfigPattern) > -1) {
      return 'tsconfig.json';
    } else if (result.indexOf(appPattern) > -1) {
      var pos = result.indexOf(appPattern);
      return result.substring(pos + 1);
    }
  },

  normalizeEntityName() {
    // Entity name is optional right now, creating this hook avoids an error.
  },

  afterInstall() {
    return this.addPackagesToProject([
      { name: 'typescript', target: '^2.4.2' },
      { name: '@types/ember', target: '^2.7.43' },
      { name: '@types/rsvp', target: '^3.3.0' },
      { name: '@types/ember-testing-helpers' },
    ]);
  },
};
