import {
  cleanupNgx,
  generateLegacyBundles,
  generateDeclarationFiles,
  modifyMetadata,
  transpileNgx,
} from '../build/ngx';
import { cleanEmittedData } from '../build/transformers/extract-injectables';

transpileNgx();
generateLegacyBundles();
generateDeclarationFiles();
modifyMetadata();
cleanupNgx();
// cleanEmittedData();
