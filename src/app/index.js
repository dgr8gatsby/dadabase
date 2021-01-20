/**
 * index.js is the entry file for rollup. import the base components here
 */
import _DadApp from './cmp/dad-app/dad-app.js';
import serviceWorkerScript from '.sw.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register ('');
}
