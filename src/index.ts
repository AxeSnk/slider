import './index.scss';
import './MVP/sliderFacade';
import Demo from './Demo/Demo';

window.onload = function windowHasLoaded() {
  document.querySelectorAll('.demo').forEach((demo) => new Demo(demo));
};
