import './index.scss';
import './MVP/sliderFacade';
import Demo from './Demo/Demo';

function importAll(resolve: __WebpackModuleApi.RequireContext): void {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../src/', true, /\.scss$/));

window.onload = function windowHasLoaded() {
  document.querySelectorAll('.demo').forEach((demo) => new Demo(demo));
};
