import { readFileSync, writeFileSync } from 'fs-extra';
import path = require('path');
import { ROOT } from '../build/helpers';

const packageJson = JSON.parse(readFileSync(path.join(ROOT, "package.json")).toString());

const newPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    module: packageJson.module,
    main: packageJson.main,
    peerDependencies: packageJson.peerDependencies
}

writeFileSync(path.join(ROOT, "dist/package.json"), JSON.stringify(newPackageJson, null, 4));
